import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewStats, PlayerPublic, KillPublic, ServerActivityStats } from './models/stats.models';
import { PaginatedResponse } from '../../core/models/pagination';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private http = inject(HttpClient);

  private host = environment.apiUrl;
  private options = environment.includeNgrokHeader ? {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  } : undefined;

  getOverview(): Observable<OverviewStats> {
    const endpoint = '/api/v1/overview/';
    return this.http.get<OverviewStats>(this.host + endpoint, this.options);
  }

  getOverviewActivity(): Observable<ServerActivityStats> {
    const endpoint = '/api/v1/overview/activity';
    return this.http.get<ServerActivityStats>(this.host + endpoint, this.options);
  }

  getOverviewActivityLast7Days(): Observable<ServerActivityStats[]> {
    const endpoint = '/api/v1/overview/activity-last-7d';
    return this.http.get<ServerActivityStats[]>(this.host + endpoint, this.options);
  }

  getOverviewActivityLast30Days(): Observable<ServerActivityStats[]> {
    const endpoint = '/api/v1/overview/activity-last-30d';
    return this.http.get<ServerActivityStats[]>(this.host + endpoint, this.options);
  }

  getOverviewActivityLast90Days(): Observable<ServerActivityStats[]> {
    const endpoint = '/api/v1/overview/activity-last-90d';
    return this.http.get<ServerActivityStats[]>(this.host + endpoint, this.options);
  }

  getOverviewLastKills(): Observable<KillPublic[]> {
    const endpoint = '/api/v1/overview/last-kills';
    return this.http.get<KillPublic[]>(this.host + endpoint, this.options);
  }

  getPlayers(page: number = 1, size: number = 10): Observable<PaginatedResponse<PlayerPublic>> {
    const endpoint = `/api/v1/player/?skip=${(page - 1) * size}&limit=${size}`;
    return this.http.get<PaginatedResponse<PlayerPublic>>(this.host + endpoint, this.options);
  }

  getPlayer(id: number): Observable<PlayerPublic> {
    const endpoint = `/api/v1/player/${id}`;
    return this.http.get<PlayerPublic>(this.host + endpoint, this.options);
  }

  // TODO: Refactor below methods to match backend or remove if unused
  /*
  getPlayerKillsByDay(nickname: string): Observable<GenericDayKills[]> {
    const endpoint = `/api/stats/players/${nickname}/kills-by-day`;
    return this.http.get<GenericDayKills[]>(this.host + endpoint, this.options);
  }

  getPlayerWeapons(nickname: string): Observable<WeaponUsage[]> {
    const endpoint = `/api/stats/players/${nickname}/weapons`;
    return this.http.get<WeaponUsage[]>(this.host + endpoint, this.options);
  }

  getPlayerKills(nickname: string): Observable<GenericKills> {
    const endpoint = `/api/stats/players/${nickname}/kills`;
    return this.http.get<GenericKills>(this.host + endpoint, this.options);
  }

  getPlayerLastKills(nickname: string): Observable<WeaponKillLog[]> {
    const endpoint = `/api/stats/players/${nickname}/last-kills`;
    return this.http.get<WeaponKillLog[]>(this.host + endpoint, this.options);
  }

  getPlayerLastDeaths(nickname: string): Observable<WeaponKillLog[]> {
    const endpoint = `/api/stats/players/${nickname}/last-deaths`;
    return this.http.get<WeaponKillLog[]>(this.host + endpoint, this.options);
  }

  getLeaderboardKills(): Observable<Player[]> {
    const endpoint = '/api/stats/leaderboards/kills';
    return this.http.get<Player[]>(this.host + endpoint, this.options);
  }
  */
}
