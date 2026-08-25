import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
})

export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  color = input<'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'>('primary');
  block = input(false);
  loading = input(false);
  disabled = input(false);
  label = input<string>();
  icon = input<string>();

  protected readonly classes = computed(() => {
    const classes = ['btn', `btn-${this.color()}`];
    if (this.block()) classes.push('btn-block');
    return classes.join(' ');
  });
}
