import { SROManagementComponent } from './modules/sro-management/sro-management.component';
import { FacilityScheduleComponent } from './modules/IC-PDP/facility-schedule/facility-schedule.component';
import { EventComponent } from './modules/event/event.component';
import { ClubComponent } from './modules/club/club.component';
import { FacilityComponent } from './modules/facility/facility.component';
import { ManageRequestComponent } from './modules/IC-PDP/manage-request/manage-request.component';
import { BookRequestComponent } from './modules/book-request/book-request.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './modules/admin/admin.component';
import { RequestLogComponent } from './modules/request-log/request-log.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent },
                    { path: 'about', component: AboutComponent},
                    { path: 'book-request', component: BookRequestComponent},
                    { path: 'manage-request', component: ManageRequestComponent},
                    { path: 'facility', component: FacilityComponent},
                    { path: 'club', component: ClubComponent},
                    { path: 'event', component: EventComponent},
                    { path: 'facility-schedule', component: FacilityScheduleComponent},
                    { path: 'admin', component: AdminComponent},
                    { path: 'request-log', component: RequestLogComponent},
                    { path: 'SRO', component: SROManagementComponent},

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
