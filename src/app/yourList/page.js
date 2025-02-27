"use client";
import { useFetchLists } from "@/store/listStore";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

const YourList = () => {
  const { userId } = useAuthStore();
  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
  } = useFetchLists();

  const handleNavigation = (listDetails) => {
    localStorage.setItem("listDetails", JSON.stringify(listDetails));
  };
  if (isListLoading) return <div> lists are loading</div>;
  if (isListError) return <div>Error fetching lists</div>;

  return (
    <div className="px-64 py-16 flex flex-col">
      <div className="text-2xl text-[#FF7F50] flex justify-between">
        <div>Your Lists</div>
        <Link
          href={"/yourList/add"}
          className="bg-[#7FD8BE] px-4 rounded-xl text-lg self-center text-white hover:text-gray-500"
        >
          Create a new List
        </Link>
      </div>
      <div className="bg-gray-500 w-full h-[1px] mt-2"></div>
      <div className="mt-8">
        {lists
          .filter((list) => list.userId._id === userId)
          .map((list) => {
            return (
              <div key={list._id}>
                <div className="flex gap-20  items-center">
                  <Link
                    href={{
                      pathname: `/yourList/${list._id}`,
                    }}
                    onClick={() => handleNavigation(list)}
                    className="flex border-black border-2 hover:border-white"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${list.restaurantIds[0].posterUrl})`,
                      }}
                      className="bg-cover bg-center h-[14.063rem] w-[9.375rem] border-black border-2"
                    ></div>
                    {list.restaurantIds[1] !== undefined ? (
                      <div
                        style={{
                          backgroundImage: `url(${list.restaurantIds[1].posterUrl})`,
                        }}
                        className="bg-cover bg-center h-[14.063rem] w-[6.375rem] border-black border-2"
                      ></div>
                    ) : (
                      ""
                    )}
                    {list.restaurantIds[2] !== undefined ? (
                      <div
                        style={{
                          backgroundImage: `url(${list.restaurantIds[2].posterUrl})`,
                        }}
                        className="bg-cover bg-center h-[14.063rem] w-[6.375rem] border-black border-2"
                      ></div>
                    ) : (
                      ""
                    )}
                  </Link>

                  <div className="text-2xl">
                    <Link
                      onClick={() => handleNavigation(list)}
                      href={`/yourList/${list._id}`}
                      className="hover:text-gray-500"
                    >
                      {list.title}
                    </Link>
                    <div className="text-sm text-center flex items-center justify-center gap-4">
                      {list.numberOfLikes}
                      <CiHeart />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-500 h-[1px] mt-2 mb-2"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default YourList;
