import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { eventDto } from '@app/core/modal/eventDto';
import { EventService } from '@app/core/service/event.service';
import { IcpdpService } from '@app/core/service/icpdp.service';

@Component({
  selector: 'app-list-old-events',
  templateUrl: './list-old-events.component.html',
  styleUrls: ['./list-old-events.component.css']
})
export class ListOldEventsComponent implements OnInit {
  eventList: eventDto[] = [];
  p: number = 1;
  constructor(private eventService: EventService,
    private pdpService: IcpdpService, private router:Router,
    private dialog: MatDialog) { }
    tempEventList: eventDto[] = [];
  ngOnInit(): void {
    this.getAllOldEvents()
  }
  getAllOldEvents() {
    this.pdpService.getAllOldEvents().subscribe((data) => {
      this.eventList = data;
      this.tempEventList = data;
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    });
  }
}
