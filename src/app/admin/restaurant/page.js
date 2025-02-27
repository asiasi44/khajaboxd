"use client";
import {
  useDeleteRestaurantById,
  useRestaurants,
} from "@/store/restaurantStore";
import Link from "next/link";
import { toast } from "react-toastify";

const DisplayRestaurants = () => {
  const { data: restaurants, isLoading, isError } = useRestaurants();
  const deleteRestaurantByIdMutation = useDeleteRestaurantById();

  if (isLoading) return <div>Restaurants are loading</div>;

  if (isError) return <div>Error Fetching restaurants</div>;

  const deleteRestaurant = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (!isConfirmed) return;
    deleteRestaurantByIdMutation.mutate(
      { id },
      {
        onSuccess: (response) => {
          toast.success("Deleted Restaurant Successfully");
          console.log(response);
        },
        onError: (error) => {
          toast.error("Error Deleting Restaurant");
          console.log(error);
        },
      }
    );
  };
  return (
    <div>
      <div className="text-3xl p-4 text-center"> Restaurant Details</div>
      <Link
        href={"/admin/restaurant/add"}
        className="bg-green-500 p-2 m-2 rounded-xl border-black border-2 text-xl text-white"
      >
        Add new Restaurant
      </Link>
      <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              name
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              description
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              bestDish
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              preparationTime
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              heroUrl
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              posterUrl
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              avgRating
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              numberOfVisitors
            </th>
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-100">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => {
            return (
              <tr key={restaurant._id} className="">
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.description}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.bestDish}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.preparationTime}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  <div
                    style={{ backgroundImage: `url(${restaurant.heroUrl})` }}
                    className={`w-48 h-32 bg-cover bg-center bg-no-repeat h-[15rem]`}
                  ></div>
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  <div
                    style={{ backgroundImage: `url(${restaurant.posterUrl})` }}
                    className="bg-cover bg-center h-[14.063rem] w-[9.375rem] rounded-md"
                  ></div>
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.avgRating}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  {restaurant.numberOfVisitors}
                </td>
                <td className="border border-gray-300 dark:border-gray-700">
                  <div className="flex gap-2 p-2">
                    <Link
                      className="bg-yellow-500 p-2 border-black border-2 rounded-xl"
                      href={`/admin/restaurant/edit/${restaurant._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 p-2 border-black border-2 rounded-xl"
                      onClick={() => deleteRestaurant(restaurant._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayRestaurants;
