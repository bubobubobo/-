const signed = (state = { nickname: "", isSigned: false }, action) => {
  const { type, nickname } = action;

  switch (type) {
    case "SIGNIN":
      return { nickname, isSigned: true };

    case "LOGOUT":
      return { nickname, isSigned: false };

    default:
      return state;
  }
};

export default signed;
