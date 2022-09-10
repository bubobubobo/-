import { useSelector } from "react-redux";
// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const StyledWrapper = styled.div`
  display: block;
  position: relative;
  ${(props) => props.theme.flexBox("column", "center", "center")}
  margin-top: 40px;
  padding: 8px;
  width: 80%;
  min-height: 200px;
  background: ${(props) => props.theme.bg_box};
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
`;

const StyledAnswer = styled.p`
  display: block;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
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
