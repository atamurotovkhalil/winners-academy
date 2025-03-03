import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import teacher from "./../../assets/teacher2.avif";
import { Button } from "@/components/ui/button";
import AddLesson from "./AddLesson";
import MyLesson from "./MyLesson";
import MyFavourites from "./MyFavourites";
import MyArticles from "./MyArticles";
import WriteArticle from "./WriteArticle";
import MyProfile from "./MyProfile";
import WinnersLogo from "../ui/WinnersLogo";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { GiHeartPlus } from "react-icons/gi";
import { PiArticleMediumFill } from "react-icons/pi";
import { TfiWrite } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";

import AOS from "aos";
import "aos/dist/aos.css";


const index = () => {
  const [showComponent, setShowComponent] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const RenderComponent = () => {
    switch (showComponent) {
      case 1:
        return <AddLesson />;
      case 2:
        return <MyLesson />;
      case 3:
        return <MyFavourites />;
      case 4:
        return <MyArticles />;
      case 5:
        return <WriteArticle />;
      case 6:
        return <MyProfile />;
      default:
        return <AddLesson />;
    }
  };
  return (
    <div className="lg:mx-16 md:px-10 sm:px-5 px-1">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start justify-between gap-4 my-5 min-h-screen">
        <div
          data-aos="zoom-in"
          className="sm:mx-1  mt-16 py-4 col-span-1 lg:flex lg:sticky sm:hidden hidden md:sticky top-20"
        >

          <div className="flex items-center lg:justify-start md:justify-start justify-center">
            <Card className="w-[300px] border-0 rounded-xs drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
              <div className="flex items-center justify-center">
                <WinnersLogo />
              </div>
              <CardHeader className="flex items-center justify-center">
                <div>
                  <div className="flex items-center border-t border-b border-[#fc8100] justify-center">
                    <img
                      className="w-20 m-1 h-20 rounded-full object-cover"
                      src={teacher}
                    />
                  </div>
                  <CardTitle className="text-center">Ideas</CardTitle>
                  <CardDescription className="text-center">
                    Here Give your Ideas
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  onClick={() => setShowComponent(1)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  Add Lesson <MdAssignment />
                </Button>
                <Button
                  onClick={() => setShowComponent(2)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Lesson <MdAssignmentInd />
                </Button>
                <Button
                  onClick={() => setShowComponent(3)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Favourites <GiHeartPlus />
                </Button>
                <Button
                  onClick={() => setShowComponent(4)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Articles <PiArticleMediumFill />
                </Button>
                <Button
                  onClick={() => setShowComponent(5)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  Write Article <TfiWrite />
                </Button>
                <Button
                  onClick={() => setShowComponent(6)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Profile <FaRegCircleUser />
                </Button>
                <Button
                  //onClick={() => setShowComponent(6)}
                  className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  Logout <TbLogout />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-3 mt-20   md:col-span-2 sm:col-span-1 col-span-1    gap-3">
          <RenderComponent />
        </div>
      </div>
    </div>
  );
};

export default index;
