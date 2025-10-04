"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useGateValue } from "@statsig/react-bindings";

export type User = {
  name: string;
  position: string;
};

export default function Page() {
  const [user, toggleUser] = useState<User>({
    name: "",
    position: "freelancer",
  });
  const router = useRouter();
  const isLoginPageActivated = useGateValue("login_page");

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    toggleUser({
      ...user,
      name: e.target.value,
    });
  };

  const handleUserPosition = (e: ChangeEvent<HTMLSelectElement>) => {
    toggleUser({
      ...user,
      position: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/about?name=" + user.name + "&position=" + user.position);
  };

  if (!isLoginPageActivated) {
    notFound();
  }

  return (
    <>
      <main className={`main-login`}>
        <div className="login-box">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              onChange={handleUserName}
            />
            <select className="login-menu" onChange={handleUserPosition}>
              <option className="login-menu-item" defaultValue="freelancer">
                Freelancer
              </option>
              <option className="login-menu-item" value="front-end-developer">
                Front-end developer
              </option>
              <option className="login-menu-item" value="designer">
                Designer
              </option>
            </select>
            <button className="login-form-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
