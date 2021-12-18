import { Router } from '@angular/router';
import { FacilityScheduleComponent } from './../facility-schedule/facility-schedule.component';
import { RequestDetailComponent } from './../../../home/request-detail/request-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { IcpdpService } from './../../../core/service/icpdp.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '@app/core/service/authenticate.service';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css'],
  animations: [appModuleAnimation()],

})
export class ManageRequestComponent implements OnInit {
  listPendingRequest = []
  p: number = 1
  allowSendMonthRequest: boolean = false
  constructor(private pdpService: IcpdpService, private dialog: MatDialog, private router: Router, public authenService: AuthenticateService) { }

  ngOnInit(): void {
    this.getPendingRequest()
    this.allowSendMonthRequest = localStorage.getItem("requestTypeStatus") == "true" ? true : false
  }

  getPendingRequest() {
    if (this.authenService.userRole != 'ROLE_SRO') {
      this.pdpService.getPendingRequest().subscribe(data => {
        this.listPendingRequest = data
      },
        (err) => {
          if (err == "401") {
            this.router.navigate(["account/login"])
          }
        })
    }
  }
  viewRequestDetail(request: any) {
    let ref = this.dialog.open(RequestDetailComponent, {
      width: "80vw",
      data: {
        // type: "local",
        action: "pdp-view",
        request: request
      },
    })
    ref.afterClosed().subscribe(rs => {
      if (rs) {
        this.getPendingRequest()
      }
    })
  }
  viewSchedule() {
    this.dialog.open(FacilityScheduleComponent, {
      width: "80vw"
    }
    )
  }
  viewFacility() {
    this.router.navigate(["/app/facility"])
  }
  viewClub() {
    this.router.navigate(["/app/club"])
  }
  viewEvent() {
    this.router.navigate(["/app/event"])
  }
  setRequestTypeStatus() {
    this.pdpService.setRequestTypeStatus(this.allowSendMonthRequest).subscribe(rs => {
    },
      (err) => {
        if (err == "401") {
          this.router.navigate(["account/login"])
        }
        else {
          abp.notify.success("Set request success")
          localStorage.setItem("requestTypeStatus", this.allowSendMonthRequest.toString())
        }

      })

  }

}

