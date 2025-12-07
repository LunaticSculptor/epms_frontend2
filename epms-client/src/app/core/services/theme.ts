import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>('system');

  constructor() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    // Apply theme on change
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      this.applyTheme(currentTheme);
    });

    // Listen for system changes if in system mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.theme() === 'system') {
        this.applyTheme('system');
      }
    });

    // Initial apply
    this.applyTheme(this.theme());
  }

  setTheme(t: Theme) {
    this.theme.set(t);
  }

  private applyTheme(t: Theme) {
    const root = document.documentElement;
    let isDark = false;

    if (t === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = t === 'dark';
    }

    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }
}
