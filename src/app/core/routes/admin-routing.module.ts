import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from 'src/app/features/admin/components/admin-login/admin-login.component';
import { AdminNavBarComponent } from '../admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminMainComponent } from 'src/app/features/admin/components/admin-main/admin-main.component';
import { UserManagementComponent } from 'src/app/features/admin/components/user-management/user-management.component';
import { AdminAuthGuard } from '../admin/guards/admin-auth.guard';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
