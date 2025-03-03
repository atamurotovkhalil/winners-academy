import { Link } from "react-router";
import WinnersLogo from "../ui/WinnersLogo";
import { CiHeart } from "react-icons/ci";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import cart1 from "./../../assets/cart1.jpeg";
import { FaRegComment } from "react-icons/fa6";


const CommunityCard = () => {
  return (
    <div>
      <Link className="" to={"/communitydetail"}>
        <div className=" flex items-center justify-center  ">
          <div
            data-aos="slide-up"
            className="lg:border-1 md:border-1 flex items-center justify-center  border-t border-b border-black lg:w-90 w-full sm:w-full md:w-90 drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                  object-cover hover:scale-102 transition-all duration-300"
          >
            <div className="">
              <div className="w-full">
                <img className="w-80 h-60" src={cart1} />
                <div className="-translate-y-56 lg:block md:block   lg:w-31  md:w-31 w-20 fixed -translate-x-0">
                  <WinnersLogo />
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={learning} />
                    </div>
                    <p>Title:</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={search} />
                    </div>
                    <p className="p-2">23</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="m-2 bg-red-500 rounded-sm px-4">Caregory</p>
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
                    <p>Author</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <CiHeart className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="p-2">23</p>
                  </div>
                </div>
              </div>

              <p className="text-center">_________________________</p>
              <div className="flex items-center justify-between">
                <button className="m-1 text-[#fc8100]">See In Detail...</button>
                Comments: 12
                <FaRegComment className="mx-2"/>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCard;
