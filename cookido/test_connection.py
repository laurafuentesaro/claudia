import asyncio
import aiohttp
import os
from dotenv import load_dotenv
from cookidoo_api import Cookidoo, CookidooConfig, get_localization_options

load_dotenv()

async def main():
    async with aiohttp.ClientSession() as session:
        # Use Spanish localization (Spain)
        localizations = await get_localization_options(country="es", language="es-ES")
        if not localizations:
            localizations = await get_localization_options(country="es")
        print(f"Localization: {localizations[0] if localizations else 'NOT FOUND'}")

        cookidoo = Cookidoo(
            session,
            cfg=CookidooConfig(
                email=os.environ["EMAIL"],
                password=os.environ["PASSWORD"],
                localization=localizations[0],
            ),
        )

        print("Logging in...")
        await cookidoo.login()
        print("Login OK!")

        user = await cookidoo.get_user_info()
        print(f"User: {user.username}")
        print(f"Description: {user.description}")

        sub = await cookidoo.get_active_subscription()
        print(f"Subscription active: {sub.active if sub else 'No subscription'}")
        if sub:
            print(f"  Type: {sub.type}, Expires: {sub.expires}")

        # Shopping list
        ingredients = await cookidoo.get_ingredient_items()
        print(f"\nShopping list ingredients: {len(ingredients)}")
        for item in ingredients[:5]:
            print(f"  - {item.name} ({item.description})")

        additional = await cookidoo.get_additional_items()
        print(f"Additional items: {len(additional)}")
        for item in additional[:5]:
            print(f"  - {item.name}")

        # Collections
        managed_count = await cookidoo.count_managed_collections()
        custom_count = await cookidoo.count_custom_collections()
        print(f"\nManaged collections: {managed_count}")
        print(f"Custom collections: {custom_count}")

        # List some collections
        managed = await cookidoo.get_managed_collections(page=0)
        print(f"\nManaged collection names:")
        for c in managed[:5]:
            print(f"  - {c.name}")

        custom = await cookidoo.get_custom_collections(page=0)
        print(f"\nCustom collection names:")
        for c in custom[:5]:
            print(f"  - {c.name}")

        # Calendar - this week
        from datetime import date
        week = await cookidoo.get_recipes_in_calendar_week(date.today())
        print(f"\nCalendar this week:")
        for day in week:
            if day.recipes:
                print(f"  {day.date}: {[r.name for r in day.recipes]}")

asyncio.run(main())
