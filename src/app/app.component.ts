import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class AppComponent {
  title = 'teslo-shop';

  // Inject ThemeService to ensure it initializes early and applies saved theme
  constructor(private themeService: ThemeService) {}
}
