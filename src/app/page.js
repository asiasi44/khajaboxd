"use client";

import HomePage from "./HomePage";
import CheckToken from "@/components/checkToken";
import { useRestaurants } from "../store/restaurantStore";

export default function Home() {
  const { data: restaurants, error, isLoading } = useRestaurants();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching restaurants</p>;
  return (
    <CheckToken>
      <HomePage restaurants={restaurants} />
    </CheckToken>
  );
}
