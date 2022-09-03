// react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const Header = () => {
  // global state
  const { nickname, isSigned } = useSelector((state) => state.signed);
  console.log(nickname);

  // local state
  const [greetingMsg, setGreetingMsg] = useState("");

  // hook
  useEffect(() => {
    const h = new Date().getHours();

    if (h >= 0 && h < 6) setGreetingMsg("조용한 밤이군요,");
    if (h >= 6 && h < 11) setGreetingMsg("좋은 아침이에요,");
    if (h >= 11 && h < 15) setGreetingMsg("점심은 드셨나요?");
    if (h >= 15 && h < 19) setGreetingMsg("저녁은 드셨나요?");
    if (h >= 19 && h <= 23) setGreetingMsg("좋은 밤이에요,");
  }, []);

  // Header template
  return (
    <div>
      <h1>SHOW ME WHAT YOU GOT</h1>

      <div>
        {isSigned ? (
          <div>
            {greetingMsg} {nickname}님
          </div>
        ) : (
          <div>
            <Link to={"/signin"}>signin</Link>
            <Link to={"/signup"}>signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
