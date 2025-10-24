import WinnersLogo from "../../widgets/WinnersLogo";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Lesson } from "@/Types/LessonType";
import { useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { baseURL } from "@/lib/baseURL";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useUserStore } from "../Signup/store/user-store";
import { usePopup } from "@/widgets/popup-store/popup-store";

type Props = {
  lesson: Lesson;
};

const LessonCard = ({ lesson }: Props) => {
  const navigate = useNavigate();
  const [viewUpdated, setViewUpdated] = useState(false);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const setLessonConfirmpopup = usePopup(
    (state: any) => state.setLessonConfirmpopup
  );
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [date, setDate] = useState<{
    day: number;
    year: number;
    month: number;
  } | null>(null);

  useEffect(() => {
    if (lesson?.createdDate) {
      const createdAt = new Date(lesson.createdDate);
      setDate({
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
      });
    }
  }, [lesson]);
  const updateView = async () => {
    if (!lesson?.id || viewUpdated) return; // Prevent multiple updates
    const token = window.localStorage.getItem("token");
    if (!token) {
      setSignErroruppopup(
        true,
        "Please login or signup first to see lesson in detail"
      );
    }
    try {
      const response = await fetch(
        `${BASE_URL}/lessons/views/${lesson.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        setSignErroruppopup(
          true,
          "Please login or signup to see Lesson in detail"
        );
      setViewUpdated(true);
    } catch (error) {
      setSignErroruppopup(true, `Something went wrong: ${error}`);
    }
  };

  return (
    <div className="">
      <div onClick={updateView}>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center lg:w-60 w-full sm:w-full md:w-60 hover:scale-102 transition-all duration-300">
            <div className="bg-black/80 rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full">
                {lesson.extension === "mp4" ? (
                  <video
                    muted
                    loop
                    controls
                    className="w-80 h-60 bg-black rounded-lg"
                  >
                    {lesson?.attachPath && lesson?.attachPath.length > 0 ? (
                      <source
                        src={`${baseURL}${lesson?.attachPath}`}
                        type="video/mp4"
                      />
                    ) : (
                      <p className="text-white text-center">
                        No video available
                      </p>
                    )}
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={`${baseURL}${lesson?.attachPath}`}
                    alt="Lesson"
                    className="w-80 h-60 bg-black rounded-lg"
                  />
                )}

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
                    <p className="text-white overflow-hidden h-7">
                      {lesson.author}
                    </p>
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
      </div>

      {currentUser?.id === lesson.profileId ? (
        <div className="flex items-center justify-center mt-1">
          <Button
            onClick={() => setLessonConfirmpopup(true, lesson?.id)}
            className="w-[95%] m-1 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white transition-all duration-300"
          >
            Delete <MdDelete />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-1">
          <div
            onClick={() => navigate(`/lessons/${lesson.id}`)}
            //onClick={updateView}
            className="w-[95%]"
          >
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
