export interface Group {
  uuid: string;
  name: string;
  proxies: {
    [k: string]: ProxyType;
  };
}

export interface ProxyType {
  uuid: string;
  proxy: string;
  speed: string | number;
}

export interface FormattedGroup {
  name: string;
  uuid: string;
  total: number;
}
