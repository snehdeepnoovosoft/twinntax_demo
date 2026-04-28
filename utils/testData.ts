import users from '../test-data/users.json';

export type TestUser = {
  username: string;
  password: string;
  role: string;
};

export const testUsers = users as TestUser[];
