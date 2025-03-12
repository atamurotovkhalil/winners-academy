import { useEffect, useMemo, useState } from "react";
import WinnersLogo from "../ui/WinnersLogo";
import AOS from "aos";
import "aos/dist/aos.css";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { FaCircleUser, FaHeart } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import UserCard from "../Card/UserCard";
import { useArticleStore } from "./store/article-stroe";
import { useUserStore } from "../Signup/store/user-store";
import Comments from "../Lessons/Comments";
import { baseURL } from "@/lib/baseURL";

const CommunityDetail = () => {
  const getArticles = useArticleStore((state) => state.getArticles);
  const articles = useArticleStore((state) => state.articles);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const user = useUserStore((state)=>state.user)
  const getUser = useUserStore((state)=>state.getUser)
  const [likeButton, setLikeButton] = useState(false);
  const { id } = useParams();
  const article = articles.find((art) => art._id === id);
  useEffect(() => {
    getArticles("page", 1);
    if (!currentUser || !user) {
      fetchUserData();
      getUser(article?.userId)
    }
    if (!currentUser) fetchUserData();
    if (id && currentUser?.likedLessonId?.includes(id)) setLikeButton(true);
    if (article?.createdAt) {
    }
    AOS.init({ duration: 1200 });
  }, [getArticles, getUser,  fetchUserData,user, id, currentUser, fetchUserData]);

  const date = useMemo(() => {
    if (article?.createdAt) {
      const createdAt = new Date(article.updatedAt);
      return {
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1, // Months are 0-based, so add 1
        year: createdAt.getFullYear(),
      };
    }
    return { day: 0, month: 0, year: 0 };
  }, [article?.createdAt]);

  console.log(id);
  const handleLike = async () => {
    if (!article || !id || !currentUser) return;

    const isLiked = currentUser.likedLessonId.includes(id);
    const updatedLikes = isLiked ? article.likes - 1 : article.likes + 1;
    const updatedLikedLessons = isLiked
      ? currentUser.likedLessonId.filter((id: any) => id !== id)
      : [...currentUser.likedLessonId, id];

    try {
      const [updateResponse, logResponse] = await Promise.all([
        fetch(`http://localhost:3000/articles/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: updatedLikes }),
        }),
        fetch(`http://localhost:3000/auth/signup/${currentUser._id}`, {
          method: "PUT",
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
      await getArticles("page", 1);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-10">
        <br />
      </div>
      <div className="container mx-auto max-w-6xl py-4  lg:px-16">
      <h2 className="text-2xl font-bold mb-4">Article Detail*</h2>
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
                      <img
                        className="w-screen  h-72 bg-black  sm:w-96 md:h-96 md:w-96 sm:h-96 lg:w-[800px] lg:h-[600px]"
                        src={`${baseURL}${article?.file?.[0]}`}
                      />
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
                        <div className="p-2">
                          <img className="w-6 h-6" src={learning} />
                        </div>
                        <p>Title: {article?.title}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2">
                          <img className="w-6 h-6" src={search} />
                        </div>
                        <p className="p-2">{article?.views}</p>
                      </div>
                    </div>
                    <p className="text-center">_________________________</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="m-2 bg-red-500 rounded-sm px-4">
                          {article?.category}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="p-2">
                          {date.day}.{date.month}.{date.year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2">
                          <FaCircleUser />
                        </div>
                        <p> {article?.author}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={handleLike}>
                          <FaHeart
                            className={`w-6 h-6 ${
                              likeButton ? "text-red-500" : "text-gray-500"
                            }`}
                          />
                        </button>
                        <p>{article?.likes}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold italic">Article Description:</p>
                    <p className="text-gray-600 font-thin lg:text-xl md:text-[16px] sm:text-[16px]  text-[16px]">
                      {article?.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2">
                      <img className="w-6 h-6" src={teachers} />
                    </div>
                  </div>
                  <div>
                    <Comments
                      lessonId={article?._id}
                      userId={currentUser?._id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 min-h-screen">
            <div className="lg:sticky md:sticky top-20">
              <Link to={`/usercommunity/${user?._id}`}>
                <UserCard user={user} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
