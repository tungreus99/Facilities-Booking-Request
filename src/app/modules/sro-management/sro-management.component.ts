import { FacilityScheduleComponent } from './../IC-PDP/facility-schedule/facility-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestDto } from './../../core/modal/requestLogDto';
import { RequestLogService } from './../../core/service/requestLog.service';
import { RequestLogDetailComponent } from './../request-log/request-log-detail/request-log-detail.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sro-management',
  templateUrl: './sro-management.component.html',
  styleUrls: ['./sro-management.component.css']
})
export class SROManagementComponent implements OnInit {

  requestLogList: RequestDto[] = [];
  p: number = 1;
  filterRequestType: any = ""
  searchText: string = ""
  isLoading: boolean = false
  constructor(private requestLogService: RequestLogService, private router: Router, private dialog: MatDialog
  ) { }
  tempRequestLogList: RequestDto[] = [];
  ngOnInit(): void {
    this.getAllRequestLog()
  }

  getAllRequestLog() {
    // this.isLoading = true
    this.requestLogService.getAllListRqLog().subscribe((data) => {
      this.requestLogList = data;
      this.tempRequestLogList = data;
      this.isLoading = false
    },
      (err) => {
        if (err == "401") {
          this.isLoading = false

          this.router.navigate(["account/login"])
        }
      })
  }
  
  viewDetail(request) {
    this.dialog.open(RequestLogDetailComponent, {
      width: "800px",
      data: {
        id: request.id
      }
    })
  }

  deleteRequestLog(requestLog: RequestDto) {
    abp.message.confirm(
      `request log`,
      "",
      (result: boolean) => {
        if (result) {
          this.requestLogService.deleteRequestLog(requestLog.id).subscribe(
            (rs) => {
              this.getAllRequestLog();
              abp.notify.success(`Deleted`);
            },
            (err) => {
              if(err == "401"){
                this.router.navigate(["account/login"])
              }
              else{
                this.getAllRequestLog();
                abp.notify.success(`Deleted`);
              }
              
            }
          );
        }
      }
    );
  }

  onChange() {
    if (this.filterRequestType == '') {
      this.requestLogList = this.tempRequestLogList.filter(item => item.account.email.toLowerCase().includes(this.searchText.toLowerCase()))
    }
    else {
      this.requestLogList = this.tempRequestLogList.filter(item => item.request.typeRequest == this.filterRequestType
        && (item.account.email.toLowerCase().includes(this.searchText.toLowerCase())))

    }
    this.p = 1
  }
  viewSchedule() {
    this.dialog.open(FacilityScheduleComponent, {
      width: "80vw"
    }
    )
  }

}
