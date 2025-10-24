import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Founder from "./../../assets/winners.jpg";
import w from "../../assets/sticker.png";
import A from "../../assets/sticker1.png";
import { Link } from "react-router";


const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div className="bg-black text-[#F6F6F8]">
      <span className="border-b h-56 font-thin my-2 italic lg:text-xl md:text-xl sm:text-xl  text-[10px] border-[#fc8100]">
       
        <br />
        <br />
      </span>
      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
        <div className="grid lg:grid-cols-2  md:grid-cols-2 grid-cols-1">
          <div data-aos="slide-down" className="">
            <div className="text-[#F6F6F8] mt-24 font-thin my-3 italic lg:text-xl">
              Be a winner in
            </div>
            <div>
              <div className="text-3xl lg:text-6xl ml-8 lg:my-8 italic flex items-center justify-start">
                {" "}
                <span className="text-[#fc8100] text-3xl lg:text-6xl italic">
                  {" "}
                  W
                </span>
                <span className="border-b-2 border-[#fc8100]">inners </span>
              </div>
              <div
                data-aos="slide-up"
                className="text-3xl lg:text-6xl ml-8 lg:my-8 italic flex items-center justify-center"
              >
                {" "}
                <span className="text-[#fc8100] text-3xl lg:text-6xl italic">
                  {" "}
                  A
                </span>
                <span className="border-b-2 border-[#fc8100]">cademy</span>
              </div>
            </div>
            <div>
              <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[16px]">
              The most disciplined training center 
                <br /> in Surkhandarya.
              </p>
            </div>
            <div>
              <p className="text-gray-500 italic my-3">Ilhom Safarmurodov</p>
            </div>
            <div>
              <Link
              to='/lessons'
              >
              <button className="text-gray-500 mt-10 rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] py-2 px-4 my-3">
                Learn more
              </button></Link>
            </div>
          </div>

          <div data-aos="slide-up" className="bg-center -space-y-16">
            <div className="lg:flex  md:hidden sm:hidden hidden items-center justify-end mt-20 mr-10">
              <div
                className="flex -space-x-6 rounded-full m-1 drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-gray-200 py-1"
              >
                <img className="w-20  pb-5 h-20 translate-x-2 " src={w} />
                <img className="w-20 pt-7 h-20 -translate-x-1 " src={A} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                className=" lg:h-[600px] lg:w-[600px]  w-[300px]  rounded-b-full rounded-tr-full    object-cover"
                src={Founder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
