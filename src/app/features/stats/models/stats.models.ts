// Base Interfaces
export interface VictoriesStats {
  us_army: number;
  soviet_army: number;
}

export interface KillsStats {
  pvp: number;
  pve: number;
}

export interface CapturesStats {
  us_army: number;
  soviet_army: number;
}

export interface DatedActivity {
  timestamp: string; // ISO 8601
}

// Entity Interfaces
export interface PlayerPublic {
  id: number;
  bi_uid: string; // UUID
  nickname: string;
  first_seen: string;
  last_seen: string;
}

export interface KillPublic {
  timestamp: string;
  killer_id: number | null;
  killer_faction_id: number | null;
  victim_id: number | null;
  victim_faction_id: number | null;
  distance: number;
  is_ai: boolean;
  is_teamkill: boolean;
  is_friendlyfire: boolean;
  is_pve: boolean;
  id: number;
}

// Composite Interfaces
export interface OverviewStats {
  players_count: number;
  pve_kills: number;
  pvp_kills: number;
  player_deaths: number;
  ai_deaths: number;
  victories: VictoriesStats;
}

export interface ServerActivityStats extends DatedActivity {
  kills: KillsStats;
  captures: CapturesStats;
  victories: VictoriesStats;
}
