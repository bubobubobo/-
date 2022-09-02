const open = (isOpened) => {
  return {
    type: "TOGGLE_ANSWER",
    isOpened: !isOpened,
  };
};

export default open;
