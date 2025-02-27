import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const createReview = async ({ newReview, token }) => {
  const response = await axios.post("/api/review", newReview, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateReview = async ({ updatedReview, token }) => {
  const { description, rating, reviewId } = updatedReview;
  console.log(description, rating, reviewId, token);
  const response = await axios.put(
    `/api/review/${reviewId}`,
    { description, rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const useLikeReview = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: async ({ reviewId }) => {
      await axios.post(`/api/likeReview/${reviewId}`, {
        newLikedUser: userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant"]);
    },
  });
};

export const useDislikeReview = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: async ({ reviewId }) => {
      await axios.delete(`/api/likeReview/${reviewId}`, {
        data: { newDislikedUser: userId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant"]);
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: (newReview) => createReview({ newReview, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant"]);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: (updatedReview) => updateReview({ updatedReview, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant"]);
    },
  });
};

const deleteReview = async (reviewId) => {
  const response = await axios.delete(`/api/review/${reviewId}`);
  return response.data;
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant"]);
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    },
  });
};
