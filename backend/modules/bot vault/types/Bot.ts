export interface Robot {
  bbId?: number;
  types: Types;
  name: string;
}

export interface Types {
  Renewal: null | Array<Renewal>;
  Lifetime: boolean;
}

export interface Renewal {
  timePeriod: number;
  amount: number;
  currency?: string;
}
