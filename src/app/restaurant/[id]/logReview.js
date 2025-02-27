"use client";
import { useCreateReview } from "@/store/reviewStore";
import { useState } from "react";
import { StarRating } from "react-flexible-star-rating";
import { IoMdCloseCircle } from "react-icons/io";

const LogReview = ({ logStyle, restaurantDetails, setDisplayLog }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [descriptionValue, setDescriptionValue] = useState("");
  const createReviewMutation = useCreateReview();

  const handleReview = async (event) => {
    event.preventDefault();
    console.log(ratingValue, descriptionValue, restaurantDetails._id);
    const response = createReviewMutation.mutate({
      rating: ratingValue,
      description: descriptionValue,
      restaurantId: restaurantDetails._id,
    });
    setRatingValue(ratingValue);
    setDescriptionValue(descriptionValue);

    setDisplayLog(false);
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
          onClick={() => setDisplayLog(false)}
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
            ></textarea>
            <div className="flex flex-col gap-10">
              <StarRating
                initialRating={0}
                isHalfRatingEnabled={true}
                dimension={15}
                color="#7FD8BE"
                onRatingChange={(rating) => setRatingValue(rating)}
                isHoverEnabled={false}
              />
              <button
                className="bg-[#7FD8BE] text-[#FCEFEF] font-extrabold w-20 self-center rounded-lg"
                onClick={handleReview}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogReview;
