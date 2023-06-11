import { AppConfig } from './app.config';

export class ManagementUrlConfig {
  public static levelUrl = `${AppConfig.ApiRoot}/api/levels`;
  public static recipeUrl = `${AppConfig.ApiRoot}/api/recipes`;
  public static cuisineUrl = `${AppConfig.ApiRoot}/api/cuisine`;
  public static categoryUrl = `${AppConfig.ApiRoot}/api/categories`;
  public static ingredientUrl = `${AppConfig.ApiRoot}/api/ingredients`;
}
