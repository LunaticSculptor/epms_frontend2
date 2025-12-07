import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CountdownService } from '../../../core/services/countdown';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  user;
  formattedTime;

  // Computed role-based links
  navLinks = computed(() => {
    const role = this.user()?.role;
    const links = [];

    if (role === 'Admin' || role === 'HR' || role === 'Employee') {
      links.push({ path: '/employee/performance', label: 'Performance' });
    }

    if (role === 'HR') {
      links.push({ path: '/review/submit', label: 'Submit Review' });
    }

    if (role === 'Admin') {
      links.push({ path: '/bonus/approve', label: 'Approve Bonus' });
      links.push({ path: '/admin/dashboard', label: 'Dashboard' });
    }

    if (role === 'Admin' || role === 'HR') {
      links.push({ path: '/training/overdue', label: 'Overdue Training' });
    }

    return links;
  });

  constructor(
    public authService: AuthService,
    public countdownService: CountdownService,
    public themeService: ThemeService
  ) {
    this.user = this.authService.currentUser;
    this.formattedTime = this.countdownService.formattedTime;
  }

  toggleTheme() {
    const current = this.themeService.theme();
    const next = current === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(next);
  }

  logout() {
    this.authService.logout();
  }
}
