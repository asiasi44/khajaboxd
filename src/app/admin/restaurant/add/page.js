"use client";
import { useCreateRestaurant } from "@/store/restaurantStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddNewRestaurant = () => {
  const createRestaurantMutation = useCreateRestaurant();
  const router = useRouter();
  const handleRestaurantSubmission = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const preparationTime = event.target.preparationTime.value;
    const bestDish = event.target.bestDish.value;
    const heroUrl = event.target.heroUrl.value;
    const posterUrl = event.target.posterUrl.value;

    createRestaurantMutation.mutate(
      {
        name,
        description,
        preparationTime,
        bestDish,
        heroUrl,
        posterUrl,
      },
      {
        onSuccess: (response) => {
          console.log("Restaurant Added Successfully:", response);
          toast.success("Restaurant Added Successfully");
          router.push("/admin/restaurant");
        },
        onError: (error) => {
          console.error("Error adding restaurant:", error);
          toast.error("Failed to add restaurant");
        },
      }
    );
  };
  return (
    <div>
      <div className="text-4xl text-center m-8 text-[#7FD8BE]">
        Add New Restaurant
      </div>
      <form
        onSubmit={handleRestaurantSubmission}
        className="flex flex-col mx-16 my-4 gap-4 items-center"
      >
        <div className="flex flex-col gap-2 justify-center ">
          Restaurant Name:
          <input
            name="name"
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Description:
          <textarea
            name="description"
            className="w-[32rem] h-24 bg-[#FF7F50] px-4 py-2 text-white"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          Best Dish:
          <input
            name="bestDish"
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Preparation Time:
          <input
            name="preparationTime"
            type="number"
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Hero Image URL:
          <input
            name="heroUrl"
            type="text"
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          Poster URL:
          <input
            name="posterUrl"
            type="text"
            className="w-[32rem] h-8 bg-[#FF7F50] p-4 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-[#7FD8BE] text-white mt-8 w-16 h-8 rounded-xl self-center"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewRestaurant;
