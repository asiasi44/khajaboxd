"use client";
import {
  useRestaurantById,
  useUpdateRestaurant,
} from "@/store/restaurantStore";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditRestaurant = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: restaurant, error, isLoading } = useRestaurantById(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bestDish: "",
    preparationTime: "",
    heroUrl: "",
    posterUrl: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        description: restaurant.description || "",
        bestDish: restaurant.bestDish || "",
        preparationTime: restaurant.preparationTime || "",
        heroUrl: restaurant.heroUrl || "",
        posterUrl: restaurant.posterUrl || "",
      });
    }
  }, [restaurant]);

  const updateRestaurantMutation = useUpdateRestaurant();

  const handleRestaurantSubmission = (event) => {
    event.preventDefault();

    updateRestaurantMutation.mutate(
      { id, ...formData },
      {
        onSuccess: () => {
          toast.success("Restaurant Updated Successfully");
          router.push("/admin/restaurant");
        },
        onError: () => {
          toast.error("Failed to update restaurant");
        },
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Fetching Restaurant</div>;

  return (
    <div>
      <div className="text-4xl text-center m-8 text-[#7FD8BE]">
        Edit Restaurant
      </div>
      <form
        onSubmit={handleRestaurantSubmission}
        className="flex flex-col mx-16 my-4 gap-4 items-center"
      >
        <div className="flex flex-col gap-2 justify-center ">
          Restaurant Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-[32rem] h-24 bg-[#FF7F50] px-4 py-2 text-white"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          Best Dish:
          <input
            name="bestDish"
            value={formData.bestDish}
            onChange={handleChange}
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Preparation Time:
          <input
            name="preparationTime"
            type="number"
            value={formData.preparationTime}
            onChange={handleChange}
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Hero Image URL:
          <input
            name="heroUrl"
            type="text"
            value={formData.heroUrl}
            onChange={handleChange}
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Poster URL:
          <input
            name="posterUrl"
            type="text"
            value={formData.posterUrl}
            onChange={handleChange}
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-[#7FD8BE] text-white mt-8 w-16 h-8 rounded-xl self-center"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
