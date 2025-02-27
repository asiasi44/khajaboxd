"use client";
import { useDeleteList } from "@/store/listStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
const YourListById = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [list, setList] = useState({
    _id: "",
    title: "",
    description: "",
    restaurantIds: [],
  });

  const deleteListMutation = useDeleteList();

  useEffect(() => {
    const storedList = localStorage.getItem("listDetails");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      setList({ ...parsedList });
    }
  }, []);

  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this list"
    );
    if (!confirmation) {
      return;
    }
    deleteListMutation.mutate(
      { id: list._id },
      {
        onSuccess: (response) => {
          toast.success("Succesfully deleted List");
          console.log(response);
          router.push("/yourList");
        },
        onError: () => {
          toast.error("Error deleting list");
          console.log(error);
        },
      }
    );
  };
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
          <Link
            href={`/yourList/edit`}
            className="bg-[#7FD8BE] px-3 py-4 rounded-xl text-white hover:text-gray-500"
          >
            Edit this list
          </Link>
          <button
            onClick={handleDelete}
            className=" px-3 py-4 rounded-xl text-white hover:text-gray-500 bg-red-500"
          >
            Delete this list
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourListById;
