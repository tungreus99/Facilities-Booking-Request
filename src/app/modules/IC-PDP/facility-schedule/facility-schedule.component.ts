import { Router } from '@angular/router';
import { HomeService } from './../../../core/service/home.service';
import { facitilyDto } from './../../../core/modal/facilityDto';
import { FacilityService } from './../../../core/service/facility.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-facility-schedule',
  templateUrl: './facility-schedule.component.html',
  styleUrls: ['./facility-schedule.component.css']
})
export class FacilityScheduleComponent implements OnInit {
  listSlot = ["slot 1", "slot 2", "slot 3", "slot 4", "slot 5", "slot 6", "slot 7", "slot 8"]
  facilityList:any[]=[]
  currentDate = moment(new Date()).format("YYYY-MM-DD")
  requestDetailList:any[] = []
  constructor(private facilityService: FacilityService, private router:Router, private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllFacility()
    this.getRequestDetailByDate()
  }

  getAllFacility() {
    this.facilityService.getAllFacility().subscribe(data => {
      this.facilityList = data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  getRequestDetailByDate() {
    this.homeService.getRequestDetailByDate(this.currentDate).subscribe(data=>{
      this.requestDetailList =data
    },
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  filRequestToTable(slot,facility){
    let message =""
    if(this.requestDetailList.length>0){
      this.requestDetailList.forEach(item=>{
        if(item.facility.id == facility?.id && item?.timeUsing?.toLowerCase() == slot?.toLowerCase()){
          message=  "Busy"
        }
      })
    }
  return message
  }
}
