import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { IcpdpService } from './../../core/service/icpdp.service';
import { AuthenticateService } from './../../core/service/authenticate.service';
import { RequestDetailComponent } from './../request-detail/request-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestDto } from './../../core/modal/requestDto';
import { AppComponent } from './../../app.component';
import { HomeService } from './../../core/service/home.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-all-request-dialog',
  templateUrl: './all-request-dialog.component.html',
  styleUrls: ['./all-request-dialog.component.css']
})
export class AllRequestDialogComponent  implements OnInit {
  requestList:RequestDto[] =[]
  pendingPageNum:number =1
  constructor(private homeService:HomeService,  public dialog:MatDialog, private authenService:AuthenticateService,
    private pdpService:IcpdpService, private router:Router
    ) { 
  }

  ngOnInit(): void {
    this.getRequestist()

    
  }
  getRequestist(){
    this.homeService.getRequestByAccount(this.authenService.userId).pipe(catchError(this.homeService.handleError)).subscribe(data=>{
      this.requestList =data
    },
    
    (err)=>{
      if(err == "401"){
        this.router.navigate(["account/login"])
      }
    })
  }
  viewRequest(request){
    this.dialog.open(RequestDetailComponent,{
        width: "80vw",
        data:{
          action: "view-detail",
          type: "local",
          request:request,
          detail:true
        }
    })
  }

  deleteRequest(request){
    // abp.message.confirm(
    //   `Delete request ${request.dateCreated} `,
    //   "",
    //   (result: boolean) => {
    //     if (result) {
    //       this.pdpService.deleteRequest(request).subscribe(rs => { },

    //         () => {
    //           this.getRequestist()
    //           abp.notify.success(`Deleted ${request.dateCreated}}`)
    //         }
    //       )

    //     }
    //   }
    // );
    this.pdpService.deleteRequest(request.id).pipe(catchError(this.pdpService.handleError)).subscribe(rs => { },
      (err) => {
        if(err == "401"){
          this.router.navigate(["account/login"])
        }
        else{
          this.getRequestist()
        }
  
        // abp.notify.success(`Deleted ${request.dateCreated}}`)
      }
    )
  }
 
}
