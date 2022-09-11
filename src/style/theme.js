import { css } from "styled-components";

export const theme = {
  // color palate
  bg_basic: "#CBC5C1",
  bg_main: "#A2AAB0",
  bg_box: "#4C586F",
  accent: "#193446",
  timer: "#36384C",
  font_white: "#EBECED",
  font_modal: "#F5F5DC",
  placeholder: "#808080",

  // media query size
  tablet: "700px",

  // absolute center mixin
  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

// mixins as component
export const mixins = {
  flexBox: (direction = "row", align = "center", justify = "center") => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};
