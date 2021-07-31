export interface Prof {
  profile_name: string;
  uuid: string;
  email: string;
  one_checkout?: boolean;
  shipping: Address;
  sameBilling?: boolean;
  billing?: Address;
  payment: Payment;
}

export interface Address {
  name?: string;
  phone?: string;
  addy1: string;
  addy2?: string;
  addy3?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface Payment {
  name?: string;
  type: string;
  cnb: string;
  month?: string;
  year?: string;
  cvv?: string;
}

export interface Group {
  name: string;
  uuid: string;
  total: number;
  profiles?: {
    [k: string]: Prof;
  };
}

export interface FormattedProfile {
  name: string;
  uuid: string;
  last4: string;
  address: string;
  email: string;
  type: string;
}
