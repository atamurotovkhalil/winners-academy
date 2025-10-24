import { useEffect } from "react";
import Lenta from "../ui/Lenta";
import Teachers from "./Teachers";
import WinnersLogo from "../../widgets/WinnersLogo";
import Video from "./../../assets/Teachers.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

const index = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div>
      <div>
        <div className="bg-[#fc8100]">
          <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5">
              <div className="flex justify-center items-center">
                <div
                  data-aos="flip-right"
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
                data-aos="flip-right"
                className="flex justify-center items-center"
              >
                <div>
                  <div className="text-[#F6F6F8] font-thin my-8 italic lg:text-xl">
                    Get personalized with our
                  </div>
                  <div className="ml-8 lg:my-8 italic flex items-center justify-start">
                    {" "}
                    <span className="text-black text-5xl italic"> T</span>
                    <span className="border-b-2 border-[#fc8100] text-5xl text-white">
                      utors{" "}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[16px]">
                      At our language training center, we take pride in our team
                      <br />
                      of dedicated and experienced tutors who are committed to
                      <br />
                      helping students achieve English proficiency. Whether
                      <br />
                      you're preparing for IELTS, improving your academic
                      <br />
                      writing, or mastering spoken English, our tutors provide
                      <br />
                      personalized support and expert guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Lenta />
        <Teachers />
      </div>
    </div>
  );
};

export default index;
