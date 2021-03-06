import { AuthenticateService } from './core/service/authenticate.service';
import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { IcpdpService } from './core/service/icpdp.service';

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;

  constructor(
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService, private authenService: AuthenticateService, private pdpService:IcpdpService
  ) {
    super(injector); 
  }

  ngOnInit(): void {
    if (localStorage.getItem("userId")) {
      this.authenService.userId = Number(localStorage.getItem("userId"))
    }
    if(localStorage.getItem("userToken")){
      this.authenService.setToken(localStorage.getItem("userToken"))
      
    }
   
    if(localStorage.getItem("clubMember")){
      this.authenService.clubMember = localStorage.getItem("clubMember")=='true'?true:false
    }
    if(localStorage.getItem("userRole")){
      this.authenService.userRole = localStorage.getItem("userRole")
    }
    if(localStorage.getItem("userName")){
      this.authenService.userName = localStorage.getItem("userName")
    }
    if(localStorage.getItem("eventmember")){
      this.authenService.eventMember = localStorage.getItem("eventmember")=="true"?true:false
    }
    if(localStorage.getItem("requestTypeStatus")){
      this.authenService.requestTypeStatus = localStorage.getItem("requestTypeStatus") == "true"?true:false
    }
    this.pdpService.getEventClubRequest(this.authenService.userName ).subscribe(rs=>{
      localStorage.setItem("requestTypeStatus", rs.requestTypeStatus)
      localStorage.setItem("eventmember", rs.eventStatus)
      localStorage.setItem("clubMember", rs.clubStatus)
      this.authenService.clubMember = rs.clubStatus
      this.authenService.eventMember = rs.eventStatus
      this.authenService.requestTypeStatus = rs.requestTypeStatus
      console.log( this.authenService.requestTypeStatus )
  

    })
   

    
    this.renderer.addClass(document.body, 'sidebar-mini');

    // SignalRAspNetCoreHelper.initSignalR();

    abp.event.on('abp.notifications.received', (userNotification) => {
      abp.notifications.showUiNotifyForUserNotification(userNotification);

      // Desktop notification
      Push.create('AbpZeroTemplate', {
        body: userNotification.notification.data.message,
        icon: abp.appPath + 'assets/app-logo-small.png',
        timeout: 6000,
        onClick: function () {
          window.focus();
          this.close();
        }
      });
    });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
}
