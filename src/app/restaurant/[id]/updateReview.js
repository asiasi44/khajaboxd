"use client";
import { useEffect, useState } from "react";
import { StarRating } from "react-flexible-star-rating";
import { IoMdCloseCircle } from "react-icons/io";
import { useDeleteReview, useUpdateReview } from "@/store/reviewStore";

const UpdateReview = ({
  displayUpdateLog,
  restaurantDetails,
  setDisplayUpdateLog,
  userReview,
}) => {
  const deleteReviewMutation = useDeleteReview();
  const updateReviewMutation = useUpdateReview();
  const [ratingValue, setRatingValue] = useState(userReview?.rating || 0);
  const [descriptionValue, setDescriptionValue] = useState("");

  const logStyle = {
    display: displayUpdateLog ? "" : "none",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    setRatingValue(userReview?.rating || 0);
    setDescriptionValue(userReview?.description || 0);
  }, [userReview]);

  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(userReview._id);
    }
    setRatingValue(0);
    setDescriptionValue("");

    setDisplayUpdateLog(false);
  };
  const handleReview = async (event) => {
    event.preventDefault();
    updateReviewMutation.mutate({
      rating: ratingValue,
      description: descriptionValue,
      reviewId: userReview._id,
    });
    setRatingValue(0);
    setDescriptionValue("");

    setDisplayUpdateLog(false);
  };
  return (
    <div
      className="bg-[#FF7F50] fixed top-1/2 left-1/2 z-10 py-5 px-10 rounded-2xl"
      style={logStyle}
    >
      <div className="absolute right-3 top-3 hover:text-red-500 hover:cursor-pointer">
        <IoMdCloseCircle
          className="relative top-0"
          size={30}
          onClick={() => setDisplayUpdateLog(false)}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-[#FCEFEF] font-extrabold text-3xl">
          {restaurantDetails.name}
        </div>
        <div className="flex items-center gap-10 justify-center">
          <div
            style={{ backgroundImage: `url(${restaurantDetails.posterUrl})` }}
            className="bg-cover bg-center bg-scale-down h-[275px] w-[200px] rounded-md"
          ></div>
          <div className="flex flex-col gap-5">
            <div>This place will be marked visited</div>
            <textarea
              cols={20}
              rows={5}
              onChange={(event) => setDescriptionValue(event.target.value)}
              defaultValue={descriptionValue}
            ></textarea>
            <div className="flex flex-col gap-10">
              <StarRating
                initialRating={ratingValue}
                isHalfRatingEnabled={true}
                dimension={15}
                color="#7FD8BE"
                onRatingChange={(rating) => setRatingValue(rating)}
                isHoverEnabled={false}
              />
              <div className="flex gap-2 justify-between">
                <button
                  className="bg-red-500 text-[#FCEFEF] font-extrabold w-20 self-center rounded-lg"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-[#7FD8BE] text-[#FCEFEF] font-extrabold w-20 self-center rounded-lg"
                  onClick={handleReview}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
