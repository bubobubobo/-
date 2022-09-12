import { useSelector } from "react-redux";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const QuestionWrapper = styled.div`
  display: block;
  width: 80%;
  min-height: 7.5rem;
  position: relative;
  ${(props) => props.theme.flexBox("column", "center", "center")}
  border-radius: 10px;
  padding: 0.5rem;
  margin-top: 1.875rem;
  margin-bottom: 1.2rem;
  background: ${(props) => props.theme.bg_box};
  box-shadow: 2px 2px 2px gray;
`;

const StyledQuestion = styled.p`
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.font_white};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 1rem;
  }
`;

const ShowAnswer = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: initial;
  background: transparent;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.font_white};
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
