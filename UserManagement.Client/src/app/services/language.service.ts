import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private defaultLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.setInitialAppLanguage();
  }

  setInitialAppLanguage() {
    const savedLang = sessionStorage.getItem('lang');
    if (savedLang) {
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang(this.defaultLang);
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    sessionStorage.setItem('lang', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
  getValue(key:string){
    return this.translate.instant(key);
  }
}
