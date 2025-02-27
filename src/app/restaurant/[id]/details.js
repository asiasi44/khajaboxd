import { GiDuration } from "react-icons/gi";
import { BiSolidDish } from "react-icons/bi";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const RestaurantDetails = ({
  restaurantDetails,
  setDisplayLog,
  displayLog,
  setDisplayUpdateLog,
  displayUpdateLog,
  editLogDisplay
}) => {
  const editLogDisplayStyle = {
    display: editLogDisplay ? "" : "none",
  };
  const logDisplayStyle = {
    display: editLogDisplay ? "none" : "",
  };
  return (
    <div className="mx-16 my-2 flex gap-20">
      <div
        style={{ backgroundImage: `url(${restaurantDetails.posterUrl})` }}
        className="bg-cover bg-center bg-scale-down h-[325px] w-[250px] rounded-md"
      ></div>
      <div className="w-1/3 flex flex-col gap-4">
        <div className="text-3xl text-[#7FD8BE] font-bold ">
          {restaurantDetails.name}
        </div>
        <div>{restaurantDetails.description}</div>
        <div className="flex mt-4 px-4 flex-col gap-4">
          <div className="text-xl text-[#FF7F50] flex gap-4 items-center">
            <div>
              Preparation <div>Duration</div>
            </div>
            <GiDuration size={35} />
            <div className="text-black">
              {restaurantDetails.preparationTime} min
            </div>
          </div>
          <div className="text-xl text-[#FF7F50] flex gap-4 items-center">
            <div>
              Best <div>Dish</div>
            </div>
            <BiSolidDish size={35} />
            <div className="text-black">{restaurantDetails.bestDish}</div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-center flex-col gap-20">
        <div
          className="bg-[#7FD8BE] text-[#FCEFEF] px-6 font-bold text-2xl tracking-wider py-1 rounded-xl hover:text-gray-500 hover:cursor-pointer"
          onClick={() => setDisplayLog(!displayLog)}
          style={logDisplayStyle}
        >
          + LOG
        </div>
        <div
          className="bg-yellow-500 text-[#FCEFEF] px-6 font-bold text-2xl tracking-wider py-1 rounded-xl hover:text-gray-500 hover:cursor-pointer"
          onClick={() => setDisplayUpdateLog(!displayUpdateLog)}
          style={editLogDisplayStyle}
        >
          Edit LOG
        </div>
        <div className="text-[#FF7F50] text-3xl gap-4 flex flex-col text-center">
          Avg Rating
          <div className="flex gap-4">
            <StarRatings
              rating={restaurantDetails.avgRating}
              starDimension="35px"
              starRatedColor="rgb(127, 216, 190)"
            />
            <div className="flex items-center">
              {restaurantDetails.avgRating.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
