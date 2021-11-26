export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  description: string;
  availability: [{ start: Date; end: Date }];
  photo: string;
  isSitter: boolean;
  defaultPaymentMethod: string;
  _id: string;
  _v: number;
}

export interface ProfileData {
  error?: string;
  success?: { profile: Profile };
}
