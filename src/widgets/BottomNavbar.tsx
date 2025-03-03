import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImProfile } from "react-icons/im";
import { PiArticleMediumBold } from "react-icons/pi";
import { MdPlayLesson } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { GiHeartPlus } from "react-icons/gi";
import { PiArticleMediumFill } from "react-icons/pi";
import { TfiWrite } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";


const BottomNavbar = () => {

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div className="h-14 flex items-center justify-evenly">
      <div className="flex items-center gap-10  justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className=" rounded-full  flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
              <ImProfile className="text-5xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/myprofile"}>
                <Button
                  className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Profile <FaRegCircleUser />
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
              >
                Logout <TbLogout />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="w-full rounded-full flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
              <PiArticleMediumBold className="text-5xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/myarticles"}>
                <Button className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
                  My Articles <PiArticleMediumFill />
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/writearticle"}>
                <Button
                  className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  Write Article <TfiWrite />
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="w-full rounded-full flex justify-evenly  bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
              <GiHeartPlus className="text-5xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/myfavourites"}>
                <Button
                  className="w-full rounded-xs flex justify-evenly  bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Favourites <PiArticleMediumFill />
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="w-full rounded-full flex justify-evenly  bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
              <MdPlayLesson className="text-5xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/addlesson"}>
                <Button
                  className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  Add Lesson <MdAssignment />
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/mylesson"}>
                <Button
                  className="w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                >
                  My Lesson <MdAssignmentInd />
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BottomNavbar;
