import { useEffect, useState } from "react";
import WinnersLogo from "../../widgets/WinnersLogo";
import AOS from "aos";
import "aos/dist/aos.css";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { FaHeart } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import UserCard from "../Card/UserCard";
import { useArticleStore } from "./store/article-stroe";
import { useUserStore } from "../Signup/store/user-store";
import Comments from "../Lessons/Comments";
import { baseURL } from "@/lib/baseURL";
import { useCurrentUserStore } from "../Signup/store/currentUser-store";
import { usePopup } from "@/widgets/popup-store/popup-store";
import { useLessonStore } from "../Lessons/store/lessons-store";
import { IoMdDownload } from "react-icons/io";

const CommunityDetail = () => {
  const { articleId } = useParams();
  const { article, getArticle } = useArticleStore();
  const [comment, setComment] = useState("");
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const setLikespopup = usePopup((state: any) => state.setLikespopup);
  const { articleComments, fetchArticleComments } = useLessonStore();
  const [likeButton, setLikeButton] = useState(false);
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });
  const { getUser, user } = useUserStore();
  const { currentUser, fetchUserData } = useCurrentUserStore();

  useEffect(() => {
    if (!articleId) return;
    getArticle(articleId);
    fetchArticleComments(articleId);
  }, [articleId]);

  useEffect(() => {
    if (article?.profileId) getUser(article?.profileId);
  }, [article?.profileId, getUser]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUserData(); 
  }, [fetchUserData]);

  useEffect(() => {
    AOS.init({ duration: 1200 });

    if (article?.createdDate) {
      const createdAt = new Date(article.createdDate);
      setDate({
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
      });
    }
  }, [article?.createdDate]);

  useEffect(() => {
    if (article?.id && currentUser?.likedArticles) {
      setLikeButton(currentUser.likedArticles.some((l) => l.id === article.id));
    }
  }, [article?.id, currentUser?.likedArticles]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSignErroruppopup(true, "Please login or signup to add favourites");
        return;
      }
      const res = await fetch(`${BASE_URL}/articles/liked`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: currentUser.id,
          articleId: articleId,
        }),
      });

      if (!res.ok) {
        setSignErroruppopup(true, "Error adding to favourite lists");
        return;
      }
      setLikeButton(true);
      setLikespopup(true);
      await Promise.all([fetchUserData(), getArticle(articleId)]);
    } catch (error) {
      setSignErroruppopup(true, "Something went wrong", error);
    }
  };
  const sortedComments = [...articleComments].sort(
    (a, b) =>
      new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
  );

  const sendComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSignErroruppopup(true, "Please login or signup first");

      return;
    }
    if (!comment.trim()) return;

    try {
      // If 10 comments already exist, delete the oldest first
      if (articleComments.length >= 10) {
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
            setSignErroruppopup(true, "Error deleting oldest comment");

            return;
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
          articleId,
          profileId: currentUser?.id,
          commentBody: comment,
        }),
      });

      if (!response.ok) {
        setSignErroruppopup(
          true,
          "An error occurred while submitting the comment"
        );
      } else {
        setComment("");
        await fetchArticleComments(articleId); // Refresh comments
      }
    } catch (error) {
      setSignErroruppopup(
        true,
        `An error occurred while submitting the comment: ${error}`
      );
    }
  };
  const handleFileOpen = (e: any, filePath: any) => {
    if (!filePath) return;

    const fileExtension = filePath.split(".").pop().toLowerCase();

    // List of file types that can be viewed in browser
    const viewableTypes = ["pdf", "jpg", "jpeg", "png", "gif", "mp4"];

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
    <div className="bg-white min-h-screen">
      <div className="mt-14" />
      <div className="container mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          Article Detail*
        </h2>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="col-span-2">
            <div className="flex justify-center items-center">
              <div data-aos="fade-right" className="w-full flex justify-center">
                <div>
                  <div className="fixed lg:-translate-x-15 md:-translate-x-15 sm:-translate-x-15">
                    <WinnersLogo />
                  </div>
                  {article?.extension === "mp4" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className="w-screen h-[200px] bg-black sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[700px] lg:h-[400px]"
                    >
                      <source
                        src={`${baseURL}${article?.filePath}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={`${baseURL}${article?.filePath}`}
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
                  to={`${baseURL}download/${article?.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleFileOpen(e, article?.filePath)}
                  className="flex px-2 items-center justify-between "
                >
                  Download File
                </Link>
              </div>
            </div>

            {/* Lesson Info */}
            <div data-aos="fade-right" className="my-3 px-1 sm:px-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" src={learning} />
                  <p className="text-sm sm:text-base">
                    Title: {article?.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" src={search} />
                  <p className="text-sm sm:text-base">{article?.views}</p>
                </div>
              </div>

              <hr className="my-2 border-gray-300" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="bg-red-500 text-white text-xs sm:text-sm rounded px-3 py-1">
                  {article?.category}
                </p>
                <p className="text-xs sm:text-sm text-gray-700">
                  {date.day}.{date.month}.{date.year}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <img className="w-6 h-6" src={teachers} />
                  <p className="text-sm sm:text-base">
                    Author: {article?.author}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handleLike}>
                    <FaHeart
                      className={`w-6 h-6 ${
                        likeButton ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <p className="text-sm">{article?.likes}</p>
                </div>
              </div>

              <p className="font-bold italic mt-3 text-sm sm:text-base">
                Lesson Description:
              </p>
              <p
                className="text-gray-600 text-sm sm:text-base mt-1"
                dangerouslySetInnerHTML={{ __html: article?.description ?? "" }}
              />
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <p className="font-bold italic text-base sm:text-lg mb-2">
                Comments:
              </p>
              {currentUser &&
                sortedComments.map((comments, id) => (
                  <Comments key={id} comments={comments} />
                ))}

              <p className="font-bold italic text-base sm:text-lg mt-4">
                Leave a comment:
              </p>
              <div className="mx-auto my-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-[100px] border border-gray-400 rounded-md p-2 text-sm sm:text-base resize-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Write your comment..."
                />
                <button
                  onClick={sendComment}
                  className="bg-black text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-gray-800 transition mt-2"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-1 mt-6 md:mt-0">
            <div className="md:sticky top-20">
              {currentUser ? <Link to={`/teacherdetail/${article?.profileId}`}>
                <UserCard user={user} />
              </Link> : <p className="mx-5">Please login or signup to see creator inf.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
