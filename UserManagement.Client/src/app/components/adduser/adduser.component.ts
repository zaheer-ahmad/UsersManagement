import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import UserModel from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [FormsModule,CommonModule,TranslateModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit,OnDestroy {
  formSubmitted:boolean=false;
  private subscription: Subscription;
  
  constructor(private authService:AuthService,private userService:UserService,private router:Router,
    private languageService:LanguageService){}

  ngOnInit(): void {
    this.languageService.setInitialAppLanguage();
  }
  onSubmit(addUserForm:NgForm){
    this.formSubmitted = true;
    if(addUserForm.valid)
      {
          let actionUser:string = this.authService.getUserName();
          let addUserObj = new UserModel(addUserForm.value.name,addUserForm.value.username,addUserForm.value.email,addUserForm.value.role,actionUser);
          this.subscription = this.userService.addUser(addUserObj).subscribe(
            () => { this.router.navigate(['userlist'])},
            (err) => {console.log(err);}
          );
      }

    console.log(addUserForm);
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
