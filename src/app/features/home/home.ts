import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroSection } from '../../shared/ui/hero-section/hero-section';
import { TextBlock } from '../../shared/ui/text-block/text-block';
import { PitchBlock } from '../../shared/ui/pitch-block/pitch-block';
import { ActionsBlock } from '../../shared/ui/actions-block/actions-block';

@Component({
  selector: 'app-home',
  imports: [HeroSection, TextBlock, PitchBlock, ActionsBlock],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}
