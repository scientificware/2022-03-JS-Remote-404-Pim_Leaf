import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.warn(email);
  console.warn(password);
  return (
    <form className="flex flex-col">
      <label htmlFor="login" className="flex flex-col">
        <input
          id="email"
          type="text"
          name="email"
          placeholder=""
          onChange={(event) => {
            const input = event.target;
            setEmail(input.value);
          }}
        />
        <input
          id="password"
          type="text"
          name="password"
          placeholder=""
          onChange={(event) => {
            const input = event.target;
            setPassword(input.value);
          }}
        />
      </label>
      <input type="submit" value="login" />
    </form>
  );
}

export default LoginForm;
