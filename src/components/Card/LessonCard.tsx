import WinnersLogo from "../ui/WinnersLogo";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { CiHeart } from "react-icons/ci";

import Video from "./../../assets/Community.mp4";
import { Link } from "react-router";

const Cards = () => {
  return (
    <div className="">
      <Link 
      className=""
      to={"/lessonsdetail"}>
        <div className=" flex items-center justify-center  ">
          <div
            data-aos="slide-up"
            className="lg:border-1 md:border-1 flex items-center justify-center  border-t border-b border-black lg:w-90 w-full sm:w-full md:w-90 drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover hover:scale-102 transition-all duration-300"
          >
            <div className="">
              <div className="w-full">
                <video
                  muted
                  loop
                  controls
                  className="w-screen h-60 bg-black "
                >
                  <source src={Video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="-translate-y-50 lg:block md:block   lg:w-31  md:w-31 w-20 fixed -translate-x-0">
                  <WinnersLogo />
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={learning} />
                    </div>
                    <p>Name Of Lesson</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={search} />
                    </div>
                    <p className="p-2">23</p>
                  </div>
                </div>
                <p className="text-center">_________________________</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="m-2 bg-red-500 rounded-sm px-4">Level</p>
                  </div>
                  <div className="flex items-center">
                    <p className="p-2">02.02.2022</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={teachers} />
                    </div>
                    <p>Teacher:</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <CiHeart className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="p-2">23</p>
                  </div>
                </div>
              </div>
              <button className="m-1 text-[#fc8100]">See In Detail...</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
