import { Injectable } from '@angular/core';
import { Ingredient } from '../api/ingredient';
import { HttpService } from './http.service';
import { IQuery, IReturnData } from '../common/interface';
import { ManagementUrlConfig } from '../configs/manager-url.config';

@Injectable()
export class IngredientService {
  constructor(private httpService: HttpService) {}

  async getIngredients(query: IQuery): Promise<IReturnData<Ingredient>> {
    const queryStr = Object.entries(query).map(([key, value]) =>
      value ? `${key}=${value}` : ''
    );

    const url = `${ManagementUrlConfig.ingredientUrl}?${queryStr.join('&')}`;
    return this.httpService.get(url);
  }

  async createIngredient(data: Ingredient) {
    const url = `${ManagementUrlConfig.ingredientUrl}`;
    return this.httpService.post(url, data);
  }

  async updateIngredient(data: Ingredient): Promise<Ingredient> {
    const url = `${ManagementUrlConfig.ingredientUrl}/${data.id}`;
    return this.httpService.patch(url, data);
  }

  async deleteIngredient(id: string) {
    const url = `${ManagementUrlConfig.ingredientUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteIngredients(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.ingredientUrl}${query}`;
    return this.httpService.delete(url);
  }
}
