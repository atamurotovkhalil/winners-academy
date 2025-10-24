import { useEffect } from "react";
import Video from "./../../assets/Lessons1.mp4";
import WinnersLogo from "../../widgets/WinnersLogo";
import Lessons from "./Lessons";
import Lenta from "../ui/Lenta";
import AOS from "aos";
import "aos/dist/aos.css";

const index = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div>
      <div className="bg-[#fc8100]">
        <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5">
            <div className="flex justify-center items-center">
              <div
                data-aos="fade-right"
                className="ml-2.5 lg:block md:block flex   items-center justify-center"
              >
                <div className="">
                  <div className="translate-y-20 lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15  flex  ">
                    <WinnersLogo />
                  </div>
                  <video
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
            <div
              data-aos="fade-right"
              className="flex justify-center items-center"
            >
              <div>
                <div className="text-[#F6F6F8] font-thin my-8 italic lg:text-xl">
                  Get personalized learning
                </div>
                <div className="ml-8 lg:my-8 italic flex items-center justify-start">
                  {" "}
                  <span className="text-black text-5xl italic"> L</span>
                  <span className="border-b-2 border-[#fc8100] text-5xl text-white">
                    essons{" "}
                  </span>
                </div>
                <div>
                  <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[10px]">
                    At our language training center, we offer a variety of
                    <br />
                    structured lessons designed to help students master 
                    <br />
                    English efficiently. Whether you are preparing for IELTS, 
                    <br />
                    improving your general communication skills, or focusing on 
                    <br />
                    academic writing, our lessons are tailored to meet diverse learning
                    needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lenta />
      <Lessons />
    </div>
  );
};

export default index;
