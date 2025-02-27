import Link from "next/link";

const NotLoggedIn = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-20">
        <Link
          className="bg-[#7FD8BE] text-[#FCEFEF] px-6 font-bold text-lg tracking-wider py-1 rounded-xl"
          href={"/signUp"}
        >
          Get Started! It's free
        </Link>
        or just
        <Link
          className="bg-[#7FD8BE] text-[#FCEFEF] px-6 font-bold text-lg tracking-wider py-1 rounded-xl"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    )
}

export default NotLoggedIn