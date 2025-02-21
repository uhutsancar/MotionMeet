import { Component } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-home',
  standalone: true ,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _seoService: SeoService) {}
  ngOnInit(): void {
    this._seoService.updateSeoTags({
      title: 'Workout Tracker & Planner ',
      description: 'Break boundaries with MotionMeet',
      image: '',
      pageLink: ''
    })
  }
}
