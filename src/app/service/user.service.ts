import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IQuery } from '../common/interfaces/interface';
import { ManagementUrlConfig } from '../configs/manager-url.config';
import { paginationHelper } from '../common/helpers';
import { User, UserDto } from '../api/user';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  async getUsers(query: IQuery) {
    const queryStr = paginationHelper.objectToString(query);

    const url = `${ManagementUrlConfig.userUrl}?${queryStr}`;
    return this.httpService.get(url);
  }

  async getUserById(id: string): Promise<User> {
    const url = `${ManagementUrlConfig.userUrl}/${id}`;
    return this.httpService.get(url);
  }

  async updateUser(data: UserDto, method: string): Promise<User> {
    const url = `${ManagementUrlConfig.userUrl}/${data.id}`;

    if (method === 'put') {
      return this.httpService.put(url, data);
    }

    return this.httpService.patch(url, data);
  }

  async deleteUser(id: string) {
    const url = `${ManagementUrlConfig.userUrl}/${id}`;
    return this.httpService.delete(url);
  }

  async deleteUsers(ids: string[]) {
    const query = '?ids=' + ids.join('&ids=');
    const url = `${ManagementUrlConfig.userUrl}${query}`;
    return this.httpService.delete(url);
  }

  async countUsers() {
    const url = `${ManagementUrlConfig.userUrl}/count`;
    return this.httpService.get(url);
  }
}
