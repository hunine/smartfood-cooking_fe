import { Injectable } from '@angular/core';
import { Recipe, RecipeDto } from '../api/recipe';
import { HttpService } from './http.service';
import { IQuery } from '../common/interfaces/interface';
import { ManagementUrlConfig } from '../configs/manager-url.config';
import { paginationHelper } from '../common/helpers';

@Injectable()
export class RecipeService {
  constructor(private httpService: HttpService) {}

  async getRecipes(query: IQuery) {
    const queryStr = paginationHelper.objectToString(query);

    const url = `${ManagementUrlConfig.recipeUrl}?${queryStr}`;
    return this.httpService.get(url);
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const url = `${ManagementUrlConfig.recipeUrl}/${id}`;
    return this.httpService.get(url);
  }

  async createRecipe(data: RecipeDto) {
    const url = `${ManagementUrlConfig.recipeUrl}`;
    return this.httpService.post(url, data);
  }

  async updateRecipe(data: RecipeDto, method: string): Promise<Recipe> {
    const url = `${ManagementUrlConfig.recipeUrl}/${data.id}`;

    if (method === 'put') {
      return this.httpService.put(url, data);
    }

    return this.httpService.patch(url, data);
  }

  async deleteRecipe(id: string) {
    const url = `${ManagementUrlConfig.recipeUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteRecipes(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.recipeUrl}${query}`;
    return this.httpService.delete(url);
  }

  async countRecipes() {
    const url = `${ManagementUrlConfig.recipeUrl}/count`;
    return this.httpService.get(url);
  }
}
