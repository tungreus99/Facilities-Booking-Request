import { DetailEventListMemberComponent } from './modules/event/detail-event-list-member/detail-event-list-member.component';
import { CreateEditEventComponent } from './modules/event/create-edit-event/create-edit-event.component';
import { EventComponent } from './modules/event/event.component';
import { DetailClubListMemberComponent } from './modules/club/detail-club-list-member/detail-club-list-member.component';
import { CreateEditClubComponent } from './modules/club/create-edit-club/create-edit-club.component';
import { ClubComponent } from './modules/club/club.component';
import { BookRequestComponent } from './modules/book-request/book-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
// roles


// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AllRequestDialogComponent } from './home/all-request-dialog/all-request-dialog.component';
import { RequestDetailComponent } from './home/request-detail/request-detail.component';
import { ManageRequestComponent } from './modules/IC-PDP/manage-request/manage-request.component';
import { FacilityComponent } from './modules/facility/facility.component';
import { CreateEditFacilityComponent } from './modules/facility/create-edit-facility/create-edit-facility.component';
import { AddClubMemberComponent } from './modules/club/detail-club-list-member/add-club-member/add-club-member.component';
import { FacilityScheduleComponent } from './modules/IC-PDP/facility-schedule/facility-schedule.component';
import { AdminComponent } from './modules/admin/admin.component';
import { RequestLogComponent } from './modules/request-log/request-log.component';
import { CreatEditAdminComponent } from './modules/admin/creat-edit-admin/creat-edit-admin.component';
import { AddEventMemberComponent } from './modules/event/create-edit-event/add-event-member/add-event-member.component';
import { ImportFacilityComponent } from './modules/facility/import-facility/import-facility.component';
import { ImportClubComponent } from './modules/club/import-club/import-club.component';
import { ImportEventComponent } from './modules/event/import-event/import-event.component';
import { ListOldEventsComponent } from './modules/event/list-old-events/list-old-events.component';
import { RequestLogDetailComponent } from './modules/request-log/request-log-detail/request-log-detail.component';
import { ReportDialogComponent } from './home/report-dialog/report-dialog.component';
import { ClubListComponent } from './modules/admin/club-list/club-list.component';
import { EventListComponent } from './modules/admin/event-list/event-list.component';
import { FacilityListComponent } from './modules/admin/facility-list/facility-list.component';
import { SROManagementComponent } from './modules/sro-management/sro-management.component';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants

    // roles
    // users
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    BookRequestComponent,
    AllRequestDialogComponent,
    RequestDetailComponent,
    ManageRequestComponent,
    FacilityComponent,
    CreateEditFacilityComponent,
    ClubComponent,
    CreateEditClubComponent,
    DetailClubListMemberComponent,
    EventComponent,
    CreateEditEventComponent,
    DetailEventListMemberComponent,
    AddClubMemberComponent,
    FacilityScheduleComponent,
    AdminComponent,
    RequestLogComponent,
    CreatEditAdminComponent,
    AddEventMemberComponent,
    ImportFacilityComponent,
    ImportClubComponent,
    ImportEventComponent,
    ListOldEventsComponent,
    RequestLogDetailComponent,
    ReportDialogComponent,
    ClubListComponent,
    EventListComponent,
    FacilityListComponent,
    SROManagementComponent,
    
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule,
    SocialLoginModule 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('879411761479-734qv2e2efi9f68utvo8catolkcfbe47.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }
  ],
  entryComponents: [
    // tenants

    // users

  ],
})
export class AppModule {}
