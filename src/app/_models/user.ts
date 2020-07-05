export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: string[];
  token?: string;
  lastLogin: Date;

  constructor(u: User = null) {
    if (u && u !== null) {
      this.id = u.id;
      this.username = u.username;
      this.password = u.password;
      this.email = u.email;
      this.roles = u.roles;
      this.token = u.token;
      this.lastLogin = u.lastLogin;
    }
  }
}
