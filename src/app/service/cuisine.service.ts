import { Injectable } from '@angular/core';
import { IQuery, IReturnData } from '../common/interfaces/interface';
import { Cuisine } from '../api/cuisine';
import { ManagementUrlConfig } from '../configs/manager-url.config';
import { HttpService } from './http.service';
import { paginationHelper } from '../common/helpers';

@Injectable()
export class CuisineService {
  constructor(private httpService: HttpService) {}

  async getCuisineArray(query: IQuery): Promise<IReturnData<Cuisine>> {
    const queryStr = paginationHelper.objectToString(query);

    const url = `${ManagementUrlConfig.cuisineUrl}?${queryStr}`;
    return this.httpService.get(url);
  }

  async createCuisine(data: Cuisine) {
    const url = `${ManagementUrlConfig.cuisineUrl}`;
    return this.httpService.post(url, data);
  }

  async updateCuisine(data: Cuisine): Promise<Cuisine> {
    const url = `${ManagementUrlConfig.cuisineUrl}/${data.id}`;
    return this.httpService.patch(url, data);
  }

  async deleteCuisine(id: string) {
    const url = `${ManagementUrlConfig.cuisineUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteCuisineArray(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.cuisineUrl}${query}`;
    return this.httpService.delete(url);
  }
}
