import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeSlideshowComponent } from './home-slideshow/home-slideshow.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { ManageAuthGuard } from './auth-guard/manage-auth-guard';
import { SlideShowAuthGuard } from './auth-guard/slide-show-auth-guard';


const routes: Routes = [
  {
    path: '',
    component: HomeSlideshowComponent,
    canActivate: [SlideShowAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [ManageAuthGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
