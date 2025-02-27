import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "./useAuthStore";
import axios from "axios";

const fetchLists = async () => {
  const response = await axios.get("/api/list");
  return response.data.data;
};

const createList = async ({ listDetails, token }) => {
  const response = await axios.post(
    "/api/list",
    { ...listDetails },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateList = async ({ id, ...listDetails }) => {
  const response = await axios.put(`/api/list/${id}`, {
    ...listDetails,
  });
  return response.data;
};

const deleteList = async ({ id }) => {
  const response = await axios.delete(`/api/list/${id}`);
  return response.data;
};

export const useFetchLists = () => {
  return useQuery({
    queryKey: ["lists"],
    queryFn: fetchLists,
  });
};

export const useCreateList = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  return useMutation({
    mutationFn: (listDetails) => createList({ listDetails, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
};

export const useUpdateList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
};

export const useLikeList = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: async ({ listId }) => {
      console.log(listId, "like");

      const response = await axios.post(`/api/likeList/${listId}`, {
        newLikedUser: userId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
};

export const useDislikeList = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: async ({ listId }) => {
      const response = await axios.delete(`/api/likeList/${listId}`, {
        data: { newDislikedUser: userId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
};
