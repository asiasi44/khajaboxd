"use client";
import Avatar from "boring-avatars";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const NavBar = () => {
  const router = useRouter();
  const { loggedIn, username, logout, initAuth, userId } = useAuthStore();
  const [displayLogout, setDisplayLogout] = useState(false);

  useEffect(() => {
    initAuth();
  }, []);

  const logOutButton = {
    display: displayLogout ? "" : "none",
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out succesfully");
    router.push("/");
  };

  return (
    <section className="flex px-64 justify-between h-[4.5rem] items-center bg-[#FF7F50]">
      <Link className="text-3xl" href={"/"}>
        khajaboxd
      </Link>
      <div className="flex gap-12">
        {loggedIn ? (
          <>
            <Link
              className="hover:text-[#FCEFEF] text-black p-2"
              href={"/lists"}
            >
              Lists
            </Link>
            <div
              className="flex justify-center items-center hover:cursor-pointer"
              onClick={() => setDisplayLogout(!displayLogout)}
            >
              <div className="relative">
                <div className="relative flex gap-2 justify-center items-center">
                  <Avatar name={userId} variant="beam" size={30} />
                  <div className="bg-[#FF7F50]">
                    <div className="hover:text-white">{username}</div>
                    <div className="hover:text-white">
                      <div className="w-full h-[1px] "></div>
                      <div
                        className="absolute justify-center p-2 bg-[#FF7F50] border-black border-1"
                        onClick={handleLogout}
                        style={logOutButton}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RiArrowDropDownLine className="hover:text-white" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default NavBar;
