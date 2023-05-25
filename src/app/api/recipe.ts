import { Category } from './category';
import { Cuisine } from './cuisine';
import { Ingredient } from './ingredient';
import { Level } from './level';

interface Quantification {
  id: string;
  value: string;
  unit: string;
  ingredient: Ingredient;
}

interface Step {
  id: string;
  content: string;
  order: number;
}

export interface Recipe {
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  level?: Level;
  category?: Category;
  cuisine?: Cuisine;
  quantification?: Quantification[];
  recipeStep?: Step[];
}
