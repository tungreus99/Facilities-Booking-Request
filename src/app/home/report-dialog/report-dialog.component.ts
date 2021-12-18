import { catchError } from 'rxjs/operators';
import { HomeService } from './../../core/service/home.service';
import { AuthenticateService } from '@app/core/service/authenticate.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {
  report = {} as reportDto
  constructor(public ref: MatDialogRef<ReportDialogComponent>, private authenService:AuthenticateService, private homeService:HomeService) { }

  ngOnInit(): void {
    this.report.email = localStorage.getItem("userName")
  }

  submitReport(){
    this.homeService.report(this.report).pipe(catchError(this.homeService.handleError)).subscribe(data=>{
      abp.notify.success("Send report successful")
      this.ref.close()
    })
  }
}
export class reportDto{
  subject:string;
  message:string;
  email:string
}
