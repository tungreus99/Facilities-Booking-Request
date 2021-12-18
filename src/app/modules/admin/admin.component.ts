import { FacilityListComponent } from './facility-list/facility-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { ClubListComponent } from './club-list/club-list.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDto } from '@app/core/modal/adminDto';
import { AccountService } from '@app/core/service/account.service';
import { AdminService } from '@app/core/service/admin.service';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { CreatEditAdminComponent } from './creat-edit-admin/creat-edit-admin.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminList: AdminDto[] = []
  tempAdminList: AdminDto[] = []
  pageIndex: number = 1
  p=1
  constructor(private accountService: AccountService, private adminService:AdminService,
    private pdpService: IcpdpService,
    private dialog: MatDialog, private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCount()
  }
  getAllCount() {
    this.accountService.getAllAccount().subscribe((data) => {
      this.adminList = data;
      this.tempAdminList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  
  opendialog(admin?: AdminDto) {
    let item = {};
    if (admin) {
      item = {
        
        fullName: admin.fullName,
        email: admin.email
      } as AdminDto;
    }
    let dialogRef = this.dialog.open(CreatEditAdminComponent, {
      width: "800px",
      data: item,
    });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.getAllCount();
      }
    });
   
  }
  deleteAccount(account){
    abp.message.confirm(
      `delete account ${account.fullName}?  `,
      "",
      (result: boolean) => {
        if (result) {
        
          this.adminService.deleteAccount(account.id).pipe(catchError(this.adminService.handleError)).subscribe(rs=>{
            abp.notify.success(`Deleted account ${account.fullName}`)
            this.getAllCount()
          },
          (err) =>{
            if(err == "401"){
              this.router.navigate(["account/login"])
            }
            else{
              abp.notify.success(`Deleted account ${account.fullName}`)
              this.getAllCount()
            }
           

          })
        }
      }
    );
  }
  viewClub(){
    this.dialog.open(ClubListComponent,{
      width: "900px"
    })
  }
  viewEvent(){
    this.dialog.open(EventListComponent,{
      width: "900px"
    })

  }
  viewFacility(){
    this.dialog.open(FacilityListComponent,{
      width: "900px"
    })

  }
}
