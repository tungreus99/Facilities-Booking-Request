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
  backgroundImg=""
  currentMonth: number = new Date().getMonth()
  allowSendMonthRequest: boolean = false
  listBackground = [
    {
      event: "Spring",
      url: "url('../../assets/img/FPT1.png')"
    },
    {
      event: "Summer",
      url: "url('../../assets/img/FPT2.png')"
    },
    {
      event: "Autumn",
      url: "url('../../assets/img/FPT3.png')"

    },
    {
      event: "Winter",
      url: "url('../../assets/img/FPT4.png')"

    }
  ]
  constructor(private pdpService: IcpdpService, private dialog: MatDialog, private router: Router, public authenService: AuthenticateService) { }

  ngOnInit(): void {
    this.backgroundImg = this.listBackground.find(item => item.event == this.getBackgroundByEvent()).url
    this.getPendingRequest()
    this.allowSendMonthRequest = localStorage.getItem("requestTypeStatus") == "true" ? true : false
  }
  getBackgroundByEvent(): string {
    switch (this.currentMonth) {
      case 1:
      case 2:
      case 3:
        return "Spring"
      case 4:
      case 5:
      case 6:
        return "Summer"
      case 7:
      case 8:
      case 9:
        return "Autumn"
      case 10:
      case 11:
      case 12:
        return "Winter"
    }
  }

  getPendingRequest() {
      this.pdpService.getPendingRequest().subscribe(data => {
        this.listPendingRequest = data
      },
        (err) => {
          this.listPendingRequest = []
          if (err == "401") {
            this.router.navigate(["account/login"])
          }
        })

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
      console.log("close")
        this.getPendingRequest()
      
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
  resetEventCount(){
    abp.message.confirm(
      `Reset request event count?  `,
      "",
      (result: boolean) => {
        if (result) {
          this.pdpService.SetEventCount().subscribe(rs=>{
            abp.notify.success("reset successful")
          }
          ,()=>{
            abp.notify.success("reset successful")
          })
        }
      }
    );
  }
}

