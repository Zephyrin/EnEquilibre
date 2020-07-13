import { UserPaginationSearchService } from '@app/_services/user/user-pagination-search.service';
import { Role } from '@app/_enums/role.enum';
import { SortByEnum } from '@app/_enums/user.enum';
import { SortEnum } from '@app/_enums/boolean.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: UserPaginationSearchService) {
  }

  get sortEnum() { return SortEnum; }
  get sortByEnum() { return SortByEnum; }
  get role() { return Role; }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.service.init(this.router, this.route, params);
    });
  }
}
