import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { AuthenticateService } from './../core/service/authenticate.service';
import { Router } from '@angular/router';
import { AllRequestDialogComponent } from './all-request-dialog/all-request-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestDto } from './../core/modal/requestDto';
import { HomeService } from './../core/service/home.service';
import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { IcpdpService } from '@app/core/service/icpdp.service';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./home.component.css']

})
export class HomeComponent extends AppComponentBase {
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
  backgroundImg: string = ""
  totalRequest: number = 0
  requestList: RequestDto[] = []
  requestListByDate: RequestDto[] = []
  pendingPageNum: number = 1
  confirmPagNum: number = 1
  allowMonthRequest: boolean = false
  allowBookEvent: boolean = false
  currentMonth: number = new Date().getMonth()
  constructor(injector: Injector, private homeService: HomeService, private dialog: MatDialog, private router: Router, private pdpService: IcpdpService,
     public authenService: AuthenticateService) {
    super(injector);
    authenService.userId = Number(localStorage.getItem("userId"))
  }
  ngOnInit(): void {
    this.backgroundImg = this.listBackground.find(item => item.event == this.getBackgroundByEvent()).url
    this.getRequestist()
    this.getRequestByDate()
    
    // this.allowBookEvent = localStorage.getItem("clubMember") == "true" ? true : false
    this.pdpService.getEventClubRequest(this.authenService.userName ).subscribe(rs=>{
     
      this.allowMonthRequest = rs.requestTypeStatus
      
  

    })
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
  getRequestist() {
    this.homeService.getRequestByAccount(this.authenService.userId).pipe(catchError(this.homeService.handleError)).subscribe(data => {
      this.requestList = data
      this.totalRequest = data.length
    }, (err) => {
      if (err == "401") {
        this.router.navigate(["account/login"])
      }
    })
  }
  viewRequest(requestType) {
   let ref = this.dialog.open(AllRequestDialogComponent, {
      width: "80vw",
      maxHeight: "95vh",
      data: {
        type: requestType,
      }
    })
    ref.afterClosed().subscribe(rs=>{
      if(rs){
        this.getRequestist()
      }
    })
  }
  createRequest(requestType, isViewTable?: boolean) {
    this.router.navigate(['/app/book-request'], {
      queryParams: {
        action: "create",
        type: requestType,
        isViewTable: isViewTable
      }
    })
  }
  ConfirmRequest(request) {
    let message: string = ""
    message = `${request.facility.facilityName} to enter ${request.timeUsing} day ${moment(request.useDate).format("DD/MM/YYYY")}`
    abp.message.confirm(
      `Do you want to confirm using facility ${message}    ?  `,
      "",
      (result: boolean) => {
        if (result) {
          request.requestDetailStatus = "CONFIRMED"
          this.homeService.updateRequestDetailStatus(request.id, request).pipe(catchError(this.homeService.handleError)).subscribe(rs => {
            abp.notify.success("Confirm successful")
            this.getRequestByDate()
          },
            (err) => {
              if (err == "401") {
                this.router.navigate(["account/login"])
              }
              else {
                abp.notify.success("Confirm successful")
                this.getRequestByDate()
              }


            })
        }
      }
    );
  }

  getRequestByDate() {
    let currentUser = localStorage.getItem("userName")
    let tomorrow = moment().add(1, 'days').format("YYYY-MM-DD");

    this.homeService.getRequestDetailByDate(tomorrow).pipe(catchError(this.homeService.handleError)).subscribe(data => {
      this.requestListByDate = data
      this.requestListByDate = this.requestListByDate.filter(item => item.requestDetailStatus == "Open" && item.request.status == "APPROVED" && item.request.account.email == currentUser)
    },

      (err) => {
        if (err == "401") {
          this.router.navigate(["account/login"])
        }
      }

    )
  }

  closeRequest(request) {

    let message: string = ""
    message = `${request.facility.facilityName} to enter ${request.timeUsing} day ${moment(request.useDate).format("DD/MM/YYYY")}`
    abp.message.confirm(
      `Do you want to cancel the request? ${message}    ?  `,
      "",
      (result: boolean) => {
        if (result) {
          request.requestDetailStatus = "CLOSE"
          this.homeService.updateRequestDetailStatus(request.id, request).pipe(catchError(this.homeService.handleError)).subscribe(rs => {
            abp.notify.success("Closed request")
            this.getRequestByDate()
          },
            (err) => {
              if (err == "401") {
                this.router.navigate(["account/login"])
              }
              else {
                abp.notify.success("Closed request")
                this.getRequestByDate()
              }

            })
        }
      }
    );
  }
  report() {
    this.dialog.open(ReportDialogComponent, {
      width: "800px"
    })
  }




}
