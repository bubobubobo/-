// react
import { useState } from "react";
import { Link } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../actions/sign";

const SignIn = () => {
  // dispatcher
  const dispatch = useDispatch();

  // local state
  const [signInState, setSignInState] = useState({ email: "", password: "" });

  // signin info array
  const states = Object.keys(signInState);

  // helper
  const handleSignInState = (target, value) => {
    setSignInState({ ...signInState, [target]: value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(1);
    // TODO: nickname 줄 것!
    dispatch(signIn("phyzee"));
  };

  // SignIn template
  return (
    <form onSubmit={handleSignIn}>
      <Link to={"/"}>SHOW ME</Link>

      <h1>SIGN IN</h1>

      {/* input containers */}
      {states.map((state, idx) => (
        <div key={idx}>
          <label htmlFor={`input_${state}`}>input {state}</label>
          <input
            id={`input_${state}`}
            type={state}
            placeholder={state === "confirm" ? "confirm password" : state}
            onChange={(e) => handleSignInState(state, e.target.value)}
            value={signInState[state]}
            required
          />
          {/* TODO: bar icon */}
          {/* TODO: show error msg */}
        </div>
      ))}

      <button>로그인</button>

      <div>
        아직 회원이 아니신가요?<Link to={"/signup"}>회원가입</Link>
      </div>
    </form>
  );
};

export default SignIn;
