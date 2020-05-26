import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";


const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'user/:id', component: UserPageComponent },
      { path: 'post/:id', component: PostPageComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
