"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await axios.post("/api/user", { name, email, password });
    if (response.data.success) {
      toast.success("Signed Up succesfully");
      redirect("/login");
    }
  };
  return (
    <div className="flex justify-center w-full" onSubmit={handleSignUp}>
      <form className="flex flex-col w-1/3 mt-4 gap-5">
        Name:
        <input
          type="text"
          name="name"
          className="h-10 bg-[#FF7F50] rounded-xl p-4"
        ></input>
        Email:
        <input
          type="email"
          name="email"
          className="h-10 bg-[#FF7F50] rounded-xl p-4"
        ></input>
        Password:
        <input
          type="password"
          name="password"
          className="h-10 bg-[#FF7F50] rounded-xl p-4"
        ></input>
        <button
          type="submit"
          className="bg-[#FF7F50] w-20 h-10 rounded-3xl mt-4 self-center border-black border-5"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
