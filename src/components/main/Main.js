// components
import Header from "./Header";
import HitMe from "./HitMe";
import StopWatch from "./StopWatch";
import Question from "./Question";
import Answer from "./Answer";

// react
import { useState } from "react";

// redux
import { useSelector } from "react-redux";

// style
import styled from "styled-components";
import Solved from "./Solved";

//////////////////////////////////////////////////////////////////////
// styles
const StyledMain = styled.main`
  ${(props) => props.theme.flexBox("column", "center", "auto")};
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${(props) => props.theme.bg_main};
`;
//////////////////////////////////////////////////////////////////////

const Main = () => {
  const { isSigned } = useSelector((state) => state.signed);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <StyledMain>
      <Header />
      <HitMe setIsOpened={setIsOpened} />
      {!isSigned ? null : (
        <>
          <StopWatch />
          <Question isOpened={isOpened} setIsOpened={setIsOpened} />
          {isOpened ? <Answer /> : null}
          <Solved setIsOpened={setIsOpened} />
        </>
      )}
    </StyledMain>
  );
};

export default Main;
