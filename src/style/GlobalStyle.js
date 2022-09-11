import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing : border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    background: #CBC5C1;
  }
`;

export default GlobalStyle;
