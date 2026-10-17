export interface LoginTestCase {
  readonly id: string;
  readonly username: string;
  readonly password: string;
}

export const loginTestCases: Readonly<Record<string, LoginTestCase>> = {
  TC_LOGIN_001: {
    id: 'TC_LOGIN_001',
    username: 'student',
    password: 'Password123',
  },
  TC_LOGIN_002: {
    id: 'TC_LOGIN_002',
    username: 'wronguser',
    password: 'WrongPassword123',
  },
  TC_LOGIN_003: {
    id: 'TC_LOGIN_003',
    username: 'wronguser',
    password: 'Password123',
  },
  TC_LOGIN_004: {
    id: 'TC_LOGIN_004',
    username: 'student',
    password: 'WrongPassword123',
  },
};