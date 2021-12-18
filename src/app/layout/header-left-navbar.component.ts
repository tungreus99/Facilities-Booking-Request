import { Router } from '@angular/router';
import { AuthenticateService } from '@app/core/service/authenticate.service';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent implements OnInit {
  sidebarExpanded: boolean;
  role:string =""
  constructor(private _layoutStore: LayoutStoreService, public authenService:AuthenticateService, private router:Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("userRole")
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
  routingHome(){
   
    if (this.role == 'ROLE_STUDENT' || this.role == 'ROLE_ADMIN') {
      this.router.navigate(["app/home"])
    }
    else {
      this.router.navigate(["app/manage-request"])
    }
  }
}
