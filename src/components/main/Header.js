// react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  background: ${(props) => props.theme.bg_basic};
  // flexbox
  ${(props) => props.theme.flexBox("row", "center", "space-between")};
  padding-left: 1em;
  padding-right: 1em;
  box-shadow: 0 4px 4px gray;
`;

const Logo = styled.h1`
  font-size: 1.8em;
  font-weight: 900;
  color: ${(props) => props.theme.accent};
`;

const LinkStyle = {
  display: "inline-block",
  marginLeft: "0.6em",
  fontWeight: "400",
  textDecoration: "none",
  fontSize: "1.5em",
  color: "#EBECED",
};

const Greeting = styled.p`
  color: ${(props) => props.theme.accent};
`;

const Nickname = styled.span`
  font-weight: 500;
`;

//////////////////////////////////////////////////////////////////////

const Header = () => {
  // global state
  const { nickname, isSigned } = useSelector((state) => state.signed);

  // local state
  const [greetingMsg, setGreetingMsg] = useState("");

  // hook
  useEffect(() => {
    const h = new Date().getHours();

    if (h >= 0 && h < 6) setGreetingMsg("조용한 밤이군요,");
    if (h >= 6 && h < 11) setGreetingMsg("좋은 아침이에요,");
    if (h >= 11 && h < 17) setGreetingMsg("점심은 드셨나요?");
    if (h >= 17 && h < 19) setGreetingMsg("저녁은 드셨나요?");
    if (h >= 19 && h <= 23) setGreetingMsg("좋은 밤이에요,");
  }, []);

  // Header template
  return (
    <StyledHeader>
      <Logo>SHOW ME WHAT YOU GOT</Logo>

      <div>
        {isSigned ? (
          <Greeting>
            {greetingMsg} <Nickname>{nickname + " "}</Nickname>님
          </Greeting>
        ) : (
          <div>
            <Link to={"/signin"} style={LinkStyle}>
              signin
            </Link>
            <Link to={"/signup"} style={LinkStyle}>
              signup
            </Link>
          </div>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
