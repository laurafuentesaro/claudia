"""
Cookidoo Recipe Fetcher for Claudia's Meal Plan
Connects to Cookidoo API, fetches all recipes from collections,
makes raw API calls to get full details (including steps),
filters restrictions, and exports structured JSON.
"""

import asyncio
import aiohttp
import json
import os
import re
from datetime import date
from dotenv import load_dotenv
from cookidoo_api import Cookidoo, CookidooConfig, get_localization_options

load_dotenv()

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "recipes_export.json")

# Words to exclude (Claudia's restrictions: fish + eggplant)
EXCLUDE_WORDS = {
    "salmon", "salmón", "atun", "atún", "tuna",
    "merluza", "sardina", "sardinas", "pescado", "pescados",
    "berenjena", "berenjenas", "eggplant",
}

# Delay between API calls to avoid rate-limiting
API_DELAY = 0.5


def contains_excluded(text: str) -> bool:
    """Check if text contains any excluded word."""
    text_lower = text.lower()
    for word in EXCLUDE_WORDS:
        if word in text_lower:
            return True
    return False


def strip_html(text: str) -> str:
    """Remove HTML tags from text."""
    return re.sub(r"<[^>]+>", "", text)


def parse_recipe_json(raw: dict, localization_url: str, language: str) -> dict | None:
    """Parse raw API JSON into structured recipe dict. Returns None if excluded."""
    recipe_id = raw.get("id", "")
    title = raw.get("title", "")

    # Check title for exclusions
    if contains_excluded(title):
        return None

    # Extract ingredients
    ingredients = []
    for group in raw.get("recipeIngredientGroups", []):
        for ing in group.get("recipeIngredients", []):
            name = ing.get("ingredientNotation", "")
            # Check ingredient for exclusions
            if contains_excluded(name):
                return None
            quantity_obj = ing.get("quantity")
            quantity = ""
            if quantity_obj:
                val = quantity_obj.get("value")
                if val is not None:
                    quantity = str(val)
                else:
                    f = quantity_obj.get("from")
                    t = quantity_obj.get("to")
                    if f is not None and t is not None:
                        quantity = f"{f} - {t}"
            unit = ing.get("unitNotation", "") or ""
            ingredients.append({
                "name": name,
                "quantity": quantity,
                "unit": unit,
            })

    # Extract steps from recipeStepGroups
    instructions = []
    for step_group in raw.get("recipeStepGroups", []):
        for step in step_group.get("recipeSteps", []):
            text = step.get("formattedText", "")
            instructions.append(strip_html(text))

    # Extract nutrition
    nutrition = {}
    for ng in raw.get("nutritionGroups", []):
        for rn in ng.get("recipeNutritions", []):
            for n in rn.get("nutritions", []):
                ntype = n.get("type", "")
                nutrition[ntype] = {
                    "value": n.get("number", 0),
                    "unit": n.get("unittype", ""),
                }

    # Extract times
    total_time = 0
    active_time = 0
    for t in raw.get("times", []):
        q = t.get("quantity", {})
        val = q.get("value", 0) if q else 0
        if t.get("type") == "totalTime" and val:
            total_time = val
        elif t.get("type") == "activeTime" and val:
            active_time = val

    # Serving size
    serving_obj = raw.get("servingSize", {})
    servings = 0
    if serving_obj:
        sq = serving_obj.get("quantity", {})
        if sq:
            servings = sq.get("value", 0) or 0

    # Difficulty
    difficulty = raw.get("difficulty", "")

    # Construct URL
    from urllib.parse import urlparse
    parsed = urlparse(localization_url)
    domain = parsed.netloc
    url = f"https://{domain}/recipes/recipe/{language}/{recipe_id}"

    return {
        "id": recipe_id,
        "name": title,
        "ingredients": ingredients,
        "instructions": instructions,
        "nutrition": nutrition,
        "cookTime": total_time,
        "activeTime": active_time,
        "servings": servings,
        "difficulty": difficulty,
        "url": url,
    }


