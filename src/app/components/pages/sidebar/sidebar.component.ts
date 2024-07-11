import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, RouterLink, RouterLinkActive, MatIconModule, MatSidenavModule, MatListModule, RouterOutlet, MatExpansionModule,MatMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = [
    {
      link: 'dashboard',
      label: 'Dashboard',
      icon: 'loop',
      expanded: false,
      active: false,

    },
    {
      link: 'income-details',
      label: 'Income Details',
      icon: 'router',
      expanded: false,
      active: false
    },
    {
      link: 'expense-details',
      label: 'Expense Details',
      icon: 'router',
      expanded: false,
      active: false
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.setActiveNavItem();
      }
    });

    // this.setActiveNavItem();
  }

  // setActiveNavItem(): void {
  //   const currentUrl = this.router.url;
  //   this.navItems.forEach(item => {
  //     if (item.subItems) {
  //       item.expanded = item.subItems.some(subItem => currentUrl.includes(subItem.link));
  //       item.active = item.subItems.some(subItem => currentUrl.includes(subItem.link));
  //       item.subItems.forEach(subItem => {
  //         console.log(currentUrl);
          
  //         subItem.active = currentUrl.includes(subItem.link);
  //       });
  //     } else {
  //       item.active = currentUrl.includes(item.link);
  //     }
  //   });
  // }

    toggleExpansion(item: any) {
      item.expanded = !item.expanded;
      item.icon = item.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }

    logOut() {
      this.router.navigate(['/']);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
}
