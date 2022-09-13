import { useSelector } from "react-redux";
// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const StyledWrapper = styled.div`
  display: block;
  width: 80%;
  position: relative;
  ${(props) => props.theme.flexBox("column", "center", "center")}
  gap: 1rem;
  padding: 1rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  background: ${(props) => props.theme.bg_box};
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
`;

const StyledAnswerWrapper = styled.section`
  ${(props) => props.theme.flexBox("row", "center", "space-evenly")};
  gap: 0.2rem;
  width: 100%;
  white-space: nowrap;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
`;

const StyledAnswerHeader = styled.h2`
  height: 100%;
  width: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 2rem;
  text-align: center;
  vertical-align: top;

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 1rem;
  }
`;

const StyledAnswer = styled.p`
  flex: 1;
  white-space: pre-wrap;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 2rem;
  color: ${(props) => props.theme.font_white};

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 1rem;
  }
`;

const StyledLink = styled.a`
  flex: 1;
  color: ${(props) => props.theme.font_white};
  font-weight: 500;
  line-height: 2rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 1rem;
  }
`;

//////////////////////////////////////////////////////////////////////

const Answer = () => {
  const { question } = useSelector((state) => state);
  const { selected } = question;

  return (
    <>
      {selected.length ? (
        <StyledWrapper>
          <StyledAnswerWrapper>
            <StyledAnswerHeader>A.</StyledAnswerHeader>
            <StyledAnswer>{selected[0]["answer"]}</StyledAnswer>
          </StyledAnswerWrapper>
          <StyledAnswerWrapper>
            <StyledAnswerHeader>L.</StyledAnswerHeader>
            <StyledLink target="_blank" href={selected[0]["link"]}>
              {selected[0]["link"]}
            </StyledLink>
          </StyledAnswerWrapper>
        </StyledWrapper>
      ) : null}
    </>
  );
};

export default Answer;
