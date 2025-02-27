"use client";

import Link from "next/link";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const HomePage = ({ restaurants }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { username, userId } = useAuthStore();
  const [typeOfSort, setTypeOfSort] = useState("Popular");

  return (
    <div className="px-64 py-16 flex flex-col gap-4">
      <div className="text-[#7FD8BE] text-xl flex gap-8">
        <div>Welcome, {username}</div>
        <Link href={"/yourList"} className="underline text-black">
          Your Lists
        </Link>
      </div>
      <div className="bg-gray-500 w-full h-[1px]"></div>
      <div className="text-2xl text-[#FF7F50] flex justify-between">
        <div>{typeOfSort} Restaurants</div>
        <select onChange={(event) => setTypeOfSort(event.target.value)}>
          <option value={"Popularity"}>Sort by Popularity</option>
          <option value={"Highest Rated"}>Sort Highest Rated First</option>
          <option value={"Lowest Rated"}>Sort Lowest Rated First</option>
        </select>
      </div>
      <section className="flex justify-center">
        <div className="flex flex-wrap w-full">
          {[...restaurants]
            .sort((a, b) => {
              if (typeOfSort === "Highest Rated") {
                return b.avgRating - a.avgRating;
              } else if (typeOfSort === "Lowest Rated") {
                return a.avgRating - b.avgRating;
              }
              return b.numberOfVisitors - a.numberOfVisitors;
            })
            .map((restaurant, i) => (
              <div
                className="relative w-1/5 p-4 flex flex-col justify-center items-center"
                key={restaurant._id}
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
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
