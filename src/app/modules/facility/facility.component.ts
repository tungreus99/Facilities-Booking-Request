import { Router } from '@angular/router';
import { CreateEditFacilityComponent } from './create-edit-facility/create-edit-facility.component';
import { MatDialog } from '@angular/material/dialog';
import { IcpdpService } from './../../core/service/icpdp.service';
import { facitilyDto } from './../../core/modal/facilityDto';
import { FacilityService } from './../../core/service/facility.service';
import { Component, OnInit } from '@angular/core';
import { ImportFacilityComponent } from './import-facility/import-facility.component';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {
  facilityList: facitilyDto[] = []
  p: number = 1
  constructor(private facilityService: FacilityService, private pdpService: IcpdpService, private router:Router,
     private dialog: MatDialog) { }
  selectedBuiding: number
  buidingList = []
  tempFacilityList: facitilyDto[] = []
  searchText: string = ""
  ngOnInit(): void {
    this.getAllFacility()
    this.getBuilding()
  }

  getAllFacility() {
    this.facilityService.getAllFacility().subscribe(data => {
      this.facilityList = data
      this.tempFacilityList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })

  }
  onBuildingChange() {
    switch (this.selectedBuiding) {
      case 0: this.facilityList = this.tempFacilityList.filter(item => item.building == true)
        break;
      case 1: this.facilityList = this.tempFacilityList.filter(item => item.building == false)
        break
      case -1: this.getAllFacility()
    }

  }
  getBuilding() {
    this.pdpService.getFacilityByBuilding().subscribe(data => {
      this.buidingList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  opendialog(facility?: facitilyDto) {
    let item = {} as facitilyDto
    if (facility) {
      item = {
        available: facility.available,
        id: facility.id,
        building: facility.building,
        facilityName: facility.facilityName,
        capacity: facility.capacity,
        forClubEvent: facility.forClubEvent,
        notForPersonal: facility.notForPersonal,
        buildings: facility.buildings
      } as facitilyDto
    }
    let dialogRef = this.dialog.open(CreateEditFacilityComponent, {
      width: "800px",
      data: item
    })
    dialogRef.afterClosed().subscribe(rs => {
      if (rs) {
        this.getAllFacility()
      }
    })
  }
  deleteFacility(facility: facitilyDto) {
    abp.message.confirm(
      `Delete facility ${facility.facilityName} `,
      "",
      (result: boolean) => {
        if (result) {
          this.pdpService.deleteFacility(facility.id).subscribe(rs => { },

            () => {
              this.getAllFacility()
              abp.notify.success(`Deleted ${facility.facilityName}`)
            }
          )

        }
      }
    );

  }
  importFile() {
    let ref = this.dialog.open(ImportFacilityComponent, {
      width: "700px"
    })
    ref.afterClosed().subscribe(rs=>{
      if(rs){
        this.getAllFacility()
      }
    })
  }
  searchFacility() {
    if (this.searchText == "") {
      this.getAllFacility()
    }
    else {
      this.pdpService.getFacilityByName(this.searchText).subscribe(data => {
        this.facilityList = data;
        this.tempFacilityList = data;
      },
      (err)=>{
        abp.notify.error(err.error.text)
        this.facilityList = []
      })
    }
  }
  exportFile() {
    this.facilityService.exportFacility().subscribe(data => {

    },
      (rs) => {
        let csv = rs.error.text
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([csv], {
          type: "text/csv;charset=ISO-8859-1"
        }));
        downloadLink.setAttribute('download', "facility_list");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
}
