import { Router } from '@angular/router';
import { AddClubMemberComponent } from './add-club-member/add-club-member.component';
import { clubDto } from './../../../core/modal/clubDto';
import { AppComponentBase } from '@shared/app-component-base';
import { DetailEventListMemberComponent } from './../../event/detail-event-list-member/detail-event-list-member.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClubService } from './../../../core/service/club.service';
import { Component, OnInit, Inject, Injector } from '@angular/core';

@Component({
  selector: 'app-detail-club-list-member',
  templateUrl: './detail-club-list-member.component.html',
  styleUrls: ['./detail-club-list-member.component.css']
})
export class DetailClubListMemberComponent extends AppComponentBase implements OnInit {
  clubDetail = {} as clubDto
  constructor(private clubService:ClubService,
    injector: Injector,
    public dialogRef: MatDialogRef<DetailEventListMemberComponent>,
    private dialog:MatDialog, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(injector);
  }

  ngOnInit(): void {
    this.getClubDetail()
  }
 
  getClubDetail(){
    this.clubService.getClubDetail(this.data.id).subscribe(data=>{
      this.clubDetail =  data
    } ,
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  addClubMembet(){
   let ref = this.dialog.open(AddClubMemberComponent, {
      width: "60vw",
      data: this.data
    })
    ref.afterClosed().subscribe(rs=>{
      if(rs){
        this.getClubDetail()
      }
    })
  }
}
