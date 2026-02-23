export type IngredientCategory =
  | 'proteinas'
  | 'verduras'
  | 'frutas'
  | 'lacteos'
  | 'granos'
  | 'condimentos'
  | 'aceites'
  | 'endulzantes'
  | 'otros';

export interface CategoryInfo {
  id: IngredientCategory;
  label: string;
  icon: string; // lucide-react icon name
}

export const CATEGORY_ORDER: IngredientCategory[] = [
  'proteinas',
  'verduras',
  'frutas',
  'lacteos',
  'granos',
  'condimentos',
  'aceites',
  'endulzantes',
  'otros',
];

export const CATEGORY_INFO: Record<IngredientCategory, CategoryInfo> = {
  proteinas: { id: 'proteinas', label: 'Proteínas', icon: 'Beef' },
  verduras: { id: 'verduras', label: 'Verduras y Hortalizas', icon: 'Carrot' },
  frutas: { id: 'frutas', label: 'Frutas', icon: 'Cherry' },
  lacteos: { id: 'lacteos', label: 'Lácteos y Alternativas', icon: 'Milk' },
  granos: { id: 'granos', label: 'Granos y Legumbres', icon: 'Wheat' },
  condimentos: { id: 'condimentos', label: 'Condimentos y Especias', icon: 'Flame' },
  aceites: { id: 'aceites', label: 'Aceites y Grasas', icon: 'Droplets' },
  endulzantes: { id: 'endulzantes', label: 'Endulzantes', icon: 'Candy' },
  otros: { id: 'otros', label: 'Otros', icon: 'Package' },
};

// Normalize ingredient names for merging duplicates
const NAME_NORMALIZATIONS: Record<string, string> = {
  'Huevo': 'Huevos',
  'Aceite de oliva virgen extra': 'Aceite de oliva',
  'Palta madura': 'Palta',
  'Zumo de limón': 'Limón',
  'Pechuga de pollo sin piel': 'Pechuga de pollo',
  'Pollo o tofu': 'Pechuga de pollo',
  'Zucchini rallado': 'Zucchini',
  'Calabacines': 'Zucchini',
  'Tomates': 'Tomate',
  'Zanahorias': 'Zanahoria',
  'Cebolla roja': 'Cebolla colorada',
  'Cebolla morada': 'Cebolla colorada',
  'Oregano seco': 'Oregano',
  'Comino molido': 'Comino',
  'Cacao extra para rebozar': 'Cacao amargo en polvo',
  'Coco rallado extra para rebozar': 'Coco rallado',
  'Boniato cocido': 'Boniato',
  'Lentejas cocidas': 'Lentejas',
  'Morrón rojo': 'Morrón rojo',
  'Morrón verde': 'Morrón verde',
  'Champinones': 'Champiñones',
  'Pizca de sal': 'Sal',
};

export function normalizeIngredientName(name: string): string {
  return NAME_NORMALIZATIONS[name] || name;
}

