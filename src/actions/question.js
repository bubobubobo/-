const question = (idx) => {
  return {
    type: "NEW_QUESTION",
    idx,
  };
};

export default question;
