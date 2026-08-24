import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '../../components/front-navbar/front-navbar.component';

@Component({
  selector: 'store-front-layout',
  imports: [RouterOutlet, FrontNavbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './store-front-layout.component.html',
})
export class StoreFrontLayoutComponent {

}
