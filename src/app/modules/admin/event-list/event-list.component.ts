import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { eventDto } from '@app/core/modal/eventDto';
import { AdminService } from '@app/core/service/admin.service';
import { EventService } from '@app/core/service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList: eventDto[] = [];
  p: number = 1;
  constructor(private eventService: EventService, private router:Router,private adminService: AdminService,
    private dialog: MatDialog) { }
    tempEventList: eventDto[] = [];

  ngOnInit(): void {
    this.getAllEvent()
  }

  getAllEvent() {
    this.adminService.getAllEvent().subscribe((data) => {
      this.eventList = data;
      this.tempEventList = data;

    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    });
  }

  deleteEvent(event: eventDto) {
    abp.message.confirm(
      `Delete Event ${event.eventName} `,
      "",
      (result: boolean) => {
        if (result) {
          this.adminService.adminDeleteEvent(event.id).subscribe(
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

}
