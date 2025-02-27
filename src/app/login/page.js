"use client";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        login(
          response.data.username,
          response.data.token,
          response.data.userId
        );
        toast.success("Logged In Succesfully");
        router.push("/");
      } else {
        toast.error("Error Logging in");
        event.target.email.value = "";
        event.target.password.value = "";
      }
    } catch (error) {
      console.log("here");
      toast.error("Error Logging in");
      event.target.email.value = "";
      event.target.password.value = "";
    }
  };
  return (
    <div className="flex justify-center w-full" onSubmit={handleLogin}>
      <form className="flex flex-col w-1/3 mt-4 gap-5">
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
          className="bg-[#FF7F50] w-20 h-10 rounded-xl mt-4 self-center border-black border-5 hover:text-white bg-green-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
