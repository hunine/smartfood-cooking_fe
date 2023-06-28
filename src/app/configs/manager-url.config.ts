import { AppConfig } from './app.config';

export class ManagementUrlConfig {
  public static userUrl = `${AppConfig.ApiRoot}/api/users`;
  public static levelUrl = `${AppConfig.ApiRoot}/api/levels`;
  public static recipeUrl = `${AppConfig.ApiRoot}/api/recipes`;
  public static cuisineUrl = `${AppConfig.ApiRoot}/api/cuisine`;
  public static categoryUrl = `${AppConfig.ApiRoot}/api/categories`;
  public static ingredientUrl = `${AppConfig.ApiRoot}/api/ingredients`;
  public static cookingHistoryUrl = `${AppConfig.ApiRoot}/api/cooking-histories`;
}
