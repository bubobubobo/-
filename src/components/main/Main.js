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

const Main = () => {
  const { isSigned } = useSelector((state) => state.signed);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <Header />
      <HitMe />
      {!isSigned ? null : (
        <>
          <StopWatch />
          <Question />
          <button onClick={() => setIsOpened(!isOpened)}>?</button>
          {isOpened ? <Answer /> : null}
        </>
      )}
    </div>
  );
};

export default Main;
