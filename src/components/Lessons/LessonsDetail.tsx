import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaHeart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import TeacherCard from "../Card/UserCard";
import WinnersLogo from "../ui/WinnersLogo";
import { useLessonStore } from "./store/lessons-store";
import { useUserStore } from "../Signup/store/user-store";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import Comments from "./Comments";
import { baseURL } from "@/lib/baseURL";
import { usePopup } from "@/widgets/popup-store/popup-store";

const LessonsDetail = () => {
  const { lessonId } = useParams();
  const lesson = useLessonStore((state) => state.lesson);
  const getLesson = useLessonStore((state) => state.getLesson);
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const setLikespopup = usePopup((state: any) => state.setLikespopup);

  const [likeButton, setLikeButton] = useState(false);
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });
  useEffect(() => {
    if (lesson) {
      getUser(lesson.userId);
    }
  }, [getUser]);
  useEffect(() => {
    AOS.init({ duration: 1200 });
    if (!currentUser) {
      fetchUserData();
    }

    if (lessonId && currentUser?.likedLessonId?.includes(lessonId))
      setLikeButton(true);
    if (lesson?.createdAt) {
      const createdAt = new Date(lesson?.createdAt);

      setDate({
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
      });
    }
  }, [, getUser, lessonId, currentUser, fetchUserData]);
  useEffect(() => {
    if (lessonId) getLesson(lessonId);
  }, [getLesson, lessonId]);
  useEffect(() => {
    if (lesson) {
      getUser(lesson.userId);
    }
  }, [getUser, lesson]);
  console.log(lesson);
  console.log(currentUser);
  const handleLike = async () => {
    if (!lesson || !lessonId || !currentUser) return;

    const isLiked = currentUser.likedLessonId.includes(lessonId);
    console.log(isLiked);
    const updatedLikes = isLiked ? lesson.likes - 1 : lesson.likes + 1;
    if (!isLiked) setLikespopup();
    const updatedLikedLessons = isLiked
      ? currentUser.likedLessonId.filter((id) => id !== lessonId)
      : [...currentUser.likedLessonId, lessonId];

    try {
      const [updateResponse, logResponse] = await Promise.all([
        fetch(`http://localhost:3000/lessons/${lessonId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: updatedLikes }),
        }),
        fetch(`http://localhost:3000/auth/signup/${currentUser._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likedLessonId: updatedLikedLessons }),
        }),
      ]);

      if (!updateResponse.ok || !logResponse.ok) {
        console.error("Error occurred while updating data.");
        return;
      }

      setLikeButton(!isLiked);
      fetchUserData();
      await getLesson(lessonId);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-14" />
      <div className="container mx-auto max-w-6xl py-4 px-0 lg:px-16">
      <h2 className="text-2xl font-bold mb-4">Lesson Detail*</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 min-h-screen">
          <div className="col-span-2">
            <div className="flex justify-center items-center">
              <div data-aos="fade-right" className="w-full flex justify-center">
                <div>
                  <div className="fixed lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15">
                    <WinnersLogo />
                  </div>
                  <video
                    autoPlay
                    muted
                    loop
                    controls
                    className="w-screen h-[200px] bg-black sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[800px] lg:h-[400px]"
                  >
                    {lesson?.file?.[0] ? (
                      <source
                        src={`${baseURL}${lesson.file[0]}`}
                        type="video/mp4"
                      />
                    ) : (
                      <p className="text-white text-center">
                        No video available
                      </p>
                    )}
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            <div data-aos="fade-right" className="my-3 px-2">
              <div className="flex  items-center justify-between">
                <div className="flex lg:m-2 gap-2 items-center">
                  <img className="w-6 h-6" src={learning} />
                  <p>Title: {lesson?.title}</p>
                </div>
                <div className="flex gap-3 lg:my-3 items-center">
                  <img className="w-6 h-6" src={search} />
                  <p className=""> {lesson?.views}</p>
                </div>
              </div>
              <p className="text-center">_________________________</p>
              <div className="flex items-center justify-between">
                <p className="my-2 bg-red-500 rounded-sm px-4">
                  {lesson?.category}
                </p>
                <p>
                  {date.day}.{date.month}.{date.year}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="w-6 h-6 m-1" src={teachers} />
                  <p className="hidden sm:hidden md:flex lg:flex">Author: </p>
                  {lesson?.author}
                </div>
                <div className="flex items-center gap-3">
                  <p className="hidden sm:hidden md:flex lg:flex">+ Add </p>
                  <button onClick={handleLike}>
                    <FaHeart
                      className={`w-6 h-6 ${
                        likeButton ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <p>{lesson?.likes}</p>
                </div>
              </div>
              <p className="font-bold italic">Lesson Description:</p>
              <p
                className="text-gray-600 font-thin text-sm"
                dangerouslySetInnerHTML={{ __html: lesson?.description ?? "" }}
              />
            </div>
            <div className="">
              <Comments lessonId={lesson?._id} userId={currentUser?._id} />
            </div>
          </div>
          <div className="relative col-span-1 min-h-screen">
            <div className="lg:sticky md:sticky top-20">
              <Link to={`/teacherdetail/${user?._id}`}>
                <TeacherCard user={user} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsDetail;
