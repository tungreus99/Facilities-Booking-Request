import { MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventService } from '@app/core/service/event.service';

@Component({
  selector: 'app-import-event',
  templateUrl: './import-event.component.html',
  styleUrls: ['./import-event.component.css']
})
export class ImportEventComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  public uploadFile= {} as any;
  public isDisable = false;
  public TimesheetProjectId:any;
  constructor(private dialogRef: MatDialogRef<ImportEventComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any, private eventService:EventService,
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
    this.eventService.UpdateFileEvent(this.selectedFiles).subscribe(rs=>{
      // console.log("testtt3333")

     
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
    this.eventService.exportEventTemplate().subscribe(data=>{
    },
    (rs)=>{
      let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "event_template");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    )
  }

}
