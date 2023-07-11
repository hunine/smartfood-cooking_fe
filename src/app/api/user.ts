import { Gender } from '../common/enum/gender.enum';
import { Role } from '../common/enum/role.enum';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  deletedAt?: string;
}

export interface UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  age?: number;
  gender?: Gender;
  height?: number;
  weight?: number;
  role: Role;
}

export interface ChangingPasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CountUsers {
  totalUsers: number;
  newUsersLastWeek: number;
}
