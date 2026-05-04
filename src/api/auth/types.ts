export type SignupData = {
  id: string;
  email: string;
  pwd: string;
  name?: string;
  nickName: string;
  tel?: string;
};

export type LoginData = {
  customerId: string;
  customerPwd: string;
};

export type LoginResponse = {
  text: string;
  id: string;
  name: string;
  nickName: string;
  tel: string;
};

export type UserInfoResponse = {
  id: string;
  nickName: string;
  name: string;
  tel: string;
  checkAdmin: boolean;
  userType?: string;
  kakaoLinked?: boolean;
  googleLinked?: boolean;
  naverLinked?: boolean;
  text: boolean;
};

export type UpdateUserProfileParams = {
  nickName: string;
  tel?: string;
};
