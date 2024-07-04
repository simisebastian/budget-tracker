import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },

];
