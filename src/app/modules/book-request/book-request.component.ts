import { AuthenticateService } from './../../core/service/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './../../core/service/home.service';
import { IcpdpService } from './../../core/service/icpdp.service';
import { facitilyDto, Buidingdto } from './../../core/modal/facilityDto';
import { FacilityService } from './../../core/service/facility.service';
import { RequestDetailComponent } from './../../home/request-detail/request-detail.component';
import { AppComponentBase } from 'shared/app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-book-request',
  templateUrl: './book-request.component.html',
  styleUrls: ['./book-request.component.css']
})
export class BookRequestComponent extends AppComponentBase implements OnInit {
  listDay = []
  listSlot = [
    { slot: "slot 1", time: "7:30 AM - 9:00 AM" },
    { slot: "slot 2", time: "9:10 AM - 10:40 AM" },
    { slot: "slot 3", time: "10:50 AM - 12:20 AM" },
    { slot: "slot 4", time: "12:50 PM - 2:20 PM" },
    { slot: "slot 5", time: "2:30 PM - 4:00 PM" },
    { slot: "slot 6", time: "4:10 PM - 5:40 PM" },
    { slot: "slot 7", time: "5:50 PM - 7:30 PM" },
    { slot: "slot 8", time: "7:40 PM - 9:00 PM" },


  ]
  isNotforPerson: boolean = false;
  isRoomSelect: boolean = false
  selectedBuildingName: any
  selectedRoom: any
  facilityList: facitilyDto[] = []
  buidingList: Buidingdto[] = []
  roomList: Buidingdto[] = []
  BookingRequestList = []
  requestType: string = ""
  action: string = ""
  bookingListForDropdown = []
  selectedWeek: number = 1
  currentDate: any = new Date().getDay() - 1
  currentTime: any = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })
  allowBooking: boolean = false
  bookByClub: boolean = false
  isViewTable: any = false
  isBookByRoom: boolean = false
  constructor(injector: Injector, private dialog: MatDialog, private facilityService: FacilityService, private route: ActivatedRoute,
    public authenticateService: AuthenticateService, private router: Router,
    private pdpService: IcpdpService, private homeService: HomeService) {
    super(injector)
  }

  ngOnInit(): void {
    this.isViewTable = this.route.snapshot.queryParamMap.get("isViewTable")
    this.requestType = this.route.snapshot.queryParamMap.get("type")
    this.action = this.route.snapshot.queryParamMap.get("action")
    this.getBuilding()
    if (this.requestType == "Semester" || this.requestType == "Event") {
      this.bookByClub = true
    }
    this.currentDate = this.convertDateToDay(this.currentDate)

    // this.currentDate = "Monday"   ----- đổi thứ
    // this.currentTime = "3 PM"     ----- đổi giờ (định dạng 3 AM, 4 PM, 5 PM ...)
    this.disableBooking()
  }

 
  onBuidingChange() {
    this.isBookByRoom = false
    this.isRoomSelect = true
    this.getRoomByBuiding()
    this.selectedWeek = 1
    this.listDay = []
    this.bookingListForDropdown = []
    if (this.bookByClub == true && this.selectedBuildingName.notForPersonal == false) {
      this.getRequestByRoom(this.selectedBuildingName.id)
    }
    this.isNotforPerson = this.selectedBuildingName.notForPersonal
    this.disableBooking()


  }
  onBookByClubChange(e) {
    if (e.checked == true) {
      this.bookByClub = true
    }
    else {
      this.bookByClub = false
    }
    this.getRoomByBuiding()
    this.listDay = []
    this.roomList = []
    this.selectedBuildingName = null
    this.selectedRoom = null
    this.isBookByRoom = false
    this.selectedWeek = 1
    // this.allowBooking = false
    this.disableBooking()
  }
  onRoomChange() {
    this.getRequestByRoom(this.selectedRoom.id)
    this.isNotforPerson = this.selectedRoom.notForPersonal
    this.isBookByRoom = true
  }
  addBooking(slot, day, e) {
    e.disabled = true
    let item = {
      useDate: day.date,
      timeUsing: slot,
      facility: {
        id: this.bookByClub == false ? this.selectedRoom.id : (this.bookByClub == true && !this.selectedRoom?.id) ? this.selectedBuildingName.id : this.selectedRoom.id,
        facilityName: this.bookByClub == false ? this.selectedRoom.facilityName : (this.bookByClub == true && !this.selectedRoom?.facilityName) ? this.selectedBuildingName.facilityName : this.selectedRoom.facilityName
      },
      request_detail_status: "Open",
      element: e
    }
    console.log("test", item)
    let ref = this.dialog.open(RequestDetailComponent, {
      width: "80vw",
      data: {
        type: this.requestType,
        action: this.action,
        request: item,
        bookByClub: this.bookByClub
      },
    })

    ref.afterClosed().subscribe(rs => {
      if (rs == "cancel" || !rs) {
        if (this.bookByClub == false || (this.bookByClub == true && this.selectedRoom?.id)) {
          this.getRequestByRoom(this.selectedRoom.id)
        }
        else {
          this.getRequestByRoom(this.selectedBuildingName.id)
        }
        this.homeService.requestListItem = []
      }

      else if (rs.length > 0 && rs != "success" && rs != "addMore") {
        rs?.forEach(item => item.disabled = false)
      }
      else if (rs == "addMore") {
        return
      }
      else {
        if (this.bookByClub == false || (this.bookByClub == true && this.selectedRoom?.id)) {
          this.getRequestByRoom(this.selectedRoom.id)
        }
        else {
          this.getRequestByRoom(this.selectedBuildingName.id)
        }
      }
    })
  }
  disableBooking() {
    if (this.selectedWeek == 1) {
      if (this.currentDate != 'Monday') {
        if (this.currentDate == 'Tuesday' && (this.currentTime.split(" ")[0] < 5 && this.currentTime.includes("PM") || (this.currentTime.split(" ")[0] <= 12 && this.currentTime.includes("AM")))) {
          this.allowBooking = true
          return
        }
        this.allowBooking = false
        return
      }

    }
    this.allowBooking = true
  }
  getAllFacility() {
    this.facilityService.getAllFacility().subscribe(data => {
      this.facilityList = data
    },
      (err) => {
        if (err == "401") {
          this.router.navigate(["account/login"])
        }
      })
  }
  getBuilding() {
    this.pdpService.getFacilityByBuilding().subscribe(data => {
      this.buidingList = data
    },
      (err) => {
        if (err == "401") {
          this.router.navigate(["account/login"])
        }
      })
  }
  getRoomByBuiding() {
    if (this.selectedBuildingName) {
      this.pdpService.getRoomByBuilding(this.selectedBuildingName.id, this.bookByClub).subscribe(data => {
        this.roomList = data
      },
        (err) => {
          if (err == "401") {
            this.router.navigate(["account/login"])
          }
        })
    }
  }
  testi = 0
  getRequestByRoom(id) {
    this.isLoading = true
    this.homeService.getRequestDetailByFacility(id).subscribe(data => {
      this.BookingRequestList = data,

        this.listDay = this.BookingRequestList[0].map((item, index) => {

          return {
            day: this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay()) + ` (${moment(item.useDate).format("DD/MM/YYYY")})`,
            date: moment(item.useDate).format("YYYY-MM-DD")
          }
        })
      switch (this.selectedWeek) {
        case 1:
          this.listDay = this.BookingRequestList[0].map(item => {
            return {
              day: this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1) + ` (${moment(item.useDate).format("DD/MM/YYYY")})`,
              date: moment(item.useDate).format("YYYY-MM-DD")
            }
          })
          break;
        case 2:
          this.listDay = this.BookingRequestList[1].map(item => {
            return {
              day: this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1) + ` (${moment(item.useDate).format("DD/MM/YYYY")})`,
              date: moment(item.useDate).format("YYYY-MM-DD")
            }
          })
          break;
        case 3:
          this.listDay = this.BookingRequestList[2].map(item => {
            return {
              day: this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1) + ` (${moment(item.useDate).format("DD/MM/YYYY")})`,
              date: moment(item.useDate).format("YYYY-MM-DD")
            }
          })
          break;
        case 4:
          this.listDay = this.BookingRequestList[3].map(item => {
            return {
              day: this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1) + ` (${moment(item.useDate).format("DD/MM/YYYY")})`,
              date: moment(item.useDate).format("YYYY-MM-DD")
            }
          })
          break;
      }
      this.isLoading = false
      this.listDay = this.listDay.filter((item, index) => {
        return item?.day != this.listDay[index - 1]?.day
      })
      if (this.requestType == 'Semester') {
        this.bookingListForDropdown = data[0];
      }
      else {
        this.bookingListForDropdown = data;
      }
    },
      () => {
        this.isLoading = false
        abp.notify.error("Error")
      })



  }
  onWeekchange() {
    if (this.bookByClub == true && !this.selectedRoom?.id) {
      this.getRequestByRoom(this.selectedBuildingName.id)
    }
    else {
      this.getRequestByRoom(this.selectedRoom.id)
    }
    this.disableBooking()
  }
  convertDateToDay(date) {
    switch (date) {
      case 0: {
        return "Monday"
      } case 1: {
        return "Tuesday"
      } case 2: {
        return "Wednesday"
      } case 3: {
        return "Thursday"
      } case 4: {
        return "Friday"
      } case 5: {
        return "Saturday"
      }
      default: return "Sunday"
    }
  }
  fillToTimeTable(slot, day) {
    let status: string = ""
    let author:string =""

    this.BookingRequestList[this.selectedWeek - 1].forEach(item => {
      if (item.id != null && item.timeUsing && item.request.status != "PENDING") {
        if (day.includes(this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1)) && item?.timeUsing?.toLowerCase() == slot?.toLowerCase()) {
          status = "Busy"
          author = item.request.account.email.split("@")[0]
        }
      }
      if (item.id != null && item.timeUsing && item.request.status === "PENDING") {
        if (day.includes(this.convertDateToDay(new Date(moment(item.useDate).format("YYYY-MM-DD")).getDay() - 1)) && item?.timeUsing?.toLowerCase() == slot?.toLowerCase()) {
          status = "Pending"
          author = item.request.account.email.split("@")[0]
        }
      }
    })
    return  { statusName: status, author: author}
  }
  checkSlot(time?, currentDay?: any) {
    if (time) {
      let x = (this.currentTime.split(" ")[0] + ":" + new Date().getMinutes() + " " + this.currentTime.split(" ")[1]).trim()
      let currentSlot = (time?.split("-")[0]).trim()

      if ((currentDay.split(" ")[0] == "Monday" || (currentDay.split(" ")[0] == "Tuesday" && this.currentTime < "5 PM")) && this.selectedWeek == 1 && currentDay.split(" ")[0] == this.currentDate) {

        return this.getTime24h(x) > this.getTime24h(currentSlot)

      }
      return false
    }




    // if (this.currentTime > time.split("-")[1]) {
    //   return true
    // }
    // return false
  }
  getTime24h(time) {
    return moment(time, 'hh:mm A').format('HH:mm')
  }


}
