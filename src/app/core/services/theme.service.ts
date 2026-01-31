import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

// Theme Configuration
export const APP_THEMES = {
  light: 'caramellatte',
  dark: 'coffee',
} as const;

export type ThemeName = (typeof APP_THEMES)[keyof typeof APP_THEMES];

const THEME_STORAGE_KEY = 'theme';
const THEME_ATTRIBUTE = 'data-theme';
const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly availableThemes = [APP_THEMES.light, APP_THEMES.dark] as const;

  // State Management
  private readonly _currentTheme = signal<ThemeName>(APP_THEMES.light);
  readonly currentTheme = this._currentTheme.asReadonly();
  readonly isDarkMode = computed(() => this._currentTheme() === APP_THEMES.dark);

  constructor() {
    this.initializeTheme();
    this.setupThemeSynchronization();
  }

  // Public API
  setTheme(theme: ThemeName): void {
    if (this.isThemeChanged(theme)) {
      this._currentTheme.set(theme);
    }
  }

  toggleTheme(): void {
    const newTheme = this.isDarkMode() ? APP_THEMES.light : APP_THEMES.dark;
    this.setTheme(newTheme);
  }

  validateTheme(value: string | null | undefined): ThemeName {
    if (!value) {
      return APP_THEMES.light;
    }

    return this.isValidTheme(value) ? (value as ThemeName) : APP_THEMES.light;
  }

  // Private Methods - Initialization
  private initializeTheme(): void {
    const initialTheme = this.determineInitialTheme();
    this._currentTheme.set(initialTheme);
  }

  private determineInitialTheme(): ThemeName {
    if (!this.isBrowser) {
      return APP_THEMES.light;
    }

    const savedTheme = this.loadThemeFromStorage();
    if (savedTheme) {
      return savedTheme;
    }

    return this.getSystemPreferredTheme();
  }

  // Private Methods - Theme Synchronization
  private setupThemeSynchronization(): void {
    effect(() => {
      const theme = this._currentTheme();

      if (this.isBrowser) {
        this.applyThemeToDOM(theme);
        this.saveThemeToStorage(theme);
      }
    });
  }

  private applyThemeToDOM(theme: ThemeName): void {
    this.document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  }

  private saveThemeToStorage(theme: ThemeName): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Silently ignore storage errors (private browsing, quota exceeded, etc.)
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  // Private Methods - Storage Operations
  private loadThemeFromStorage(): ThemeName | null {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme ? this.validateTheme(savedTheme) : null;
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      return null;
    }
  }

  // Private Methods - System Preferences
  private getSystemPreferredTheme(): ThemeName {
    const prefersDarkMode = this.doesSystemPreferDarkMode();
    return prefersDarkMode ? APP_THEMES.dark : APP_THEMES.light;
  }

  private doesSystemPreferDarkMode(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }

    return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
  }

  // Private Methods - Validation
  private isValidTheme(value: string): boolean {
    return (this.availableThemes as readonly string[]).includes(value);
  }

  private isThemeChanged(newTheme: ThemeName): boolean {
    return newTheme !== this._currentTheme();
  }
}
