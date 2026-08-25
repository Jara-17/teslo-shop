import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<router-outlet/><app-toast/>',
})
export class AppComponent {
  title = 'teslo-shop';
}
