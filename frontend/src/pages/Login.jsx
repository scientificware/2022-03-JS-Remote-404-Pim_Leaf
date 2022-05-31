/* eslint-disable import/no-unresolved */
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <main className="bg-principalImage bg-cover h-screen">
      <div className="bg-loginGradient bg-center bg-cover h-fit pt-20 pb-20">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-white">Login</h1>
          <div className="flex flex-row">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
