import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { facitilyDto } from '@app/core/modal/facilityDto';
import { AdminService } from '@app/core/service/admin.service';
import { FacilityService } from '@app/core/service/facility.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facilityList: facitilyDto[] = []
  p: number = 1
  constructor(private facilityService: FacilityService, private router:Router,private adminService: AdminService,
    private dialog: MatDialog) { }
    tempFacilityList: facitilyDto[] = []
  ngOnInit(): void {
    this.getAllFacility()
  }
  getAllFacility() {
    this.adminService.getAllFacility().subscribe(data => {
      this.facilityList = data
      this.tempFacilityList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
}
