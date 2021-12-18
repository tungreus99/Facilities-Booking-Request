import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { clubDto } from '@app/core/modal/clubDto';
import { AdminService } from '@app/core/service/admin.service';
import { ClubService } from '@app/core/service/club.service';
import { IcpdpService } from '@app/core/service/icpdp.service';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubList: clubDto[] = [];
  p: number = 1;
  tempClubList: clubDto[] = [];
  constructor(private clubService: ClubService,
    private pdpService: IcpdpService,private router:Router,private adminService: AdminService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllClub()
  }
  getAllClub() {
    this.adminService.getAllClubs().subscribe((data) => {
      this.clubList = data;
      this.tempClubList = data;

    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    });
  }

  deleteClub(club: clubDto) {
    abp.message.confirm(
      `Delete club ${club.clubName} `,
      "",
      (result: boolean) => {
        if (result) {
          this.adminService.adminDeleteClub(club.id).subscribe(
            (rs) => {
              this.getAllClub();
              abp.notify.success(`Deleted ${club.clubName}`);
            },
            (err) => {
              if(err == "401"){
                this.router.navigate(["account/login"])
              }
              else{
                this.getAllClub();
                abp.notify.success(`Deleted ${club.clubName}`);
              }
              
            }
          );
        }
      }
    );
  }
}
