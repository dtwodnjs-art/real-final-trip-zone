export const authProviders = [
  { key: "LOCAL", label: "이메일 로그인", description: "이메일과 비밀번호로 로그인" },
  { key: "KAKAO", label: "카카오", description: "카카오 계정으로 간편 로그인" },
  { key: "NAVER", label: "네이버", description: "네이버 계정으로 간편 로그인" },
  { key: "GOOGLE", label: "구글", description: "구글 계정으로 간편 로그인" },
];

export const defaultLoginForm = {
  provider: "LOCAL",
  email: "",
  password: "",
  remember: true,
};

export const defaultSignupForm = {
  provider: "LOCAL",
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "ROLE_USER",
  marketing: false,
};
