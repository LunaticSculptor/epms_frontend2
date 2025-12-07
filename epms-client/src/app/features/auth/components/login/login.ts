import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { ThemeService } from '../../../../core/services/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.isLoading = false;
        // Redirect based on role
        if (user.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (user.role === 'HR') {
          // Maybe HR dashboard or Review submit? Let's default to View Performance for non-admins for now if no specific dash
          this.router.navigate(['/employee/performance']); // Or review/submit
        } else {
          this.router.navigate(['/employee/performance']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Invalid email or password';
      }
    });
  }
}
