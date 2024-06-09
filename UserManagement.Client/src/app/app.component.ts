import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'my-app',
  standalone: true,
  templateUrl: './app.component.html',
  imports:[RouterModule,NavComponent]
})
export class AppComponent {

  
}