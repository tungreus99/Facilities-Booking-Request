import { RequestLogService } from './../../../core/service/requestLog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-log-detail',
  templateUrl: './request-log-detail.component.html',
  styleUrls: ['./request-log-detail.component.css']
})
export class RequestLogDetailComponent implements OnInit {
  requestDetail
  p=1
  isLoading = false
  constructor(@Inject(MAT_DIALOG_DATA) public data, private requestLogService: RequestLogService) { }

  ngOnInit(): void {
    this.getDetail()
  }
  getDetail() {
    this.isLoading = true
    this.requestLogService.getAllListRqLog().subscribe(rs => {
      this.requestDetail = rs.filter(item=>item.id == this.data.id)[0].request.requestDetails
      this.isLoading = false

    })
  }

}
