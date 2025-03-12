import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });
import Avatar from "boring-avatars";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useLikeReview, useDislikeReview } from "@/store/reviewStore";
import useAuthStore from "@/store/useAuthStore";
import { UserReview } from "./userReview";

const ReviewSection = ({ restaurantDetails, userReview }) => {
  const { userId } = useAuthStore();
  const likeReviewMutation = useLikeReview();
  const dislikeReviewMutation = useDislikeReview();

  const likeReview = (like, review) => {
    if (like) {
      dislikeReviewMutation.mutateAsync({ reviewId: review._id });
    } else {
      likeReviewMutation.mutateAsync({ reviewId: review._id });
    }
  };

  return (
    <div className="mx-16 text-lg flex flex-col gap-4 mb-16">
      {userReview === undefined ? (
        ""
      ) : (
        <UserReview likeReview={likeReview} userReview={userReview} />
      )}
      <div className="text-[#7FD8BE]">Popular Reviews</div>
      <div className="h-[2px] w-full bg-gray-500"></div>
      <div className="flex flex-col gap-4">
        {restaurantDetails.reviewIds
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => (b.numberOfLikes || 0) - (a.numberOfLikes || 0)) // Sort by numberOfLikes (highest first)
          .map((review, i) => {
            let showOneAndHalf = "none";
            const givenStarRating = parseInt(review.rating);
            if (givenStarRating < review.rating) {
              showOneAndHalf = "";
            }
            const like = review.likedUsers.includes(userId);
            return (
              <div key={i}>
                <div className="flex gap-16">
                  <div className="rounded-full h-16 w-16 bg-black">
                    <Avatar name={review.userId?._id} variant="beam" />
                  </div>
                  <div className="text-sm flex flex-col gap-4">
                    <div className="text-gray-500 flex gap-2 pt-0">
                      <div>Review by {review.userId?.name} </div>
                      <div className="flex text-[#7FD8BE]">
                        <StarRatings
                          rating={givenStarRating}
                          starDimension="12px"
                          starSpacing="1px"
                          starRatedColor="rgb(127, 216, 190)"
                          numberOfStars={givenStarRating}
                        />
                        <div style={{ display: showOneAndHalf }}>1/2</div>
                      </div>
                    </div>
                    <div className="text-lg">{review.description}</div>
                    <div className="self-start flex gap-10">
                      <div>{review.numberOfLikes || "0"} Likes </div>
                      <button
                        onClick={() => likeReview(like, review)}
                        className="text-red-500"
                      >
                        {like ? (
                          <div className="flex gap-2">
                            <FaHeart /> Liked by you
                          </div>
                        ) : (
                          <CiHeart color={""} stroke="blue" fill="blue" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-[2px] w-full bg-gray-500 mt-4"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ReviewSection;
