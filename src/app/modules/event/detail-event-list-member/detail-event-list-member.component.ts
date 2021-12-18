import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { Inject } from '@angular/core';
import { eventDto } from './../../../core/modal/eventDto';
import { EventService } from './../../../core/service/event.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-detail-event-list-member',
  templateUrl: './detail-event-list-member.component.html',
  styleUrls: ['./detail-event-list-member.component.css']
})
export class DetailEventListMemberComponent extends AppComponentBase implements OnInit {

  eventDetail = {} as eventDto
  constructor(private eventService: EventService,
    injector: Injector,
    public dialogRef: MatDialogRef<DetailEventListMemberComponent>, private router:Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.data)
    this.geteventDetail()
  }

  geteventDetail() {
    this.eventService.getEventDetail(this.data.id).pipe(catchError(this.eventService.handleError)).subscribe(data => {
      this.eventDetail = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }

}
