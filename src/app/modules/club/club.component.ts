import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { clubDto } from "./../../core/modal/clubDto";
import { ClubService } from "./../../core/service/club.service";
import { CreateEditClubComponent } from './create-edit-club/create-edit-club.component';
import { DetailClubListMemberComponent } from './detail-club-list-member/detail-club-list-member.component';
import { ImportClubComponent } from './import-club/import-club.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  clubList: clubDto[] = [];
  p: number = 1;
  searchText:string=""
  constructor(private clubService: ClubService,
    private pdpService: IcpdpService, private router:Router,
    private dialog: MatDialog) { }
    tempClubList: clubDto[] = [];
  ngOnInit(): void {
    this.getAllClub();
  }


  getAllClub() {
    this.clubService.getAllClubs().subscribe((data) => {
      this.clubList = data;
      this.tempClubList = data;

    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    });
  }

  opendialog(club?: clubDto) {
    let item = {};
    if (club) {
      item = {
        id: club.id,
        clubName: club.clubName,
        accounts: club.accounts
      } as clubDto;
    }
    let dialogRef = this.dialog.open(CreateEditClubComponent, {
      width: "800px",
      data: item,
    });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.getAllClub();
      }
    });
  }

  deleteClub(club: clubDto) {
    abp.message.confirm(
      `Delete club ${club.clubName} `,
      "",
      (result: boolean) => {
        if (result) {
          this.pdpService.deleteClub(club.id).subscribe(
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




  detail(club:clubDto){
    let dialogRef = this.dialog.open(DetailClubListMemberComponent, {
      width: "60vw",
      data:club

    });
  }
  searchClub(){
    if(this.searchText ==""){
      this.getAllClub()
    }
    else{
      this.pdpService.getClubByName(this.searchText).subscribe(data=>{
        this.clubList = data;
        this.tempClubList = data;
      },
      (err)=>{
        if(err == "401"){
          this.router.navigate(["account/login"])
        }
        else{
          abp.notify.error(err.error.text)
          this.clubList = []
        }
       
      })
    }
  }

 



  importFile(){
   let ref = this.dialog.open(ImportClubComponent,{
      width: "700px"
    })
    ref.afterClosed().subscribe(rs=>{
      if(rs){
        this.getAllClub()
      }
    })
  }
 
  exportFile(){
    this.clubService.exportClub().subscribe(data=>{
      console.log(data)
    },
    (rs)=>{
      console.log(rs);
      let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "club_list");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }
}
