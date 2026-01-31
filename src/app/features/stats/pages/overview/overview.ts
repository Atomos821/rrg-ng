import { Component, effect, inject, resource, signal } from '@angular/core';
import { StatsService } from '../../stats-service';
import { firstValueFrom } from 'rxjs';
import { ChartData } from '../../../../shared/ui/chart-models';
import { ChartHistogram } from '../../../../shared/ui/chart-histogram/chart-histogram';
import { ChartLine } from '../../../../shared/ui/chart-line/chart-line';
import { StatCard } from '../../../../shared/ui/stat-card/stat-card';

@Component({
  selector: 'app-overview',
  imports: [StatCard, ChartHistogram, ChartLine],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  private statsService = inject(StatsService);

  protected winRate = signal<number | null>(null);
  protected killsPerDay = signal<ChartData[]>([]);

  protected overviewRes = resource({
    loader: () => firstValueFrom(this.statsService.getOverview())
  });

  protected activityRes = resource({
    loader: () => firstValueFrom(this.statsService.getOverviewActivityLast7Days())
  });

  constructor() {
    effect(() => {
      const res = this.overviewRes.value();

      if (!res || !res.victories.us_army || !res.victories.soviet_army) return;

      this.winRate.set(Math.round((res.victories.us_army / (res.victories.us_army + res.victories.soviet_army)) * 100));
    });

    effect(() => {
      const res = this.activityRes.value();

      if (!res) return;

      // Dummy data :
      const dummyData = [
        { x: '2025-01-01', y: { pvp: 10, pve: 23 } },
        { x: '2025-01-02', y: { pvp: 7, pve: 16 } },
        { x: '2025-01-03', y: { pvp: 21, pve: 36 } },
        { x: '2025-01-04', y: { pvp: 13, pve: 29 } },
        { x: '2025-01-05', y: { pvp: 18, pve: 32 } },
        { x: '2025-01-06', y: { pvp: 11, pve: 17 } },
        { x: '2025-01-07', y: { pvp: 16, pve: 27 } },
      ];

      this.killsPerDay.set(dummyData);
      return;

      // this.killsPerDay.set(res.map((item) => ({
      //   x: new Date(item.timestamp).toISOString().split('T')[0],
      //   y: {
      //     pvp: item.kills.pvp,
      //     pve: item.kills.pve,
      //   },
      // })));
    });
  }
}
