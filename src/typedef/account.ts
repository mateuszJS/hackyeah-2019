export type Account = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
};

export type LoginAccountResult = {
  tokens: Tokens;
  roles: number;
};

export type Tokens = {
  auth: string;
  refresh: string;
};
