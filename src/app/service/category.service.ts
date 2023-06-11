import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from '../api/category';
import { IQuery, IReturnData } from '../common/interface';
import { ManagementUrlConfig } from '../configs/manager-url.config';

@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {}

  async getCategories(query: IQuery): Promise<IReturnData<Category>> {
    const queryStr = Object.entries(query).map(([key, value]) =>
      value ? `${key}=${value}` : ''
    );

    const url = `${ManagementUrlConfig.categoryUrl}?${queryStr.join('&')}`;
    return this.httpService.get(url);
  }

  async createCategory(data: Category) {
    const url = `${ManagementUrlConfig.categoryUrl}`;
    return this.httpService.post(url, data);
  }

  async updateCategory(data: Category): Promise<Category> {
    const url = `${ManagementUrlConfig.categoryUrl}/${data.id}`;
    return this.httpService.patch(url, data);
  }

  async deleteCategory(id: string) {
    const url = `${ManagementUrlConfig.categoryUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteCategories(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.categoryUrl}${query}`;
    return this.httpService.delete(url);
  }
}
