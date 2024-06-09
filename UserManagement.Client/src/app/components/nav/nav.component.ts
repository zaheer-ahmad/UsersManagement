import { Component,DoCheck,Inject } from '@angular/core';
import { SharedService } from '../../shared.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports :[CommonModule,RouterLink,TranslateModule]
})
export class NavComponent implements DoCheck {
   isUserLoggedIn:boolean=true;
   lang:string='en';
   constructor(private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,private authService:AuthService,
    private router:Router,private languageService:LanguageService) {}
  
  ngOnInit(){
    this.languageService.setInitialAppLanguage();
  }
  ngDoCheck(){
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }
  changeLangage(lang: string) {
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    htmlTag.lang = lang;
    // this.translate.setDefaultLang(lang);
    // this.translate.use(lang);
    // this.sharedService.changeLang(lang);
    this.languageService.setLanguage(lang);
    this.changeCssFile(lang);
    
    console.log(lang);
  }

  changeCssFile(lang: string) {

    let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    if(lang === "en")
    {
      if(existingLink)
      {
        existingLink.remove();
      }
    }
    else
    {
      let bundleName = "arabicStyle.css";
      let newLink = this.document.createElement("link");
       newLink.rel = "stylesheet";
       newLink.type = "text/css";
       newLink.id = "langCss";
       newLink.href = bundleName;
       headTag.appendChild(newLink);
    }
    this.router.navigate(['']);
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
