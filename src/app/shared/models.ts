export interface User {
  uid: string;
  username: string;
  email: string;
  followers?: Array<string>;
  following?: Array<string>;
}

export interface Tweet {
  userId?: string;
  postedBy: string;
  post: string;
  date: Date;
}
