import { useEffect } from "react";
import Lenta from "../ui/Lenta";
import WinnersLogo from "../ui/WinnersLogo";
import Video from "./../../assets/Community.mp4";
import Community from "./Community";
import AOS from "aos";
import "aos/dist/aos.css";


const index = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
      }, []);
  return (
    <div>
      <div className="bg-[#fc8100]">
        <div className="lg:mx-16 md:mx-12 sm:mx-1 py-4">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5">
            <div
              data-aos="zoom-in"
              className="flex justify-center items-center"
            >
              <div>
                <div className="text-[#F6F6F8] font-thin my-8 italic lg:text-xl">
                  Here share your ideas
                </div>
                <div className="ml-8 lg:my-8 italic flex items-center justify-start">
                  {" "}
                  <span className="text-black text-5xl italic"> I</span>
                  <span className="border-b-2 border-[#fc8100] text-5xl text-white">
                    deas{" "}
                  </span>
                </div>
                <div>
                  <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[10px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                    <br />
                    aliquam, purus sit amet luctus venenatis, lectus magna
                    <br />
                    fringilla urnaLorem ipsum dolor sit amet.
                  </p>
                </div>
                <div>
                  <div className="mx-auto my-3">
                    <button className="text-gray-300 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-black lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                data-aos="zoom-in"
                className="ml-2.5 lg:block md:block flex   items-center justify-center"
              >
                <div className="">
                  <div className="translate-y-20 lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15  flex  ">
                    <WinnersLogo />
                  </div>
                  <video
                    autoPlay
                    muted
                    loop
                    controls
                    className="w-[300px] h-[200px] bg-black rounded-sm sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[500px] lg:h-[400px]"
                  >
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lenta />
      <Community />
    </div>
  );
};

export default index;
