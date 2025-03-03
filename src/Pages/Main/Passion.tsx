import Autoplay from "embla-carousel-autoplay";
import { FaStar } from "react-icons/fa";
import Recommendet from "./../../assets/passion.jpeg";
import w from "../../assets/sticker.png";
import A from "../../assets/sticker1.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
const Passion = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <div>
      <div className="bg-[#fc8100]">
        <div className="lg:mx-16 md:mx-12 sm:mx-2 py-4">
          <Carousel
            data-aos="slide-up"
            plugins={[plugin.current]}
            className=" max-w-full bg-[#fc8100] sm:flex lg:block md:block flex justify-center border-0 h-56"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className=" h-56 max-w-full ">
              <CarouselItem className="ml-2">
                <div className="p-1 border-0  bg-[#fc8100]">
                  <Card className="bg-[#fc8100] border-0 flex items-center justify-center">
                    <CardContent className="bg-[#fc8100] h-40 w-full text-center  aspect-square ">
                      <div className="flex justify-center items-center my-3">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <p className="text-center font-thin sm:text-[12px] text-[12px] md:text-[14px] lg:text-[16px]">
                        “Kate’s courses are a game changer. She’s thorough,
                        organized, and explains things in a <br /> no-nonsense
                        way that makes it easy for anyone—beginners to
                        experts—to learn <br />
                        something from her courses and take their game to the
                        next level.”
                      </p>
                      <p className="text-center font-thin sm:text-[12px] text-[12px] md:text-[14px] lg:text-[16px] text-gray-700 my-3">
                        James Brown, Influencer
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="ml-2">
                <div className="p-1 border-0  bg-[#fc8100]">
                  <Card className="bg-[#fc8100] border-0 flex items-center justify-center">
                    <CardContent className="bg-[#fc8100] h-40 w-full text-center  aspect-square ">
                      <div className="flex justify-center items-center my-3">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <p className="text-center font-thin sm:text-[12px] text-[12px] md:text-[14px] lg:text-[16px]">
                        “Kate’s courses are a game changer. She’s thorough,
                        organized, and explains things in a <br /> no-nonsense
                        way that makes it easy for anyone—beginners to
                        experts—to learn <br />
                        something from her courses and take their game to the
                        next level.”
                      </p>
                      <p className="text-center font-thin sm:text-[12px] text-[12px] md:text-[14px] lg:text-[16px] text-gray-700 my-3">
                        James Brown, Influencer
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="bg-black">
        <div className="lg:mx-16 md:mx-12 sm:mx-1 py-4">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5">
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
                  src={Recommendet}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <div className="my-8">
                  <span className="text-[#F6F6F8] border-b border-[#fc8100]  font-thin my-8 italic lg:text-xl">
                    A Passion for Teaching
                  </span>
                </div>
                <div>
                  <p className="text-gray-300 font-thin lg:text-xl md:text-sm sm:text-xl  text-[10px]">
                    A deep-dive on the Instagram algorythm, hashtags,
                    <br /> content strategy, and branding.
                  </p>
                </div>
                <div>
                  <div className="mx-auto my-3">
                    <button className="text-gray-700 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                      About W/A
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passion;
