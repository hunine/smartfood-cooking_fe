export interface Ingredient {
  id?: string;
  name: string;
  media?: string[];
}

export interface CountIngredients {
  totalIngredients: number;
  newIngredientsLastWeek: number;
}
