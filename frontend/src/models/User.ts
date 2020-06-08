export interface IUser {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  profile_pic: string;
  phone_number: string;
  oauth_uuid: string;
  groups: number[];
  user_permissions: number[];
}
