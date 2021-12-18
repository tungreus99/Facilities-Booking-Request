import { AddClubMemberComponent } from './../detail-club-list-member/add-club-member/add-club-member.component';
import { Component, Inject, Injector, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { clubDto } from "@app/core/modal/clubDto";
import { IcpdpService } from "@app/core/service/icpdp.service";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-create-edit-club",
  templateUrl: "./create-edit-club.component.html",
  styleUrls: ["./create-edit-club.component.css"],
})
export class CreateEditClubComponent
  extends AppComponentBase
  implements OnInit {
  title;
  club = {} as clubDto;
  memberList: any[] = []
  memberToEdit: any[] = []
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<CreateEditClubComponent>, private dialog: MatDialog,
    private icpdpService: IcpdpService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.club = this.data;
      this.title = this.data.clubName
      if (this.data?.accounts?.length > 0) {
        this.memberList = this.club.accounts
      }
    }
  }
  saveAndClose() {
    if (!this.data.id) {
      this.icpdpService.AddClub(this.club).subscribe(
        (rs) => { },
        (rs2) => {
          if(rs2.error?.text?.includes("existed")){
            abp.notify.error(rs2.error.text)
          }
          else{
            abp.notify.success(`Added new club ${this.club.clubName}`);
            this.dialogRef.close(this.club);
          }
        }
      );
    } else {
      this.club.accounts = this.memberToEdit
      this.icpdpService.UpdateClub(this.club, this.data.id).subscribe(
        (rs) => { },
        (rs2) => {
          if(rs2.error?.text?.includes("existed")){
            abp.notify.error(rs2.error.text)
          }
          else{
            abp.notify.success(`updated club ${this.club.clubName}`);
            this.dialogRef.close(this.club);
          }
        }
      );
    }
  }
  addClubMembet() {
    let ref = this.dialog.open(AddClubMemberComponent, {
      width: "80vw",
      data: this.data,
      height: "80vh"
    })
    ref.afterClosed().subscribe(rs => {
      if (rs) {
        let listToPush = rs.filter(account => !this.memberList.includes(account.id))
        this.memberList.push(...listToPush)
        this.club.accounts = this.memberList
        this.memberToEdit = listToPush
      }
    })
  }
  removeMember(member) {
    if (this.data.id) {
      this.icpdpService.deleteClubMember(member.id, this.club.id).subscribe(rs => { }, () => {
        abp.notify.success(`remove member ${member.fullName} from club ${this.club.clubName}`)
        this.memberList.splice(this.memberList.indexOf(member), 1)

      })
    }
    else {
      this.memberList.splice(this.memberList.indexOf(member), 1)
    }
  }
}
