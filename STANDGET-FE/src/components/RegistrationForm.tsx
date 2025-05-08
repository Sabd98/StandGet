// RegistrationForm.tsx
import { ChangeEvent, FormEvent, useState } from "react";
import useHttp from "../hooks/useHttp";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { Link, useNavigate } from "react-router";

export default function RegistrationForm() {
  //Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const { sendRequest, error, loading,setError } = useHttp();
  const navigate = useNavigate();

  //Submit Registration Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      const response = await sendRequest({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          ...formData,
          email: formData.email.toLowerCase().trim(),
        },
      });
      console.log(response, "isi");
      if (response) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="m-auto  max-w-[40rem] my-8 gap-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/5 border-4 mx-auto  m-4 p-4 justify-center items-center text-black bg-amber-200 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <Input
          label="Full Name"
          type="text"
          id="name"
          textarea={false}
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          label="Email"
          type="email"
          id="email"
          textarea={false}
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          textarea={false}
          value={formData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          label="Street"
          type="text"
          id="street"
          textarea={false}
          value={formData.street}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, street: e.target.value })}
        />
        <div className="flex gap-4">
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            textarea={false}
            value={formData.postalCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <Input
            label="City"
            type="text"
            id="city"
            textarea={false}
            value={formData.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register & Continue"}
        </Button>
        <Button type="button" textOnly>
          <Link to="/login">Back</Link>
        </Button>
      </form>
    </section>
  );
}
