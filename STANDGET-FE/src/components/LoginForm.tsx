// AuthForm.tsx

import useHttp from "../hooks/useHttp";
import { Link, useNavigate } from "react-router";
import { ChangeEvent, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { useAuth } from "../hooks/authContext";
import { URL_API } from "../utils/url";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, error } = useHttp<{ token: string }>();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const adminRole = user?.role;

  //Login Handler
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await sendRequest({
        url: `${URL_API}/login`,
        method: "POST",
        data: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.token) {
        login(response?.token);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        adminRole ? navigate("/admin") : navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <section className="m-auto  max-w-[40rem] my-8 gap-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/5 border-4 mx-auto  m-4 p-4 justify-center items-center text-black bg-amber-200 space-y-4"
      >
        <Input
          label="E-mail"
          type="text"
          id="email"
          textarea={false}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          label="Password"
          type="password"
          id="password"
          textarea={false}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
        />
        <Button type="button" textOnly>
          <Link to="/register">Create an account</Link>{" "}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}
