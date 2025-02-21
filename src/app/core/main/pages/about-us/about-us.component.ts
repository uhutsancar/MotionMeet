import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent  {
    constructor(private _seoService: SeoService) {}
    ngOnInit(): void {
      this._seoService.updateSeoTags({
        title: 'MotionMeet About Us ',
        description: 'MotionMeet About Us',
        image: '',
        pageLink: ''
      })
    }
}
