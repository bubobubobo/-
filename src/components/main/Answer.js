import { useSelector } from "react-redux";
// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const StyledWrapper = styled.div`
  display: block;
  width: 80%;
  min-height: 12rem;
  position: relative;
  ${(props) => props.theme.flexBox("column", "center", "center")}
  padding: 8px;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  background: ${(props) => props.theme.bg_box};
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
`;

const StyledAnswer = styled.p`
  display: block;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
  text-align: center;
`;
//////////////////////////////////////////////////////////////////////

const Answer = () => {
  const { question } = useSelector((state) => state);
  const { selected } = question;

  return (
    <StyledWrapper>
      {selected.length ? (
        <StyledAnswer> {"A. " + selected[0]["answer"]}</StyledAnswer>
      ) : null}
    </StyledWrapper>
  );
};

export default Answer;
