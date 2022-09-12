// redux
import { useDispatch, useSelector } from "react-redux";
import { getSolvedQuestion } from "../../actions/question";

// style
import styled, { keyframes } from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
// bounce hover effect : https://codepen.io/halink0803/pen/qdVXqm
const bounce = keyframes`
  0%, 100%, 20%, 50%, 80% {
    -webkit-transform: translateY(0);
    -ms-transform:     translateY(0);
    transform:         translateY(0)
  }
  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform:     translateY(-10px);
    transform:         translateY(-10px)
  }
  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform:     translateY(-5px);
    transform:         translateY(-5px)
  }
`;

const SolvedWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1.875rem;
  margin-bottom: 1.875rem;
  border-radius: 10px;
  background: ${(props) => props.theme.bg_basic};
  box-shadow: 2px 2px 2px gray inset, -2px -2px 2px gray inset,
    2px -2px 2px gray inset, -2px 2px 2px gray inset;
`;

const SolvedButton = styled.button`
  width: 10rem;
  border: initial;
  border-radius: 8px;
  color: ${(props) => props.theme.font_white};
  line-height: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${(props) => props.theme.bg_box};

  // animation
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;

  &:hover {
    cursor: pointer;
    animation-name: ${bounce};
    -moz-animation-name: ${bounce};
  }

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 0.7rem;
    width: 5rem;
    line-height: 1.5rem;
  }
`;
//////////////////////////////////////////////////////////////////////

const Solved = ({ setIsOpened }) => {
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state);
  const solvedList = question.selected.slice(1).reverse();

  // helper
  const handleSolved = (e) => {
    const clickedId = e.target.id;
    setIsOpened(false);
    dispatch(getSolvedQuestion(clickedId));
  };

  return (
    <>
      {solvedList.length ? (
        <SolvedWrapper>
          {solvedList.map(({ id, question }) => (
            <SolvedButton key={id} id={id} onClick={handleSolved}>
              {question}
            </SolvedButton>
          ))}
        </SolvedWrapper>
      ) : null}
    </>
  );
};

export default Solved;
