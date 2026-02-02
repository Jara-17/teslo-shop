import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeName, ThemeService } from '@/core/services/theme.service';

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
