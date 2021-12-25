import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '@app/core/service/admin.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  accountDetail = {} as any
  constructor(public dialogRef: MatDialogRef<AccountInfoComponent>, private dialog: MatDialog, private router: Router,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.viewDetail()
  }
  viewDetail() {
    this.adminService.accountDetail(this.data).subscribe(data => {
      this.accountDetail = data
      console.log(this.accountDetail)
    })
  }

}
