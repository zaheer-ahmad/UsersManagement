import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import LoginModel from '../../models/login.model';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit,OnDestroy {
  formSubmitted:boolean=false;
  formError:string="";
  private subscription: Subscription;
  constructor(private authService:AuthService,private router:Router,private languageService:LanguageService){

  }
  ngOnInit(): void {
    this.languageService.setInitialAppLanguage();
    if(this.authService.isLoggedIn())
      {
        this.router.navigate(['userlist']);
      }
  }
  onSubmitLogin(loginForm:NgForm)
  {
      this.formSubmitted = true;
      if(loginForm.valid)
      {
          let loginObj = new LoginModel(loginForm.value.username,loginForm.value.password);
          this.subscription = this.authService.login(loginObj).subscribe(
            () => { this.router.navigate(['userlist'])},
            (err) => {console.log(err);this.formError=err.error;}
          );
      }
      console.log(loginForm);
  }
  ngOnDestroy(): void {
    if(this.subscription)
      {
        this.subscription.unsubscribe();
      }
  }
}