// Map every ingredient to a category
const INGREDIENT_CATEGORY_MAP: Record<string, IngredientCategory> = {
  // Proteinas
  'Pechuga de pollo': 'proteinas',
  'Cuadril': 'proteinas',
  'Carne picada magra': 'proteinas',
  'Huevos': 'proteinas',
  'Pollo o tofu': 'proteinas',
  'Pechuga de pollo sin piel': 'proteinas',
  'Atún al natural': 'proteinas',
  'Atun al natural': 'proteinas',
  'Bondiola': 'proteinas',

  // Verduras y Hortalizas
  'Zucchini': 'verduras',
  'Morrón rojo': 'verduras',
  'Morrón verde': 'verduras',
  'Cebolla': 'verduras',
  'Brotes de soja': 'verduras',
  'Cebolla colorada': 'verduras',
  'Tomate': 'verduras',
  'Rúcula': 'verduras',
  'Rucula': 'verduras',
  'Tomates cherry': 'verduras',
  'Zanahoria': 'verduras',
  'Cebolla de verdeo': 'verduras',
  'Espinacas congeladas': 'verduras',
  'Lombarda': 'verduras',
  'Cebolleta': 'verduras',
  'Calabacines': 'verduras',
  'Tomates': 'verduras',
  'Zanahorias': 'verduras',
  'Pulpa de calabaza': 'verduras',
  'Tomates pera': 'verduras',
  'Pimiento verde': 'verduras',
  'Pepino': 'verduras',
  'Tomate troceado en conserva': 'verduras',
  'Zucchini rallado': 'verduras',
  'Cebolla roja': 'verduras',
  'Boniato': 'verduras',
  'Lechuga': 'verduras',
  'Champiñones': 'verduras',
  'Salsa de tomate': 'verduras',

  // Frutas
  'Palta': 'frutas',
  'Palta madura': 'frutas',
  'Limón': 'frutas',
  'Limon': 'frutas',
  'Lima': 'frutas',
  'Manzanas verdes': 'frutas',
  'Frutos rojos': 'frutas',
  'Fruta congelada': 'frutas',
  'Dátiles medjool': 'frutas',
  'Datiles medjool': 'frutas',
  'Zumo de limón': 'frutas',
  'Zumo de limon': 'frutas',

  // Lacteos y Alternativas
  'Parmesano': 'lacteos',
  'Leche de coco': 'lacteos',
  'Leche vegetal': 'lacteos',
  'Leche deslactosada o vegetal': 'lacteos',
  'Leche': 'lacteos',
  'Mantequilla': 'lacteos',
  'Queso rallado': 'lacteos',
  'Queso de bola': 'lacteos',
  'Mozzarella light': 'lacteos',
  'Nata': 'lacteos',

  // Granos y Legumbres
  'Garbanzos cocidos': 'granos',
  'Quinoa': 'granos',
  'Arroz integral cocido': 'granos',
  'Avena': 'granos',
  'Harina de avena': 'granos',
  'Harina de almendras': 'granos',
  'Harina': 'granos',
  'Harina de garbanzo': 'granos',
  'Lentejas': 'granos',
  'Coco rallado': 'granos',
  'Semillas de chía': 'granos',
  'Semillas de chia': 'granos',
  'Almendras': 'granos',
  'Maní': 'granos',
  'Mani': 'granos',
  'Semillas de sésamo': 'granos',
  'Semillas de sesamo': 'granos',
  'Mantequilla de maní': 'granos',
  'Mantequilla de mani': 'granos',

  // Condimentos y Especias
  'Salsa de soja': 'condimentos',
  'Jengibre fresco': 'condimentos',
  'Ajo': 'condimentos',
  'Orégano': 'condimentos',
  'Oregano': 'condimentos',
  'Orégano seco': 'condimentos',
  'Oregano seco': 'condimentos',
  'Comino': 'condimentos',
  'Comino molido': 'condimentos',
  'Cúrcuma molida': 'condimentos',
  'Pimentón': 'condimentos',
  'Pimenton': 'condimentos',
  'Cilantro fresco': 'condimentos',
  'Perejil fresco': 'condimentos',
  'Canela': 'condimentos',
  'Nuez moscada': 'condimentos',
  'Esencia de vainilla': 'condimentos',
  'Sal y pimienta': 'condimentos',
  'Sal': 'condimentos',
  'Sal gruesa': 'condimentos',
  'Pimienta': 'condimentos',
  'Pimienta de Cayena': 'condimentos',
  'Aceto balsámico': 'condimentos',
  'Vinagre balsámico': 'condimentos',
  'Vinagre': 'condimentos',
  'Polvo de hornear': 'condimentos',
  'Pastilla de caldo de verduras': 'condimentos',

  // Aceites y Grasas
  'Aceite de oliva': 'aceites',
  'Aceite de oliva virgen extra': 'aceites',
  'Aceite de sésamo (opcional)': 'aceites',
  'Aceite de sesamo (opcional)': 'aceites',
  'Aceite de coco': 'aceites',

  // Endulzantes
  'Stevia': 'endulzantes',
  'Azúcar': 'endulzantes',
  'Azucar': 'endulzantes',
  'Cacao amargo en polvo': 'endulzantes',
  'Cacao extra para rebozar': 'endulzantes',
  'Chips de chocolate amargo': 'endulzantes',
};

export function getIngredientCategory(name: string): IngredientCategory {
  const normalized = normalizeIngredientName(name);
  return INGREDIENT_CATEGORY_MAP[normalized] || INGREDIENT_CATEGORY_MAP[name] || 'otros';
}
