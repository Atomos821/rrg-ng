import { Component, input } from '@angular/core';
// import { OverviewActivity } from '../../../features/stats/models/stats.models';

interface Dummy {
  day: string;
  ai_kills: number;
  player_kills: number;
}

@Component({
  selector: 'app-chart-histogram',
  imports: [],
  templateUrl: './chart-histogram.html',
  styleUrl: './chart-histogram.scss',
})
export class ChartHistogram {
  title = input<string | null>();
  data = input.required<Dummy[]>();
  // data = input.required<OverviewActivity[]>();
}
