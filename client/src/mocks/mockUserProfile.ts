import { Profile } from '../interface/Profile';

const mockLoggedInUserProfile: Profile = {
  firstName: 'Peter',
  lastName: '',
  gender: '',
  dateOfBirth: new Date(),
  phoneNumber: '',
  address: '',
  description: '',
  availability: [{ start: new Date(), end: new Date() }],
  photo: '',
  isSitter: false,
  defaultPaymentMethod: '',
  _id: '',
  _v: 1,
};

const mockLoggedInUserProfile1: Profile = {
  firstName: 'John',
  lastName: '',
  gender: '',
  dateOfBirth: new Date(),
  phoneNumber: '',
  address: '',
  description: '',
  availability: [{ start: new Date(), end: new Date() }],
  photo: '',
  defaultPaymentMethod: '',
  isSitter: false,
  _id: '',
  _v: 1,
};

const mockLoggedInUserProfile2: Profile = {
  firstName: 'Matthew',
  lastName: '',
  gender: '',
  dateOfBirth: new Date(),
  phoneNumber: '',
  address: '',
  description: '',
  availability: [{ start: new Date(), end: new Date() }],
  photo: '',
  defaultPaymentMethod: '',
  isSitter: false,
  _id: '',
  _v: 1,
};

const mockLoggedInUserProfile3: Profile = {
  firstName: 'Mark',
  lastName: '',
  gender: '',
  dateOfBirth: new Date(),
  phoneNumber: '',
  address: '',
  description: '',
  availability: [{ start: new Date(), end: new Date() }],
  photo: '',
  defaultPaymentMethod: '',
  isSitter: true,
  _id: '',
  _v: 1,
};

const mockOtherUsersProfile: Profile[] = [mockLoggedInUserProfile1, mockLoggedInUserProfile2, mockLoggedInUserProfile3];

export { mockLoggedInUserProfile, mockOtherUsersProfile };
