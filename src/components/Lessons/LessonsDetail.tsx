import { useEffect } from "react";
import TeacherCard from "../Card/UserCard";
import Video from "./../../assets/Lessons1.mp4";
import WinnersLogo from "../ui/WinnersLogo";
import AOS from "aos";
import "aos/dist/aos.css";
import { CiHeart } from "react-icons/ci";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";


const LessonsDetail = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div className="bg-white">
      <div className="mt-10">
        <br />
      </div>
      <div className="lg:mx-16 md:mx-12 sm:mx-2 py-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 min-h-screen">
          <div className="col-span-2">
            <div className="">
              <div className="flex justify-center items-center">
                <div
                  data-aos="fade-right"
                  className=" lg:block md:block flex w-full  items-center justify-center"
                >
                  <div className="w-full flex justify-center items-center">
                    <div>
                      <div className=" lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15  fixed  ">
                        <WinnersLogo />
                      </div>
                      <video
                        autoPlay
                        muted
                        loop
                        controls
                        className="w-screen h-[200px] bg-black  sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[800px] lg:h-[400px]"
                      >
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-right"
                className="flex justify-between  mx-3 items-center"
              >
                <div className="w-full">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-0">
                          <img className="w-6 h-6" src={learning} />
                        </div>
                        <p>Name Of Lesson: Articles</p>
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
                        <p className="m-2 bg-red-500 rounded-sm px-4">
                          Beginner
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="p-2">Produced date: 02.02.2022</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2">
                          <img className="w-6 h-6" src={teachers} />
                        </div>
                        <p>Teacher: John Doe</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2">
                          <CiHeart className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="p-2">23</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold italic">Lesson Description:</p>
                    <p className="text-gray-600 font-thin lg:text-xl md:text-sm sm:text-xl  text-[10px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                      aliquam, purus sit amet luctus venenatis, lectus magna
                      fringilla urnaLorem ipsum dolor sit amet. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit ut aliquam,
                      purus sit amet luctus venenatis, lectus magna fringilla
                      urnaLorem ipsum dolor sit amet. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit ut aliquam, purus sit
                      amet luctus venenatis, lectus magna fringilla urnaLorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit ut aliquam, purus sit amet
                      luctus venenatis, lectus magna fringilla urnaLorem ipsum
                      dolor sit amet. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit ut aliquam, purus sit amet luctus
                      venenatis, lectus magna fringilla urnaLorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit ut aliquam, purus sit amet luctus
                      venenatis, lectus magna fringilla urnaLorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit ut aliquam, purus sit amet luctus
                      venenatis, lectus magna fringilla urnaLorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit ut aliquam, purus sit amet luctus
                      venenatis, lectus magna fringilla urnaLorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit ut aliquam, purus sit amet luctus
                      venenatis, lectus magna fringilla urnaLorem ipsum dolor
                      sit amet.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={teachers} />
                    </div>
                    <p>Comments</p>
                  </div>
                  <div>
                    <p className="font-bold italic">Leave a comment:</p>
                    <div className="mx-auto my-3">
                      <textarea className="w-full h-[200px] border border-black rounded-xs " />
                      <button className="text-gray-300 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-black lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 min-h-screen">
            <div className="lg:sticky md:sticky top-20">
              <TeacherCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsDetail;
