// style
import styled from "styled-components";

const ContactDiv = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  padding: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.bg_basic};
  text-shadow: 1px 1px 1px gray;
  background: transparent;

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 0.7rem;
  }
`;

const ContactMail = styled.a`
  color: ${(props) => props.theme.bg_basic};
  text-decoration: none;
`;

const Contact = () => {
  return (
    <ContactDiv>
      Contact :{" "}
      <ContactMail href="mailto: phyzee@naver.com">
        phyzee@naver.com
      </ContactMail>
    </ContactDiv>
  );
};

export default Contact;
