import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id!: number;
  username!: string;
  password!: string;
  fullname!: string;
  name!: string;
  email!: string;
  pic!: string;


}
