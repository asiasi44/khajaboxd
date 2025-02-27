"use client";
import { useRestaurants } from "@/store/restaurantStore";
import { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useUpdateList } from "@/store/listStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditList = () => {
  const [list, setList] = useState({
    _id: "",
    title: "",
    description: "",
    restaurantIds: [],
  });

  useEffect(() => {
    const storedList = localStorage.getItem("listDetails");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      setList({ ...parsedList });
      setListOfRestaurant(
        parsedList.restaurantIds.map((restaurant) => {
          return {
            label: restaurant.name,
            value: restaurant._id,
            posterUrl: restaurant.posterUrl,
          };
        })
      );
    }
  }, []);

  const router = useRouter();
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const updateListMutation = useUpdateList();

  const submitList = async (event) => {
    event.preventDefault();
    updateListMutation.mutate(
      {
        id: list._id,
        title: event.target.title.value,
        description: event.target.description.value,
        restaurantIds: listOfRestaurant.map((each) => each.value),
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success(response.message, response.data);
          } else {
            toast.error(response.message, response.error);
          }
          router.push("/yourList");
        },
        onError: (error) => {
          console.log("Error updating List", error);
          toast.error("Error updating list");
        },
      }
    );
  };

  const { data: restaurants, isError, isLoading } = useRestaurants();

  if (isLoading) return <div>Loading restaurant details...</div>;
  if (isError) return <div>Error fetching restaurants</div>;

  const onDragStart = (index) => {
    setDragItemIndex(index);
  };

  const onDragEnter = (targetIndex) => {
    if (dragItemIndex === targetIndex) return;

    const newList = [...listOfRestaurant];
    const draggedItem = newList[dragItemIndex];

    newList.splice(dragItemIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);

    setDragItemIndex(targetIndex);
    setListOfRestaurant(newList);
  };

  const onDragEnd = () => {
    setDragItemIndex(null);
  };

  const options = restaurants.map((restaurant) => ({
    label: restaurant.name,
    value: restaurant._id,
    posterUrl: restaurant.posterUrl,
  }));

  const handleRemoveFromList = (index) => {
    setListOfRestaurant((listOfRestaurant) =>
      listOfRestaurant.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="px-16 py-10 flex flex-col">
      <div className="text-3xl font-semibold text-[#FF7F50] text-center">
        Add List
      </div>
      <form onSubmit={submitList} className="flex flex-col gap-4">
        <label className="text-lg font-medium">Title:</label>
        <input
          name="title"
          className="p-2 border border-gray-300 rounded"
          value={list.title}
          onChange={(event) => setList({ ...list, title: event.target.value })}
        />

        <label className="text-lg font-medium">Description:</label>
        <textarea
          name="description"
          rows={4}
          className="p-2 border border-gray-300 rounded"
          value={list.description}
          onChange={(event) =>
            setList({ ...list, description: event.target.value })
          }
        ></textarea>

        <label className="text-lg font-medium">Add Restaurants:</label>
        <Select
          options={options}
          isMulti
          onChange={(selectedOptions) => {
            return setListOfRestaurant(selectedOptions);
          }}
          value={listOfRestaurant}
        />

        {/* Drag-and-drop list */}
        <div className="w-full flex flex-col gap-2 my-8">
          {listOfRestaurant.map((restaurant, index) => (
            <motion.div
              key={restaurant.value}
              className={`p-4 rounded-lg shadow-lg bg-gray-800 text-white cursor-move transition-all flex justify-between items-center ${
                dragItemIndex === index
                  ? "ring-4 ring-[#FF7F50]"
                  : "hover:bg-gray-700"
              }`}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragEnter={() => onDragEnter(index)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
              layout
              whileDrag={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex gap-20 items-center text-4xl h-full">
                <div>{index + 1}. </div>
                <div className="h-[7.063rem] w-[1px] bg-white"></div>
                <div className="text-lg flex items-center gap-8">
                  <div
                    href={`/restaurant/${restaurant.value}`}
                    style={{ backgroundImage: `url(${restaurant.posterUrl})` }}
                    className="bg-cover bg-center h-[6.063rem] w-[3.375rem] rounded-md"
                  ></div>
                  <div>{restaurant.label}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="hover:bg-green-500">
                  <MdDragIndicator size={50} />
                </div>
                <div className="h-[7.063rem] w-[1px] bg-white"></div>

                <div
                  className="cursor-pointer hover:bg-red-500"
                  onClick={() => handleRemoveFromList(index)}
                >
                  <IoIosClose size={50} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-[#FF7F50] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#FF6A36] transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditList;
