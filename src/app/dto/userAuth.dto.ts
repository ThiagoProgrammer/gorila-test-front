export class UserAuthDTO {
  email?: string;
  password?: string;
  constructor(params: UserAuthDTO) {
    Object.assign(this, params);
  }
}
