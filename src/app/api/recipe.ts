import { Category } from './category';
import { Cuisine } from './cuisine';
import { Ingredient } from './ingredient';
import { Level } from './level';

export interface IngredientInQuantification {
  id?: string;
  name: string;
}

export interface Quantification {
  id?: string;
  value: number;
  unit: string;
  ingredient: IngredientInQuantification;
}

export interface Step {
  id?: string;
  content: string;
  order: number;
}

export interface Recipe {
  id?: string;
  name: string;
  rating: number;
  media?: string;
  description?: string;
  level: Level;
  category: Category;
  cuisine: Cuisine;
  quantification: Quantification[];
  recipeStep: Step[];
}

export interface QuantificationDto {
  id?: string;
  value: number;
  unit: string;
  ingredientId: string;
}

export interface RecipeDto {
  id?: string;
  name: string;
  description?: string;
  levelId: string;
  categoryId: string;
  cuisineId: string;
  ingredients: QuantificationDto[];
  steps: Step[];
}

export interface CountRecipes {
  totalRecipes: number;
  newRecipesLastWeek: number;
}
