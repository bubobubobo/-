import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <form>
      <Link to={"/"}>SHOW ME</Link>
      <h1>SIGN IN</h1>

      {/* input container - email */}
      <div>
        <label htmlFor="input_email">input email</label>
        <input id="input_email" type="email" placeholder="email" required />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      {/* input container - password */}
      <div>
        <label htmlFor="input_password">input password</label>
        <input
          id="input_password"
          type="password"
          placeholder="password"
          required
        />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      <button>로그인</button>
      <div>
        아직 회원이 아니신가요?<Link to={"/signup"}>회원가입</Link>
      </div>
    </form>
  );
};

export default SignIn;
