import WinnersLogo from "@/widgets/WinnersLogo";
import Video from "./../../assets/winners-tarixi.mp4";

const Recommendations = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5">
          <div
            data-aos="slide-up"
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
                className="w-[300px] h-[200px] bg-gray-700 rounded-sm sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[500px] lg:h-[400px]"
              >
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div data-aos="slide-up" className="flex justify-center items-center">
            <div>
              <div className="text-[#F6F6F8] font-thin my-8 italic lg:text-xl">
                Here how we
              </div>
              <div className="ml-8 lg:my-8 italic flex items-center justify-start">
                {" "}
                <span className="text-[#fc8100] text-8xl italic"> E</span>
                <span className="border-b-2 border-[#fc8100] text-white">
                  xpand with discipline
                </span>
              </div>
              <div>
                <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[10px]">
                  Join our expert-led language learning training center
                  <br /> and unlock fluency in English! Whether you're a
                  beginner or <br />
                  looking to master advanced skills, our interactive courses,
                  native-speaking instructors, and personalized
                  <br />
                  lessons ensure fast and effective learning.
                </p>
              </div>
              <div>
                <div className="mx-auto my-3">
                  <button className="text-gray-700 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
