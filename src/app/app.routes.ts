import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { IncomeDetailsComponent } from './components/pages/income-details/income-details.component';
import { ExpenseDetailsComponent } from './components/pages/expense-details/expense-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    {
        path: '', component: SidebarComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'income-details', component: IncomeDetailsComponent },
            { path: 'expense-details', component: ExpenseDetailsComponent }
        ]
    },
];
