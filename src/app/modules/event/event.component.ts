import { Router } from '@angular/router';
import { ImportEventComponent } from './import-event/import-event.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '@app/core/service/event.service';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { eventDto } from "./../../core/modal/eventDto";
import { CreateEditEventComponent } from './create-edit-event/create-edit-event.component';
import { DetailEventListMemberComponent } from './detail-event-list-member/detail-event-list-member.component';
import { ListOldEventsComponent } from './list-old-events/list-old-events.component';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventList: eventDto[] = [];
  p: number = 1;
  searchText:string =""
  constructor(private eventService: EventService, private router:Router,
    private pdpService: IcpdpService,
    private dialog: MatDialog) { }
  tempEventList: eventDto[] = [];

  ngOnInit(): void {
    this.getAllEvent();
  }
  getAllEvent() {
    this.eventService.getAllEvent().pipe(catchError(this.eventService.handleError)).subscribe((data) => {
      this.eventList = data;
      this.tempEventList = data;
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    });
  }

  opendialog(event?: eventDto) {
    let item = {};
    if (event) {
      item = {
        id: event.id,
        eventName: event.eventName,
        fromDate: event.fromDate,
        toDate: event.toDate,
        accounts: event.accounts
      } as eventDto;
    }
    let dialogRef = this.dialog.open(CreateEditEventComponent, {
      width: "800px",
      data: item,
    });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.getAllEvent();
      }
    });

  }

  opendialogOldEvent(event?: eventDto) {
    let item = {};
    if (event) {
      item = {
        id: event.id,
        eventName: event.eventName,
        fromDate: event.fromDate,
        toDate: event.toDate,
        accounts: event.accounts
      } as eventDto;
    }
    let dialogRef = this.dialog.open(ListOldEventsComponent, {
      width: "800px",
      data: item,
    });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.getAllEvent();
      }
    });

  }

  deleteEvent(event: eventDto) {
    abp.message.confirm(
      `Delete Event ${event.eventName} `,
      "",
      (result: boolean) => {
        if (result) {
          this.pdpService.deleteEvent(event.id).subscribe(
            (rs) => {
              this.getAllEvent();
              abp.notify.success(`Deleted ${event.eventName}`);
            },
            () => {
              this.getAllEvent();
              abp.notify.success(`Deleted ${event.eventName}`);
            }
          );
        }
      }
    );
  }
  detail(data) {
    let dialogRef = this.dialog.open(DetailEventListMemberComponent, {
      width: "800px",
      data: {
        id: data.id
      }
    });
  }
  searchEvent(){
    if(this.searchText ==""){
      this.getAllEvent()
    }
    else{
      this.pdpService.getEventByName(this.searchText).subscribe(data=>{
        this.eventList = data;
        this.tempEventList = data;
      }
      ,
      (err)=>{
        abp.notify.error(err.error.text)
        this.eventList = []
      }
      )
      
      
    }
  }
  importFile(){
    let ref = this.dialog.open(ImportEventComponent,{
      width: "700px"
    })
    ref.afterClosed().subscribe(rs=>{
      if(rs){
        this.getAllEvent()
      }
    })
  }
 
  exportFile(){
    this.eventService.exportEvent().subscribe(data=>{
      console.log(data)
    },
    (rs)=>{
      let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "event_list");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }
}
