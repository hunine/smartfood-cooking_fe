import { Injectable } from '@angular/core';
import { ManagementUrlConfig } from '../configs/manager-url.config';
import { HttpService } from './http.service';

@Injectable()
export class CookingHistoryService {
  constructor(private httpService: HttpService) {}

  async getRecipeStatistic(from: string, to: string) {
    const url = `${ManagementUrlConfig.cookingHistoryUrl}/recipes-statistics?from=${from}&to=${to}`;
    return this.httpService.get(url);
  }
}
