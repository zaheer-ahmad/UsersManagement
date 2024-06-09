import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [FormsModule,CommonModule,TranslateModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit,OnDestroy {
  formSubmitted:boolean=false;
  id: string | null = null;
  user:any =null;
  email:string = "";
  username:string = "";
  name:string = ""
  role:string = "";
  private subscription: Subscription;
  private subimtSubscription: Subscription;
  
  constructor(private route:ActivatedRoute,private userService:UserService,
    private authService:AuthService,private router:Router,private languageService:LanguageService){}
  ngOnInit(){
    this.languageService.setInitialAppLanguage();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getUserForEdit(this.id);
    });
  }
    getUserForEdit(id:string|null){
      this.subscription = this.userService.getUser(id).subscribe(
        (res) => 
        { 
          this.user = res;console.log(res)
          this.username = res.username;
          this.email = res.email;
          this.role = res.role;
          this.name = res.name;
        },
        (err) => {console.log(err);}
      );
    }
    onSubmit(ngForm:NgForm)
    {
      this.formSubmitted = true;
      let actionUser:string = this.authService.getUserName();
      let eidtUserObj = new UserModel(this.name,this.username,this.email,this.role,actionUser);
      this.subimtSubscription = this.userService.updateUser(eidtUserObj).subscribe(
        (res) =>{this.router.navigate(['userlist'])},
        (error) => {console.log(error)}
      )
    }
    ngOnDestroy(): void {
      if(this.subscription)
      {
        this.subscription.unsubscribe();
      }
      if(this.subimtSubscription)
      {
        this.subimtSubscription.unsubscribe();
      }
    }
}
