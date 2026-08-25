import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'auth-title',
  template: `
    <div class="flex flex-col gap-2 my-2">
      @if (title()) {
        <h1 class="text-2xl font-bold text-accent">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="text-sm text-gray-400">
            {{ subtitle() }}
          </p>
        }
      }
      <ng-content/>
    </div>
  `
})

export class AuthTitleComponent {
  title = input<string>();
  subtitle = input<string>();
}
