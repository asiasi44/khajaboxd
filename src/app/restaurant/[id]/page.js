"use client";
import { useParams } from "next/navigation";
import RestaurantDetails from "./details";
import ReviewSection from "./reviewSection";
import { useState } from "react";
import LogReview from "./logReview";
import UpdateReview from "./updateReview";
import { useRestaurantById } from "@/store/restaurantStore";
import useAuthStore from "@/store/useAuthStore";

const Restaurant = () => {
  const [displayLog, setDisplayLog] = useState(false);
  const [displayUpdateLog, setDisplayUpdateLog] = useState(false);

  const { userId } = useAuthStore();
  const logStyle = {
    display: displayLog ? "" : "none",
    transform: "translate(-50%, -50%)",
  };

  const blurStyle = {
    filter: displayLog || displayUpdateLog ? "blur(10px)" : "",
  };

  const { id } = useParams();

  const { data: restaurant, error, isLoading } = useRestaurantById(id);

  if (isLoading) return <p>Loading restaurant details...</p>;
  if (error) return <p>Error loading details.</p>;

  const userReview = restaurant.reviewIds.find(
    (review) => review.userId._id === userId
  );

  return (
    <div>
      <LogReview
        logStyle={logStyle}
        restaurantDetails={restaurant}
        setDisplayLog={setDisplayLog}
      />
      <UpdateReview
        displayUpdateLog={displayUpdateLog}
        restaurantDetails={restaurant}
        setDisplayUpdateLog={setDisplayUpdateLog}
        userReview={userReview}
      />
      <div className="w-full flex flex-col gap-8" style={blurStyle}>
        <div
          style={{ backgroundImage: `url(${restaurant.heroUrl})` }}
          className={`w-full h-2/5 bg-cover bg-center bg-no-repeat h-[15rem]`}
        ></div>
        <RestaurantDetails
          restaurantDetails={restaurant}
          setDisplayUpdateLog={setDisplayUpdateLog}
          setDisplayLog={setDisplayLog}
          displayLog={displayLog}
          displayUpdateLog={displayUpdateLog}
          editLogDisplay={userReview !== undefined}
        />
        <ReviewSection restaurantDetails={restaurant} userReview={userReview} />
      </div>
    </div>
  );
};

export default Restaurant;
