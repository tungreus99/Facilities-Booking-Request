import { Router } from '@angular/router';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountDto } from '@app/core/modal/accountDto';
import { AdminService } from '@app/core/service/admin.service';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
  selector: 'app-creat-edit-admin',
  templateUrl: './creat-edit-admin.component.html',
  styleUrls: ['./creat-edit-admin.component.css']
})
export class CreatEditAdminComponent extends AppComponentBase  implements OnInit {
  title;
  account = {role:"ROLE_SRO"} as AccountDto;
  roleList = [{name: "SRO", value : "ROLE_SRO"},{name:"IC-PDP",value:"ROLE_ICPDP"},{name: "ADMIN" ,value: "ROLE_ADMIN"}, {name: "TRAINING DEPARTMENT" ,value: "ROLE_TD"} ]
  constructor(injector: Injector,
    public dialogRef: MatDialogRef<CreatEditAdminComponent>, private dialog: MatDialog, private router:Router,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data) {
      super(injector);
     }

  ngOnInit(): void {
    if(this.data.id){
      this.account = this.data
      console.log("tesesa", this.account)
    }
  
  }
  onSelect(e){
    this.account.role = e.value
  }
  saveAndClose() {
    this.account.email = this.account.email.trim()
    if (!this.data.id) {
      this.adminService.addAccount(this.account).subscribe(
        (rs) => {
          abp.notify.success(`Added new Account ${this.account.fullName}`);
          this.dialogRef.close(this.account);
        },
        (err) => {
          if(err == "401"){
            this.router.navigate(["account/login"])
          }
          else{
            abp.notify.success(`Added new Account ${this.account.fullName}`);
            this.dialogRef.close(this.account);
          }
         
        }
      );
    } 
    else{

      this.adminService.updateAccount(this.account,this.account.id).subscribe(
        (rs) => {
          abp.notify.success(`updated Account ${this.account.fullName}`);
          this.dialogRef.close(this.account);
        },
        (err) => {
          
          if(err == "401"){
            this.router.navigate(["account/login"])
          }
          else{
            abp.notify.success(`updated Account ${this.account.fullName}`);
            this.dialogRef.close(this.account);
          }
         
         
        }
      );

    }
  }
}

