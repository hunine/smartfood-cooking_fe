import { Injectable } from '@angular/core';
import { Level } from '../api/level';
import { HttpService } from './http.service';
import { ManagementUrlConfig } from '../configs/manager-url.config';
import { IQuery, IReturnData } from '../common/interfaces/interface';

@Injectable()
export class LevelService {
  constructor(private httpService: HttpService) {}

  async getLevels(query: IQuery): Promise<IReturnData<Level>> {
    const queryStr = Object.entries(query).map(([key, value]) =>
      value ? `${key}=${value}` : ''
    );

    const url = `${ManagementUrlConfig.levelUrl}?${queryStr.join('&')}`;
    return this.httpService.get(url);
  }

  async createLevel(data: Level) {
    const url = `${ManagementUrlConfig.levelUrl}`;
    return this.httpService.post(url, data);
  }

  async updateLevel(data: Level): Promise<Level> {
    const url = `${ManagementUrlConfig.levelUrl}/${data.id}`;
    return this.httpService.patch(url, data);
  }

  async deleteLevel(id: string) {
    const url = `${ManagementUrlConfig.levelUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteLevels(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.levelUrl}${query}`;
    return this.httpService.delete(url);
  }
}
