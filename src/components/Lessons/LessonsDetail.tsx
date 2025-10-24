import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaHeart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import UserCard from "../Card/UserCard";
import WinnersLogo from "../../widgets/WinnersLogo";
import { useLessonStore } from "./store/lessons-store";
import { useUserStore } from "../Signup/store/user-store";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import Comments from "./Comments";
import { baseURL } from "@/lib/baseURL";
import { usePopup } from "@/widgets/popup-store/popup-store";
import { useCurrentUserStore } from "../Signup/store/currentUser-store";
import { IoMdDownload } from "react-icons/io";


const LessonsDetail = () => {
  const { lessonId } = useParams();
  const { lessonComments, fetchLessonComments } = useLessonStore();
  const [comment, setComment] = useState("");
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const { lesson, getLesson } = useLessonStore();
  const setLikespopup = usePopup((state: any) => state.setLikespopup);
  const [likeButton, setLikeButton] = useState(false);
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });
  const { getUser, user } = useUserStore();
  const { currentUser, fetchUserData } = useCurrentUserStore();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    if (!lessonId) return;
    getLesson(lessonId);
    fetchLessonComments(lessonId);
  }, [lessonId]);

  useEffect(() => {
    if (lesson?.profileId) {
      getUser(lesson.profileId);
    }
  }, [lesson?.profileId]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    if (lesson?.createdDate) {
      const createdAt = new Date(lesson.createdDate);
      setDate({
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
      });
    }
  }, [lesson?.createdDate]);

  useEffect(() => {
    if (lesson?.id && currentUser?.likedLessons) {
      setLikeButton(currentUser.likedLessons.some((l) => l.id === lesson.id));
    }
  }, [lesson?.id, currentUser?.likedLessons]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSignErroruppopup(true, "Please login or signup to add favourites");
        return;
      }

      const res = await fetch(`${BASE_URL}/lessons/liked`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: Number(currentUser?.id),
          lessonId: Number(lesson?.id),
        }),
      });

      if (!res.ok) {
        setSignErroruppopup(true, "Error adding to favourites lists");

        return;
      }
      setLikeButton(true);
      setLikespopup(true);

      await Promise.all([fetchUserData(), getLesson(lessonId)]);
    } catch (error) {
      setSignErroruppopup(true, `Network error:, ${error}`);
    }
  };

  const sortedComments = [...lessonComments].sort(
    (a, b) =>
      new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
  );

  const sendComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSignErroruppopup(
        true,
        "Please login or signup first to leave comment"
      );
      return;
    }
    if (!comment.trim()) return;

    try {
      // If 10 comments already exist, delete the oldest first
      if (lessonComments.length >= 10) {
        const oldestCommentId = sortedComments[0]?.id;
        if (oldestCommentId) {
          const deleteResponse = await fetch(
            `${BASE_URL}/comments/${oldestCommentId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!deleteResponse.ok) {
            setSignErroruppopup(true, "Error occured during deleting comment");
          }
        }
      }

      // Then add the new comment
      const response = await fetch(`${BASE_URL}/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lessonId,
          profileId: currentUser?.id,
          commentBody: comment,
        }),
      });

      if (!response.ok) {
        setSignErroruppopup(
          true,
          `An error occurred while submitting the comment`
        );
      } else {
        setComment("");
        await fetchLessonComments(lessonId); // Refresh comments
      }
    } catch (error) {
      setSignErroruppopup(true, `Network error:, ${error}`);
    }
  };

  const handleFileOpen = (e: any, filePath: any) => {
    if (!filePath) return;

    const fileExtension = filePath.split(".").pop().toLowerCase();

    // List of file types that can be viewed in browser
    const viewableTypes = ["pdf", "jpg", "jpeg", "png", "gif"];

    // If file type is not viewable → force download
    if (!viewableTypes.includes(fileExtension)) {
      e.preventDefault(); // Stop default behavior
      const link = document.createElement("a");
      link.href = `${baseURL}download/${filePath}`;
      link.download = filePath.split("/").pop(); // Suggest filename
      link.click();
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-14" />
      <div className="container mx-auto max-w-6xl py-4 px-0 lg:px-16">
        <h2 className="text-2xl font-bold ml-2 mb-4">Lesson Detail*</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 min-h-screen">
          {/* Left Section */}
          <div className="col-span-2">
            <div className="flex justify-center items-center">
              <div data-aos="fade-right" className="w-full flex justify-center">
                <div>
                  <div className="fixed lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15">
                    <WinnersLogo />
                  </div>
                  {lesson?.extension === "mp4" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className="w-screen h-[200px] bg-black sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[700px] lg:h-[400px]"
                    >
                      <source
                        src={`${baseURL}${lesson?.attachPath}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={`${baseURL}${lesson?.attachPath}`}
                      alt="Lesson"
                      className="w-[800px] h-[200px] bg-black sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[700px] lg:h-[400px]"
                    />
                  )}
                </div>
              </div>
            </div>
            <div data-aos="fade-right" className="flex">
              <div
                className="flex  hover:bg-[#fc8100] rounded-xs drop-shadow-[-1px_1px_1px_rgba(0,0,0,1)]
                object-cover items-center gap-3 my-3 py-2  bg-[#d76d00] justify-start"
              >
                <IoMdDownload size={24} className="" />
                <Link
                  to={`${baseURL}download/${lesson?.attachPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleFileOpen(e, lesson?.attachPath)}
                  className="flex items-center justify-between "
                >
                  Download File
                  <p className="text-red-700">({lesson?.extension})</p>
                </Link>
              </div>
            </div>

            {/* Lesson Info */}
            <div data-aos="fade-right" className="my-3 px-2">
              <div className="flex items-center justify-between">
                <div className="flex lg:m-2 gap-2 items-center">
                  <img className="w-6 h-6" src={learning} />
                  <p>Title: {lesson?.title}</p>
                </div>
                <div className="flex gap-3 lg:my-3 items-center">
                  <img className="w-6 h-6" src={search} />
                  <p>{lesson?.views}</p>
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
            <p className="font-bold  italic">Comments:</p>
            {/* Comments */}
            {currentUser &&
              sortedComments.map((comments, id) => (
                <div key={id}>
                  <Comments comments={comments} />
                </div>
              ))}
            <p className="font-bold italic">Leave a comment:</p>
            <div className="mx-auto my-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-[100px] border border-black rounded-xs p-2"
              />
              <button
                onClick={sendComment}
                className="text-gray-300 lg:text-[16px] md:text-[16px] text-[12px] rounded-xs hover:bg-gray-300 hover:text-black bg-black lg:py-3 lg:px-5 md:py-3 md:px-5 py-2 px-3 my-3"
              >
                Send
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative col-span-1 min-h-screen">
            <div className="lg:sticky md:sticky top-20">
              <Link to={`/teacherdetail/${lesson?.profileId}`}>
                <UserCard user={user} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsDetail;
