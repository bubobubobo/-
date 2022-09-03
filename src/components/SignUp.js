// react
import { useState } from "react";
import { Link } from "react-router-dom";

// firebase - auth
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  // local state
  const [signUpState, setSignUpState] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });

  // signup info array
  const states = Object.keys(signUpState);

  // helper
  const handleSignUpState = (target, value) => {
    setSignUpState({ ...signUpState, [target]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, nickname, password } = signUpState;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.displayName = nickname;
        console.log(user);
        console.log(user.displayName);
      })
      .catch((err) => {
        // TODO: 동일한 이메일 에러 처리
        console.error(
          `error code : ${err.code}, error message: ${err.message}`
        );
      });
  };

  // SignUp template
  return (
    <form onSubmit={handleSignUp}>
      <Link to={"/"}>SHOW ME</Link>

      <h1>SIGN UP</h1>

      {/* input containers */}
      {states.map((state, idx) => (
        <div key={idx}>
          <label htmlFor={`input_${state}`}>input {state}</label>
          <input
            id={`input_${state}`}
            type={state}
            placeholder={state}
            onChange={(e) => handleSignUpState(state, e.target.value)}
            value={signUpState[state]}
            required
          />
          {/* TODO: bar icon */}
          {/* TODO: show error msg */}
        </div>
      ))}

      <button>회원가입</button>

      <div>
        이미 회원이신가요?<Link to={"/signin"}>로그인</Link>
      </div>
    </form>
  );
};

export default SignUp;
