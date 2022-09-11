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
  height: 3.25rem;
  ${(props) => props.theme.flexBox("row", "center", "space-between")};
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  background: ${(props) => props.theme.bg_basic};
  box-shadow: 0 4px 4px gray;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 3.25rem;
  color: ${(props) => props.theme.accent};
`;

const LogoPad = styled.span`
  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    display: none;
  }
`;

const LinkStyle = {
  display: "inline-block",
  marginLeft: "1.2rem",
  fontSize: "1.2rem",
  fontWeight: "400",
  color: "#EBECED",
  textDecoration: "none",
};

const Greeting = styled.p`
  color: ${(props) => props.theme.accent};
`;

const GreetingPad = styled.span`
  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    display: none;
  }
`;

const Nickname = styled.span`
  font-weight: 600;
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
      <Logo>
        SHOW ME <LogoPad>WHAT YOU GOT</LogoPad>
      </Logo>

      <div>
        {isSigned ? (
          <Greeting>
            <GreetingPad>{greetingMsg + " "}</GreetingPad>
            <Nickname>{nickname}</Nickname>
            <GreetingPad> 님</GreetingPad>
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
