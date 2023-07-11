export interface Ingredient {
  id?: string;
  name: string;
  kcal: number;
  carbs: number;
  protein: number;
  fat: number;
  media?: string[];
}

export interface CountIngredients {
  totalIngredients: number;
  newIngredientsLastWeek: number;
}
