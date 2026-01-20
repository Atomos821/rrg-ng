import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroSectionComponent } from "../../shared/ui/hero-section/hero-section.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
