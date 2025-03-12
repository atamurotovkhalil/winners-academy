import WinnersLogo from "../ui/WinnersLogo";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router";
import { Lesson } from "@/Types/LessonType";
import { useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { baseURL } from "@/lib/baseURL";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useUserStore } from "../Signup/store/user-store";
import { usePopup } from "@/widgets/popup-store/popup-store";
import writing from "./../../assets/writing.png";

type Props = {
  lesson: Lesson;
};

const Cards = ({ lesson }: Props) => {
  const [viewUpdated, setViewUpdated] = useState(false);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const setLessonConfirmpopup = usePopup(
    (state: any) => state.setLessonConfirmpopup
  );

  const [date, setDate] = useState<{
    day: number;
    year: number;
    month: number;
  } | null>(null);

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);

  useEffect(() => {
    if (lesson?.createdAt) {
      const createdAt = new Date(lesson.createdAt);
      setDate({
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1, // Months are 0-based
        year: createdAt.getFullYear(),
      });
    }
  }, [lesson]);
  const updateView = async () => {
    if (!lesson?._id || viewUpdated) return; // Prevent multiple updates

    try {
      await fetch(`http://localhost:3000/lessons/${lesson._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ views: lesson.views + 1 }),
      });
      setViewUpdated(true); // Ensure it only updates once
    } catch (error) {
      console.error("Error updating lesson views:", error);
    }
  };

  return (
    <div
      className="lg:border-2 md:border-1 lg:w-60 border-t border-b border-[#fc8100] rounded-lg shadow-lg hover:scale-102 transition-all duration-300"
      data-aos="slide-up"
    >
      <Link to={`/lessons/${lesson._id}`} onClick={updateView}>
        <div className="flex items-center justify-center p-2">
          <div className="flex items-center justify-center lg:w-60 w-full sm:w-full md:w-60 hover:scale-102 transition-all duration-300">
            <div className="bg-black/80 rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full">
                <video
                  muted
                  loop
                  controls
                  className="w-80 h-60 bg-black rounded-lg"
                >
                  {lesson?.file && lesson?.file.length > 0 ? (
                    <source
                      src={`${baseURL}${lesson?.file[0]}`}
                      type="video/mp4"
                    />
                  ) : (
                    <p className="text-white text-center">No video available</p>
                  )}
                  Your browser does not support the video tag.
                </video>

                <div className="absolute top-2 left-2 lg:w-31 md:w-31 w-20">
                  <WinnersLogo />
                </div>
              </div>

              <div className="p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6"
                      src={learning}
                      alt="Learning icon"
                    />
                    <p className="font-bold overflow-hidden">{lesson.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src={search} alt="Search icon" />
                    <p>{lesson.views}</p>
                  </div>
                </div>

                <p className="text-center my-2">_________________________</p>

                <div className="flex items-center justify-between">
                  <p className="m-2 bg-red-500 text-white rounded-sm px-4">
                    {lesson.category}
                  </p>
                  {date && (
                    <p className="text-sm text-white">
                      {date.day}.{date.month}.{date.year}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6"
                      src={teachers}
                      alt="Teacher icon"
                    />
                    <p className="hidden sm:hidden lg:flex md:flex text-white"></p>
                    <p className="text-white overflow-hidden h-7">{lesson.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiHeart className="w-6 h-6 text-red-500" />
                    <p className="text-white">{lesson.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {currentUser?._id === lesson.userId ? (
        <div className="flex items-center justify-center mt-1">
          <Button
            onClick={() => setLessonConfirmpopup(true, lesson?._id)}
            className="w-[95%] m-1 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white transition-all duration-300"
          >
            Delete <MdDelete />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-1">
          <Link to={`/lessons/${lesson._id}`} onClick={updateView} className="w-[95%]">
            <Button
              //onClick={() => setLessonConfirmpopup(true, lesson?._id)}
              className="w-[95%] m-1 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white transition-all duration-300"
            >
              See In Detail
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cards;
