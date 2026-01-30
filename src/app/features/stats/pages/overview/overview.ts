import { Component, effect, inject, resource, signal } from '@angular/core';
import { StatsService } from '../../stats-service';
import { firstValueFrom } from 'rxjs';
import { ChartHistogram } from '../../../../shared/ui/chart-histogram/chart-histogram';
import { StatCard } from '../../../../shared/ui/stat-card/stat-card';

@Component({
  selector: 'app-overview',
  imports: [StatCard, ChartHistogram],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  private statsService = inject(StatsService);

  protected winRate = signal<number | null>(null);

  protected overviewRes = resource({
    loader: () => firstValueFrom(this.statsService.getOverview())
  });

  constructor() {
    effect(() => {
      const res = this.overviewRes.value();

      if (!res || !res.victories.us_army || !res.victories.soviet_army) return;

      this.winRate.set(Math.round((res.victories.us_army / (res.victories.us_army + res.victories.soviet_army)) * 100));
    });
  }
}
