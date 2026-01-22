import { Component, input } from '@angular/core';
import { OverviewActivity } from '../../../features/stats/models/stats.models';

@Component({
  selector: 'app-chart-histogram',
  imports: [],
  templateUrl: './chart-histogram.html',
  styleUrl: './chart-histogram.scss',
})
export class ChartHistogram {
  title = input<string | null>();
  data = input.required<OverviewActivity[]>();
}