async def fetch_raw_recipe(session: aiohttp.ClientSession, cookidoo: Cookidoo, recipe_id: str) -> dict | None:
    """Fetch raw recipe JSON via direct API call."""
    loc = cookidoo._cfg.localization
    url = cookidoo.api_endpoint / f"recipes/recipe/{loc.language}/{recipe_id}"
    headers = cookidoo._api_headers
    try:
        async with session.get(url, headers=headers) as r:
            if r.status == 401:
                print(f"    Auth expired, refreshing token...")
                await cookidoo.refresh_token()
                headers = cookidoo._api_headers
                async with session.get(url, headers=headers) as r2:
                    if r2.status != 200:
                        print(f"    Failed after refresh: {r2.status}")
                        return None
                    return await r2.json()
            if r.status != 200:
                print(f"    HTTP {r.status} for {recipe_id}")
                return None
            return await r.json()
    except Exception as e:
        print(f"    Error fetching {recipe_id}: {e}")
        return None


async def fetch_recipes():
    """Fetch recipes from Cookidoo and export as JSON."""
    async with aiohttp.ClientSession() as session:
        localizations = await get_localization_options(country="es", language="es-ES")
        if not localizations:
            localizations = await get_localization_options(country="es")

        if not localizations:
            print("ERROR: Could not find Spanish localization")
            return

        loc = localizations[0]
        print(f"Using localization: {loc}")

        cookidoo = Cookidoo(
            session,
            cfg=CookidooConfig(
                email=os.environ["EMAIL"],
                password=os.environ["PASSWORD"],
                localization=loc,
            ),
        )

        print("Logging in...")
        await cookidoo.login()
        print("Login OK!")

        # Collect all recipe IDs from collections
        recipe_ids = set()

        # 1. Managed collections
        print("\n--- Managed Collections ---")
        total_managed, total_pages = await cookidoo.count_managed_collections()
        print(f"Total managed collections: {total_managed} ({total_pages} pages)")
        for page in range(total_pages):
            collections = await cookidoo.get_managed_collections(page=page)
            for coll in collections:
                print(f"  Collection: {coll.name} ({len(coll.chapters)} chapters)")
                for chapter in coll.chapters:
                    for recipe in chapter.recipes:
                        recipe_ids.add(recipe.id)

        # 2. Custom collections
        print("\n--- Custom Collections ---")
        total_custom, custom_pages = await cookidoo.count_custom_collections()
        print(f"Total custom collections: {total_custom} ({custom_pages} pages)")
        for page in range(custom_pages):
            collections = await cookidoo.get_custom_collections(page=page)
            for coll in collections:
                print(f"  Collection: {coll.name} ({len(coll.chapters)} chapters)")
                for chapter in coll.chapters:
                    for recipe in chapter.recipes:
                        recipe_ids.add(recipe.id)

        # 3. Calendar recipes (current week)
        print("\n--- Calendar This Week ---")
        week = await cookidoo.get_recipes_in_calendar_week(date.today())
        for day in week:
            for recipe in day.recipes:
                recipe_ids.add(recipe.id)
                print(f"  {day.title}: {recipe.name}")

        print(f"\nTotal unique recipe IDs found: {len(recipe_ids)}")

        # Fetch full details for each recipe via raw API calls
        print("\n--- Fetching Recipe Details ---")
        exported_recipes = []
        excluded_count = 0
        error_count = 0

        for i, rid in enumerate(sorted(recipe_ids), 1):
            print(f"  [{i}/{len(recipe_ids)}] Fetching {rid}...", end=" ")
            raw = await fetch_raw_recipe(session, cookidoo, rid)
            if raw is None:
                error_count += 1
                print("ERROR")
                await asyncio.sleep(API_DELAY)
                continue

            parsed = parse_recipe_json(raw, loc.url, loc.language)
            if parsed is None:
                excluded_count += 1
                print(f"EXCLUDED ({raw.get('title', '?')})")
            else:
                exported_recipes.append(parsed)
                print(f"OK - {parsed['name']}")

            await asyncio.sleep(API_DELAY)

        # Sort by name
        exported_recipes.sort(key=lambda r: r["name"])

        # Export
        export_data = {
            "fetched_at": str(date.today()),
            "total_recipes": len(exported_recipes),
            "excluded_count": excluded_count,
            "error_count": error_count,
            "recipes": exported_recipes,
        }

        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(export_data, f, ensure_ascii=False, indent=2)

        print(f"\nExported {len(exported_recipes)} recipes to {OUTPUT_FILE}")
        print(f"Excluded: {excluded_count}, Errors: {error_count}")
        print("Done!")


if __name__ == "__main__":
    asyncio.run(fetch_recipes())
