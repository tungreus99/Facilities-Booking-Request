import { RequestDto } from './../../core/modal/requestDto';
import { IcpdpService } from './../../core/service/icpdp.service';
import { AuthenticateService } from './../../core/service/authenticate.service';
import { Router } from '@angular/router';
import { HomeService } from './../../core/service/home.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  requestType: string = ""
  currentDate = new Date()
  requestTypeLsit = ["Week", "Semester", "Event", "local"]
  selectedType
  action: string = ""
  requestDetailList = []
  request: any = {}
  tempRequest
  isAdd: boolean = false
  isSubmited: boolean = false
  listRemove = []
  requestBody = {} as RequestDto
  isViewDetail: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data, public homeService: HomeService, private authenService: AuthenticateService,
    private pdpService: IcpdpService,
    public router: Router, private dialogRef: MatDialogRef<RequestDetailComponent>) {
    this.selectedType = data.type
    this.action = data.action
    this.request.bookedByClub = authenService.clubMember
    if (data.detail) {
      this.isViewDetail = data.detail

    }
  }
  ngOnInit(): void {
    this.getRequestDetail()
    if (this.action == "create") {
      this.homeService.requestListItem.push(this.data.request)
      this.tempRequest = this.data.request
      this.requestDetailList = this.homeService.requestListItem
      this.request.bookedByClub = this.data.bookByClub
    }
  }
  // 
  getRequestDetail() {
    if (this.action == 'view-detail' || this.action == 'pdp-view') {
      this.homeService.getRequestDetail(this.data.request.id).subscribe(data => {
        this.requestDetailList = data.requestDetails
        this.selectedType = data.typeRequest
        this.request.note = data.note
        this.requestBody = data
      }
      ,
    
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
    }
  }

  approveRequest() {
    this.requestBody.status = "APPROVED"
    this.pdpService.updateRequest(this.requestBody.id, this.requestBody).subscribe(rs => { }, (err) => {
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
      else{
        abp.notify.success("approved request")
        this.dialogRef.close(this.requestBody)
      }
    
    })

  }
 
  rejectRequest() {
    this.requestBody.status = "REJECT"
    this.pdpService.updateRequest(this.requestBody.id, this.requestBody).subscribe(rs => { }, (err) => {
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
      else{
        abp.notify.success("rejected request")
        this.dialogRef.close(this.requestBody)
      }
 
    })

  }


  addRequest() {
    this.isAdd = true
    if (this.listRemove.length > 0) {
      this.dialogRef.close(this.listRemove)

    } else {
      this.dialogRef.close("addMore")
    }
  }
  saveRequest() {
    this.requestDetailList.forEach(item => {
      delete item["element"]
    })
    let requestBody = {
      dateCreated: moment(new Date()).format("YYYY-MM-DD"),
      typeRequest: this.selectedType,
      note: this.request.note,
      bookedByClub: this.request.bookedByClub,
      status: "PENDING",
      account: {
        id: this.authenService.userId
      },
      requestDetails: this.requestDetailList
    }
    this.homeService.addRequest(requestBody).subscribe(rs => {
      this.isSubmited = true
      abp.notify.success("add request successfull")
     
      this.dialogRef.close("success")
      this.homeService.requestListItem = []
    },
      (err) => {
        if(err == "401"){
          this.router.navigate(["account/login"])
        }
        else{
          this.isSubmited = true
          abp.notify.success("add request successfull")
          this.dialogRef.close("success")
          this.homeService.requestListItem = []

        }
      
      })
  }

 



  remove(request) {
    this.requestDetailList.splice(this.requestDetailList.indexOf(request), 1)
    this.homeService.requestListItem = this.requestDetailList
    this.listRemove.push(request.element)
  }
  ngOnDestroy(): void {
    if (!this.isSubmited && !this.isAdd) {
      this.homeService.requestListItem.splice(this.homeService.requestListItem.indexOf(this.tempRequest), 1)
    }
  }
  CancelAdd() {
    this.dialogRef.close("cancel")
  }

}
