import { Link } from "react-router";
import cart1 from "./../../assets/speaking.jpg";
import cart2 from "./../../assets/listening.png";
import cart3 from "./../../assets/reading.png";

const FeaturedCourses = () => {
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
        <div>
          <div data-aos="zoom-in" className="flex flex-col space-y-3">
            <div className="mx-auto">
              <span className="border-b mx-auto text-black font-thin lg:text-xl md:text-sm sm:text-xl  text-[16px] border-[#fc8100]">
                Featured Lessons
              </span>
            </div>
            <div>
              <p className="font-thin text-center">
                Live & Interactive Classes
                <br />
                Certified Instructors
                <br />
                Join our expert-led language learning training center and unlock
                fluency in English!
              </p>
            </div>
            <div className="mx-auto my-3">
              <div className="mx-auto my-3">
                <Link to="/lessons">
                  <button className="text-gray-700 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                    Example Lessons
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 space-y-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            <div
              data-aos="slide-up"
              className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
            >
              <div className="border-1 border-black ">
                <img className="w-80 h-60" src={cart1} />
                <p className="m-3 ">
                  #How to Increase Your
                  <br />
                  Speaking ability
                </p>
                <p className="m-3 ">Speaking classes</p>
                <Link to="/lessons">
                  <button className="m-3 text-[#fc8100]">Learn More</button>
                </Link>
              </div>
            </div>
            <div
              data-aos="slide-up"
              className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
            >
              <div className="border-1 border-black ">
                <img className="w-80 h-60" src={cart2} />
                <p className="m-3 ">
                  #How to Increase Your
                  <br />
                  Listening Ability
                </p>
                <p className="m-3 ">Listening classes</p>
                <div className="flex">
                </div>
                <Link to="/lessons">
                  <button className="m-3 text-[#fc8100]">Learn More</button>
                </Link>
              </div>
            </div>
            <div
              data-aos="slide-up"
              className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
            >
              <div className="border-1 border-black ">
                <img className="w-80 h-60" src={cart3} />
                <p className="m-3 ">
                  #How to Increase Your
                  <br />
                  Reading Ability
                </p>
                <p className="m-3 ">Reading classes</p>
                <div className="flex">
                </div>

                <Link to="/lessons">
                  <button className="m-3 text-[#fc8100]">Learn More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
