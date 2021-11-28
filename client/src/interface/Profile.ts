export interface Profile {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  description: string;
  availability: [{ day: Date; start: Date; end: Date }];
  photo: string;
  isSitter: Boolean;
  hourlyRate: Number;
  title: string;
  userId: string;
  defaultPaymentMethod: string;
  heroImage: string;
  about: string;
  album: [string];
  _id: string;
  _v: number;
}

export interface ProfileData {
  error?: string;
  success?: { profile: Profile };
}
