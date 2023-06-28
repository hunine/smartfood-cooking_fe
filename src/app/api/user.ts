export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  deletedAt: string;
}

export interface UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ChangingPasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface CountUsers {
  totalUsers: number;
  newUsersLastWeek: number;
}
