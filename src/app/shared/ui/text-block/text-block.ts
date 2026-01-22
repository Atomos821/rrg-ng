import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-text-block',
  imports: [],
  templateUrl: './text-block.html',
  styleUrl: './text-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlock {
  overText = input<string>();
  text = input.required<string  | string[]>();
  underText =  input<string>();

  protected isArray(v: unknown): boolean {
    return Array.isArray(v);
  }
}
