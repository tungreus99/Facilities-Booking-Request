import { Router } from '@angular/router';
import { clubDto } from './../../../../core/modal/clubDto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { AccountDto } from './../../../../core/modal/accountDto';
import { AccountService } from './../../../../core/service/account.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-club-member',
  templateUrl: './add-club-member.component.html',
  styleUrls: ['./add-club-member.component.css']
})
export class AddClubMemberComponent implements OnInit {
  accountList: AccountDto[] = []
  tempAccountList: AccountDto[] = []
  selectedMember: any[] = []
  pageIndex: number = 1
  searchMember: string = ""
  constructor(private accountService: AccountService,
    private pdpService: IcpdpService, @Inject(MAT_DIALOG_DATA) public data, private router:Router,
    private dialogRef: MatDialogRef<AddClubMemberComponent>) { }

  ngOnInit(): void {
    this.getAllAccount()
  }
  getAllAccount() {
    let listAccountId=[]
    if (this.data?.accounts?.length>0) {
      listAccountId = this.data.accounts.map(item => item.id)
    }
    this.accountService.getAllAccount().subscribe(data => {
      this.accountList = data.filter(item => {
        return !listAccountId.includes(item.id)
      })
      this.tempAccountList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  onselectMember(member, event) {
    if (event.checked == true) {
      this.selectedMember.push(member)
    }
    else {
      this.selectedMember.splice(this.selectedMember.indexOf(member, 1))
    }

  }
  saveClubMember() {
    // let requestBody = this.data
    // requestBody.accounts = this.selectedMember
    // this.pdpService.UpdateClub(requestBody,this.data.id).subscribe(rs=>{
    //   // abp.notify.success("add successful")
    //   // this.dialogRef.close(true)
    // },
    // ()=>{
    //   abp.notify.success("add successful")
    //   this.dialogRef.close(true)
    // })
    this.dialogRef.close(this.selectedMember)
  }
  searchAccount() {
    this.accountList = this.tempAccountList.filter(account => account?.fullName?.toLowerCase().includes(this.searchMember.toLowerCase())
      || account?.email?.toLowerCase().includes(this.searchMember.toLowerCase()))

  }
}
