import { useSelector } from "react-redux";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const QuestionWrapper = styled.div`
  display: block;
  position: relative;
  ${(props) => props.theme.flexBox("column", "center", "center")}
  padding: 8px;
  width: 80%;
  min-height: 120px;
  background: ${(props) => props.theme.bg_box};
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
`;

const StyledQuestion = styled.p`
  display: block;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
`;

const ShowAnswer = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: initial;
  background: transparent;
  font-size: 1.2em;
  font-weight: 600;
  transform: translate3d(0, -100%, 0);
  text-shadow: 2px 2px 2px gray;
  &:hover {
    text-shadow: 4px 4px 4px gray;
  }
`;

//////////////////////////////////////////////////////////////////////

const Question = ({ isOpened, setIsOpened }) => {
  const { question } = useSelector((state) => state);
  const { selected } = question;

  // TODO: select random question you coudn't study twodays becaus of me ㅜㅜ
  // nono I almost finished functions
  return (
    <>
      {selected.length ? (
        <QuestionWrapper>
          <StyledQuestion>{"Q. " + selected[0]["question"]}</StyledQuestion>
          <ShowAnswer onClick={() => setIsOpened(!isOpened)}>?</ShowAnswer>
        </QuestionWrapper>
      ) : null}
    </>
  );
};

export default Question;
