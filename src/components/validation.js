const format = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/,
  // 문자 혹은 숫자가 한 개 이상
  nickname: /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/,
  // 공백없는 숫자와 대소문자 6~12자리
  password: /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{6,12}$/,
};

export const isValidEmail = (email) => !!email.match(format.email);

export const isValidNickName = (nickname) => !!nickname.match(format.nickname);

export const isValidPassword = (password) => !!password.match(format.password);

export const isValidConfirmPassword = (password, confirm) =>
  password === confirm;
