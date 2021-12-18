import { Router } from '@angular/router';
import { FacilityService } from './../../../core/service/facility.service';
import { IcpdpService } from './../../../core/service/icpdp.service';
import { facitilyDto, Buidingdto } from './../../../core/modal/facilityDto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, Injector, Inject } from '@angular/core';

@Component({
  selector: 'app-create-edit-facility',
  templateUrl: './create-edit-facility.component.html',
  styleUrls: ['./create-edit-facility.component.css']
})
export class CreateEditFacilityComponent extends AppComponentBase implements OnInit {
  title
  facility = {} as facitilyDto
  listBuilding: Buidingdto[] = []
  selectedBuilding = {} as Buidingdto
  isSelectBuilding: boolean = false;
  building: boolean = false
  constructor(injector: Injector, public dialogRef: MatDialogRef<CreateEditFacilityComponent>, private icpdpService: IcpdpService, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(injector)
  }

  ngOnInit(): void {
    this.facility.building= false
    this.facility.available = false
    console.log(this.facility)
    if (this.data.id) {
      this.facility = this.data
    
    }
    this.getAllBuilding()
   console.log("test2",this.facility)
  }

  saveAndClose() {
    this.facility.buildings = this.selectedBuilding
    if(this.facility.capacity<500){
      if (!this.facility?.buildings?.id) {
        delete this.facility["buildings"]
      }
      else {
        this.facility.buildings = this.selectedBuilding
      }
      if (!this.data.id) {
        this.icpdpService.AddFacility(this.facility).subscribe(rs => {
        }, (rs2) => {
          if(rs2.error?.text?.includes("existed")){
            abp.notify.error(rs2.error.text)
          }
          else{
            abp.notify.success(`Added new facility ${this.facility.facilityName}`)
            this.dialogRef.close(this.facility)
          }
        })
      }
      else {
        this.icpdpService.UpdateFacility(this.facility, this.data.id).subscribe(rs => {
        }, (rs2) => {
          if(rs2.error?.text?.includes("existed")){
            abp.notify.error(rs2.error.text)
          }
          else{
            abp.notify.success(`updated facility ${this.facility.facilityName}`)
            this.dialogRef.close(this.facility)
          }
         
        })
      }
    }
    else{
      abp.notify.error("Capacity must less than 500")
    }
  }
  getAllBuilding() {
    this.icpdpService.getFacilityByBuilding().subscribe(data => {
      this.listBuilding = data
       this.selectedBuilding = this.listBuilding?.filter(item=>item.facilityName == this.data?.buildings?.facilityName)[0]
       console.log("sss",this.selectedBuilding)
    
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
}
