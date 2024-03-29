import { Role } from './../../_enums/role.enum';
import { Injectable } from '@angular/core';

import { UserHttpService } from './user-http.service';

import { User } from '@app/_models';
import { SortByEnum } from '@app/_enums/user.enum';

import { SortService } from '../helpers/sort.service';
import { FormErrors } from '@app/_helpers/form-error';

@Injectable({
  providedIn: 'root',
})
export class UserPaginationSearchService extends SortService<User> {
  /* Search */


  constructor(private service: UserHttpService) {
    super(service);
    this.sortByP = SortByEnum.username;
  }

  canEditOrDelete(x: User): boolean {
    return false;
  }

  getSortByEnum() {
    return SortByEnum;
  }

  getDefaultSortByEnum() {
    return SortByEnum.username;
  }

  newValue(x: any, isInitSelected: boolean): User {
    return new User(x);
  }

  canEdit(user: User): boolean {
    return user.roles.indexOf(Role.SuperAdmin) === -1;
  }

  setSelected(user: User) {
    if (this.canEdit(user)) {
      super.setSelected(user);
    }
  }

  updateUser(user: User, role: Role) {
    if (user.roles.indexOf(role) === -1) {
      this.loading = true;
      const previousRole = user.roles;
      user.roles = [role];
      this.service.update(user.username, user).subscribe(
        (ret) => {
          this.endTransaction();
        },
        (error) => {
          user.roles = previousRole;
          this.endTransactionError(error);
        }
      );
    }
  }

  endTransaction() {
    this.loading = false;
  }

  endTransactionError(error) {
    this.loading = false;
    if (error) {
      this.errors.formatError(error);
    } else {
      this.errors = new FormErrors();
    }
  }
}
