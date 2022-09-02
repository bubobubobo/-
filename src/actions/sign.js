// TODO: verify email, password

const signIn = (nickname) => {
  return {
    type: "SIGNIN",
    nickname,
  };
};

const logOut = () => {
  return {
    type: "LOGOUT",
    nickname: "",
  };
};

export { signIn, logOut };
