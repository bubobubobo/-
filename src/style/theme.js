import { css } from "styled-components";

export const theme = {
  bg_basic: "#CBC5C1",
  bg_main: "#A2AAB0",
  bg_box: "#4C586F",
  accent: "#193446",
  font_white: "#EBECED",
  placeholder: "#808080",

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export const mixins = {
  flexBox: (direction = "row", align = "center", justify = "center") => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};
