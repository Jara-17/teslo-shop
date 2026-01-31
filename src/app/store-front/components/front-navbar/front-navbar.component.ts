import { Component, computed, inject, input, output } from '@angular/core';
import { ThemeService, ThemeName } from '../../../core/services/theme.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  private readonly themeService = inject(ThemeService);

  themeChange = output<ThemeName>();

  theme = this.themeService.currentTheme;
  isDark = this.themeService.isDarkMode;

  toggle(): void {
    this.themeService.toggleTheme();
    this.themeChange.emit(this.theme());
  }
}
