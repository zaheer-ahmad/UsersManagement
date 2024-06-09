import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  lang:string = "en";
  constructor() { }
  changeLang(lang:string){
    this.lang = lang;
  }
}
