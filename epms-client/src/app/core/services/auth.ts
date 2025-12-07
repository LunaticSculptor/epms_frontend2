import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, throwError } from 'rxjs'; // Mocking for now, real implementation needs HttpClient

export interface User {
  email: string;
  role: 'Admin' | 'HR' | 'Employee';
  name?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Adjust as needed
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string, password: string, rememberMe: boolean }): Observable<any> {
    // TODO: Replace with actual API call
    // return this.http.post(`${this.apiUrl}/login`, credentials).pipe(...)

    // MOCK LOGIN FOR DEVELOPMENT
    const mockUser: User = {
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'Admin' : credentials.email.includes('hr') ? 'HR' : 'Employee',
      name: credentials.email.split('@')[0],
      token: 'mock-jwt-token'
    };

    if (credentials.rememberMe) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      sessionStorage.setItem('user', JSON.stringify(mockUser));
    }

    this.currentUser.set(mockUser);
    return of(mockUser);
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  getUserRole(): string | undefined {
    return this.currentUser()?.role;
  }
}
