import { AddEventMemberComponent } from './add-event-member/add-event-member.component';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { eventDto } from '@app/core/modal/eventDto';
import { IcpdpService } from '@app/core/service/icpdp.service';

import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.css']
})
export class CreateEditEventComponent extends AppComponentBase implements OnInit {
  title;
  event = {} as eventDto;
  memberList = []
  memberToEdit=[]
  todayDate: any = moment(new Date()).format("YYYY-MM-DD")
  constructor(injector: Injector, private pdpService: IcpdpService,
    public dialogRef: MatDialogRef<CreateEditEventComponent>,
    private icpdpService: IcpdpService,
    @Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialog) { super(injector); }

  ngOnInit(): void {
    if (this.data.id) {
      this.event = this.data;
      this.memberList = this.event.accounts
      console.log(this.event)
    }
  }
  saveAndClose() {
    const startDate = this.event.fromDate;
    const endDate = this.event.toDate;
    const diffInDays = moment(endDate).diff(moment(startDate), 'days');

    this.event.fromDate = moment(this.event.fromDate).format("YYYY-MM-DD")
    this.event.toDate = moment(this.event.toDate).format("YYYY-MM-DD")
    
      if( this.event.toDate < this.event.fromDate ){
        abp.notify.error("start date must greater than end date")
        return
      }
   
   

    if (diffInDays > 14) {
      abp.notify.error("Event được diễn ra tối đa 2 tuần")
    }
    else {
      if (!this.data.id) {
        this.icpdpService.AddEvent(this.event).subscribe(
          (rs) => { },
          (rs2) => {
            if(rs2.error?.text?.includes("existed")){
              abp.notify.error(rs2.error.text)
            }
            else{
              abp.notify.success(`Added new Event ${this.event.eventName}`);
              this.dialogRef.close(this.event);
            }
        
          }
        );
      } else {
        this.event.accounts = this.memberToEdit
        this.icpdpService.UpdateEvent(this.event, this.data.id).subscribe(
          (rs) => { },
          (rs2) => {
            if(rs2.error?.text?.includes("existed")){
              abp.notify.error(rs2.error.text)
            }
            else{
              abp.notify.success(`updated event ${this.event.eventName}`);
              this.dialogRef.close(this.event);
            }
          }
        );
      }
    }
  }

  addEventMember() {
    let ref = this.dialog.open(AddEventMemberComponent, {
      width: "80vw",
      data: this.data,
      height: "80vh"
    })
    ref.afterClosed().subscribe(rs => {
      if (rs) {
        // console.log(rs)
        let listToPush = rs.filter(account => !this.memberList?.includes(account.id))
        this.memberList.push(...listToPush)
        this.event.accounts = this.memberList
        // this.memberList = rs
        this.memberToEdit = rs

      }
    })
  }
  removeMember(member) {
    if (this.data.id) {
      this.icpdpService.deleteEventMember(member.id, this.event.id).subscribe(rs => { }, () => {
        abp.notify.success(`remove member ${member.fullName} from event ${this.event.eventName}`)
        this.memberList.splice(this.memberList.indexOf(member), 1)

      })
    }
    else {
      this.memberList.splice(this.memberList.indexOf(member), 1)
    }
  }

}
