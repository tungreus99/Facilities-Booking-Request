import { FacilityService } from './../../../core/service/facility.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-import-facility',
  templateUrl: './import-facility.component.html',
  styleUrls: ['./import-facility.component.css']
})
export class ImportFacilityComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  public uploadFile= {} as any;
  public isDisable = false;
  public TimesheetProjectId:any;
  constructor(private dialogRef: MatDialogRef<ImportFacilityComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any, private facilityService:FacilityService,
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
    console.log(this.selectedFiles)
    this.facilityService.UpdateFileFacility(this.selectedFiles,1).subscribe(rs=>{
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
    this.facilityService.exportFacilityTemplate().subscribe(data=>{
    },
    (rs)=>{
      let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "facility_template");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }
}
