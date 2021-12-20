import { ClubService } from './../../../core/service/club.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-import-club',
  templateUrl: './import-club.component.html',
  styleUrls: ['./import-club.component.css']
})
export class ImportClubComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  public uploadFile= {} as any;
  public isDisable = false;
  public TimesheetProjectId:any;
  constructor(private dialogRef: MatDialogRef<ImportClubComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any, private clubService:ClubService,
  private router: Router, private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    
  }
  selectFile(event) {
    this.selectedFiles = event.target.files.item(0);
  }
  

  importExcel() {
    if (!this.selectedFiles) {
      abp.message.error("Choose a file!")
      return
    }
    
    this.clubService.UpdateFileClub(this.selectedFiles).subscribe(rs=>{
      this.dialogRef.close(true)
      abp.notify.success("import successful")
      
    },
    (err)=>{
      if(err.error.errorInDBNumber>0 || err.error.errorInFileNumber>0 ){
        abp.notify.error(err.error.errorLocation)
      }
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  exportFile(){
    this.clubService.exportClubTemplate().subscribe(data=>{
      console.log(data)
    },
    (rs)=>{
      let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "club_template");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }
}
