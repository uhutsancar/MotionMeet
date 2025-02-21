import { Routes } from '@angular/router';
import { HomeComponent } from './core/main/pages/home/home.component';
import { AboutUsComponent } from './core/main/pages/about-us/about-us.component';


export const routes: Routes = [
    {
        path: "",
        component:HomeComponent
    },
    {
        path: "about-us",
        component:AboutUsComponent
    }
];
