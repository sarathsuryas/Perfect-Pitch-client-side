import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from 'src/app/features/admin/components/admin-login/admin-login.component';
import { AdminNavBarComponent } from '../admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminMainComponent } from 'src/app/features/admin/components/admin-main/admin-main.component';
import { UserManagementComponent } from 'src/app/features/admin/components/user-management/user-management.component';
import { adminGuard } from '../admin/guards/admin.guard';

const routes: Routes = [
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/home',component:AdminMainComponent,canActivate:[adminGuard],
  children:[
    {path:'user-management',component:UserManagementComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
