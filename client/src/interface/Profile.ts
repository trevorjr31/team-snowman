export interface Profile {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  description: string;
  availability: [{ start: Date; end: Date }];
  photo: string;
  isSitter: Boolean;
  hourlyRate: Number;
  title: string;
  userId: string;
  _id: string;
  _v: number;
}

export interface ProfileData {
  error?: string;
  success?: string;
  profile: Profile;
}
