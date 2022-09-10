import { useEffect, useState } from "react";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const StyledStopWatch = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 60px;
`;

const Time = styled.p`
  font-size: 3em;
  font-weight: 900;
  letter-spacing: 8px;
  color: ${(props) => props.theme.timer};
  text-align: center;
`;

const Control = styled.div`
  ${(props) => props.theme.flexBox("row", "center", "center")}
  margin-top: 40px;
`;

const ControlButton = styled.button`
  width: 15%;
  height: 30px;
  border: initial;
  border-radius: 6px;
  margin-left: 1em;
  margin-right: 1em;
  font-size: 1.1em;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
  background: ${(props) => props.theme.bg_basic};
  box-shadow: 2px 2px 2px gray;
  &:hover {
    box-shadow: 4px 4px 4px gray;
  }
`;

//////////////////////////////////////////////////////////////////////

const StopWatch = () => {
  /**
   * <구현 방식>
   *
   * 1. START 버튼을 클릭하면 isRunning state를 true로 변경
   * 2. STOP/RESET 버튼을 클릭하면 isRunning을 false로 변경 => clearTimerId
   * 3. RESET 버튼을 클릭하면 time을 0으로 초기화
   *
   * <고민할 점>
   *
   * time data는 다른 component에서 접근할 필요가 없으므로 전역 관리 필요 X => 독립적인 component로 구현
   * 코드의 길이가 짧기 때문에 하나의 파일에 작성
   * useEffect를 이용해 timer 관리
   */

  // states
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // useEffect의 실행 순서
  /**
   * 1. application이 mount될 때 실행
   * 2. dependancy array의 값이 변경될 때 return문 앞까지 실행되고 stop
   * 3. 즉 rerendering이 일어나기 직전인 unmount 시점에 특정 작업을 하고 싶다면,
   *    return문 안에 작성할 것!
   */
  useEffect(() => {
    // TODO: isRunning인 경우에 setTimeInterval로 time update, 아닌 경우 clearTimeInterval
    // TODO: https://sgwanlee.medium.com/useeffect%EC%9D%98-dependency-array-ebd15f35403a
    let timerId = null;

    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      // console.log("timer" + timerId + "is started!");
    }

    return () => {
      // console.log("timer" + timerId + "is unmounted!");
      clearInterval(timerId);
    };
  }, [isRunning]);

  // helper
  const getTime = (time) => {
    const format = (t) => (t < 10 ? "0" + t : t);

    const timeObj = new Date(time);
    const minute = timeObj.getUTCMinutes();
    const second = timeObj.getUTCSeconds();
    const millisec = timeObj.getUTCMilliseconds() / 10;

    return `${format(minute)}:${format(second)}:${format(millisec)}`;
  };

  return (
    <StyledStopWatch>
      <Time>{getTime(time)}</Time>
      <Control>
        {isRunning ? (
          <ControlButton onClick={stop}>STOP</ControlButton>
        ) : (
          <ControlButton onClick={start}>START</ControlButton>
        )}
        <ControlButton onClick={reset}>RESET</ControlButton>
      </Control>
    </StyledStopWatch>
  );
};

export default StopWatch;
