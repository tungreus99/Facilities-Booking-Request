import { AppComponentBase } from '@shared/app-component-base';
// import { UserService } from './../../../app/service/api/user.service';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent extends AppComponentBase implements OnInit {
@Input() userData:any
public user:any
  constructor(injector:Injector) {
     super(injector)
   }
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.user = this.userData
  }
  public getProjectTypefromEnum(projectType: number, enumObject: any) {
    for (const key in enumObject) {
      if (enumObject[key] == projectType) {
        return key;
      }
    }
  }
  getAvatar(member) {
    if (member.avatarPath) {
      return AppConsts.remoteServiceBaseUrl + member.avatarPath;
    } 
    // if (member.avatarPath === '' && member.sex === 1) {
    //   return 'assets/images/women.png';
    // } if (member.avatarPath === '' && member.sex === 0) {
    //   return 'assets/images/men.png';
    // }
    return '/assets/img/user.png';
  }

}
