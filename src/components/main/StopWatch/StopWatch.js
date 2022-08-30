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
    <div>
      <span>{getTime(time)}</span>
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
