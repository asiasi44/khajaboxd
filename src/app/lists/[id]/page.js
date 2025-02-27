"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import Avatar from "boring-avatars";
import { FaHeart } from "react-icons/fa";
import { useDislikeList, useLikeList } from "@/store/listStore";
import { IoIosClose } from "react-icons/io";

const ListById = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dislikeListMutation = useDislikeList();
  const likeListMutation = useLikeList();

  const [list, setList] = useState({
    _id: "",
    title: "",
    description: "",
    restaurantIds: [],
    userId: {
      _id: "",
      name: "",
    },
    likedUsers: [],
    numberOfLikes: 0,
  });

  const likeList = (like) => {
    if (like) {
      dislikeListMutation.mutate(
        { listId: list._id },
        {
          onSuccess: (response) => {
            setList({
              ...list,
              numberOfLikes: response.data.numberOfLikes,
              likedUsers: response.data.likedUsers,
            });
            toast.success(response.message);
          },
          onError: (error) => {
            toast.error("Error Disliking list");
          },
        }
      );
    } else {
      likeListMutation.mutate(
        { listId: list._id },
        {
          onSuccess: (response) => {
            setList({
              ...list,
              numberOfLikes: response.data.numberOfLikes,
              likedUsers: response.data.likedUsers,
            });
            toast.success(response.message);
          },
          onError: (error) => {
            toast.error("Error Liking list");
          },
        }
      );
    }
  };
  const like = list.likedUsers.includes(list.userId._id);

  useEffect(() => {
    const storedList = localStorage.getItem("listDetails");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      setList({ ...parsedList });
    }
  }, []);

  return (
    <div className="px-32 flex flex flex-col">
      <div className="text-[#7FD8BE] text-xl mt-6 flex  gap-20">
        <div className="underline">{list.title}</div>
        <div className="flex gap-2 items-center text-black">
          {list.numberOfLikes}
          <CiHeart size={20} className="text-red-500" />
        </div>
      </div>
      <div className="text-sm mt-2 italic text-gray-500">
        {list.description}
      </div>
      <div className="bg-gray-500 h-[1px] mt-2"></div>
      <div className="flex justify-between">
        <div className="flex w-2/3 flex-wrap">
          {list.restaurantIds.map((restaurant, i) => (
            <div
              className="relative w-1/5 p-4 flex flex-col justify-center items-center"
              key={restaurant._id + i}
            >
              <Link
                href={`/restaurant/${restaurant?._id}`}
                style={{ backgroundImage: `url(${restaurant.posterUrl})` }}
                className="bg-cover bg-center h-[14.063rem] w-[9.375rem] rounded-md hover:border-[#FF7F50] hover:border-2"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              ></Link>
              {hoveredIndex === i && (
                <div className="absolute top-[-10px] text-sm font-extrathin text-gray-700 bg-white p-[1px] rounded shadow">
                  {restaurant.name}
                </div>
              )}
              {i + 1}
            </div>
          ))}
        </div>
        <div className="w-1/3 flex justify-start gap-8 mt-2 flex-col items-center">
          <div className="text-sm text-center flex items-center justify-center gap-4">
            <div className="text-sm text-center flex flex-col items-center justify-center gap-8">
              <div className="flex gap-2">
                <Avatar name={list.userId._id} variant="beam" size={20} />
                by {list.userId.name}
              </div>
              <button onClick={() => likeList(like)} className="text-red-500">
                {like ? (
                  <div className="group flex gap-2 items-center text-red-500 bg-yellow-500 px-4 py-4 rounded-xl hover:text-black">
                    <FaHeart className="group-hover:hidden" />
                    <div className="group-hover:hidden">Liked by you</div>
                    <IoIosClose
                      className="group-hover:inline hidden"
                      size={20}
                    />
                    <div className="group-hover:inline hidden">
                      remove like?
                    </div>
                  </div>
                ) : (
                  <div className="group flex gap-2 items-center text-white bg-gray-500 px-4 py-4 rounded-xl hover:text-black">
                    <CiHeart size={20} className="" />
                    <div> like this list? </div>
                    {/* <div className="group-hover:hidden">like this list?</div> */}
                    {/* <div className="group-hover:inline hidden">remove this list?</div> */}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListById;
