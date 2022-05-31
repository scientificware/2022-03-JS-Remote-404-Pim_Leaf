/* eslint-disable import/no-unresolved */
import LoginForm from "@components/LoginForm";

import Logo from "@assets/feuille.png";

export default function Login() {
  return (
    <main className="bg-principalImage bg-cover h-screen flex items-center justify-center">
      <div className="bg-loginGradient bg-center bg-fixed bg-no-repeat h-fit pt-5 pb-20 w-96 rounded-sm flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="logo" className="w-28" />
          <h1 className="text-white text-5xl  mb-20">PimLeaf</h1>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
