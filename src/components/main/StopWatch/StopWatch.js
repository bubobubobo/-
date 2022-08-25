import { useEffect, useState } from "react";

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
   */

  // states
  const [time, setTime] = useState(0);
  // const [timerInfo, setTimerInfo] = useState({
  //   isRunning: false,
  //   clear: false,
  // });
  const [isRunning, setIsRunning] = useState(false);

  const setTimer = () => {
    setTime(time + 10);
  };

  //
  // const start = () => {
  //   setTimerInfo({ isRunning: true, clear: false });
  // };

  // const reset = () => {
  //   setTimerInfo({ isRunning: false, clear: true });
  // };

  // const stop = () => {
  //   setTimerInfo({ isRunning: false, clear: false });
  // };
  const start = () => {
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
  };

  const stop = () => {
    setIsRunning(false);
  };

  // event
  // useEffect(() => {
  //   let interval;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTime((prevTime) => prevTime + 10);
  //     }, 10);
  //   } else if (!running) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRunning]);

  useEffect(() => {
    // TODO: isRunning인 경우에 setTimeInterval로 time update, 아닌 경우 clearTimeInterval
    let timerId = null;
    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRunning]);

  return (
    <div>
      <span>{time}</span>
      {isRunning ? (
        <button onClick={stop}>STOP</button>
      ) : (
        <button onClick={start}>START</button>
      )}
      <button onClick={reset}>RESET</button>
    </div>
  );
};

export default StopWatch;
