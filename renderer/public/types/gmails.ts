export interface Group {
  name: string;
  uuid: string;
  total: number;
  running: number;
  stopped: number;
  gmails?: {
    [k: string]: Gmail;
  };
}

export interface Gmail {
  uuid: string;
  email: string;
  password?: string;
  recovery?: string;
  proxy: string;
  security?: string;
  runs?: number;
  running: boolean;
  status: string;
  score: {
    v3: string | number;
    v2i: string | boolean;
    v2v: string | boolean;
  };
  groupID?: string;
  edu?: boolean;
}
