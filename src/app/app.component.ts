import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/main/loyout/header/header.component';
import { FooterComponent } from './core/main/loyout/footer/footer.component';
import { CookieConsentComponent } from "./core/main/loyout/cookie-consent/cookie-consent";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      HeaderComponent, 
      FooterComponent, 
      CookieConsentComponent
    ]
})
export class AppComponent {
  title = 'MotionMeet.web';
}
