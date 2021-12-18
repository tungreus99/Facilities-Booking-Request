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

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./home.component.css']

})
export class HomeComponent extends AppComponentBase {
  totalRequest: number = 0
  requestList: RequestDto[] = []
  requestListByDate: RequestDto[] = []
  pendingPageNum: number = 1
  confirmPagNum: number = 1
  allowMonthRequest: boolean = false
  allowBookEvent:boolean =false
  constructor(injector: Injector, private homeService: HomeService, private dialog: MatDialog, private router: Router, public authenService: AuthenticateService) {
    super(injector);
    authenService.userId = Number(localStorage.getItem("userId"))
  }
  ngOnInit(): void {
    this.getRequestist()
    this.getRequestByDate()
    this.allowMonthRequest = localStorage.getItem("requestTypeStatus")=="true"?true:false
    this.allowBookEvent = localStorage.getItem("clubMember")=="true"?true:false


  }
  getRequestist() {
    this.homeService.getRequestByAccount(this.authenService.userId).pipe(catchError(this.homeService.handleError)).subscribe(data => {
      this.requestList = data
      this.totalRequest = data.length
    }, (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  viewRequest(requestType) {
    this.dialog.open(AllRequestDialogComponent, {
      width: "80vw",
      maxHeight: "95vh",
      data: {
        type: requestType,
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
    message = `${request.facility.facilityName} vào ${request.timeUsing} ngày ${moment(request.useDate).format("DD/MM/YYYY")}`
    abp.message.confirm(
      `bạn có muốn xác nhận sử dụng facility ${message}    ?  `,
      "",
      (result: boolean) => {
        if (result) {
          request.requestDetailStatus = "CONFIRMED"
          this.homeService.updateRequestDetailStatus(request.id,request).pipe(catchError(this.homeService.handleError)).subscribe(rs=>{
            abp.notify.success("Confirm successful")
            this.getRequestByDate()
          },
          (err) =>{
            if(err == "401"){
              this.router.navigate(["account/login"])
            }
            else{
              abp.notify.success("Confirm successful")
              this.getRequestByDate()
            }
           

          })
        }
      }
    );
  }
 
  getRequestByDate() {
    let tomorrow  = moment().add(1,'days').format("YYYY-MM-DD");
   
    this.homeService.getRequestDetailByDate(tomorrow).pipe(catchError(this.homeService.handleError)).subscribe(data => {
      this.requestListByDate = data
      this.requestListByDate = this.requestListByDate.filter(item=>item.requestDetailStatus=="Open" && item.request.status =="APPROVED")
    },
    
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    }
    
    )
  }
 
  closeRequest(request){

    let message: string = ""
    message = `${request.facility.facilityName} vào ${request.timeUsing} ngày ${moment(request.useDate).format("DD/MM/YYYY")}`
    abp.message.confirm(
      `bạn có muốn hủy request ${message}    ?  `,
      "",
      (result: boolean) => {
        if (result) {
          request.requestDetailStatus = "CLOSE"
          this.homeService.updateRequestDetailStatus(request.id,request).pipe(catchError(this.homeService.handleError)).subscribe(rs=>{
            abp.notify.success("Closed request")
            this.getRequestByDate()
          },
          (err)=>{
            if(err == "401"){
              this.router.navigate(["account/login"])
            }
            else{
              abp.notify.success("Closed request")
              this.getRequestByDate()
            }
          
          })
        }
      }
    );
  }
  report(){
    this.dialog.open(ReportDialogComponent,{
      width: "800px"
    })
  }




}
