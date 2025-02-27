import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const fetchRestaurants = async () => {
  const restaurants = await axios
    .get("/api/restaurant")
    .then((response) => response.data.restaurants);
  return restaurants;
};

const fetchRestaurantById = async (id, userId) => {
  const response = await axios.get(`/api/restaurant/${id}`);

  return response.data.restaurant;
};

const createRestaurant = async (newRestaurantDetails) => {
  const { name, description, preparationTime, bestDish, heroUrl, posterUrl } =
    newRestaurantDetails;
  const response = await axios.post("/api/restaurant", {
    name,
    description,
    preparationTime,
    bestDish,
    heroUrl,
    posterUrl,
  });
  console.log(response.data);
  return response.data;
};

const deleteRestaurantById = async ({ id }) => {
  const response = await axios.delete(`/api/restaurant/${id}`);
  return response.data;
};

const updateRestaurant = async ({ id, ...restaurantDetails }) => {
  const { name, description, preparationTime, bestDish, heroUrl, posterUrl } =
    restaurantDetails;
  const response = await axios.put(`/api/restaurant/${id}`, {
    name,
    description,
    preparationTime,
    bestDish,
    heroUrl,
    posterUrl,
  });
  return response.data;
};

export const useDeleteRestaurantById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRestaurantById,
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant", "restaurants"]);
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant", "restaurants"]);
    },
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRestaurantDetails) =>
      createRestaurant(newRestaurantDetails),
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
    },
  });
};

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
};

export const useRestaurantById = (id) => {
  const { userId } = useAuthStore();
  return useQuery({
    queryKey: ["restaurant"],
    queryFn: () => fetchRestaurantById(id, userId),
    enabled: !!id,
  });
};
