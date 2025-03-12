import { Link } from "react-router";
import WinnersLogo from "../ui/WinnersLogo";
import { CiHeart } from "react-icons/ci";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { FaRegComment } from "react-icons/fa6";
import { Article } from "@/Types/ArticleType";
import { useEffect, useMemo, useState } from "react";
import { baseURL } from "@/lib/baseURL";
import writing from "./../../assets/writing.png";
import { useUserStore } from "../Signup/store/user-store";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useArticleStore } from "../Community/store/article-stroe";
import { usePopup } from "@/widgets/popup-store/popup-store";

type Prop = {
  article: Article;
};

const CommunityCard = (prop: Prop) => {
  const { article } = prop;
  const currentUser = useUserStore((state: any) => state.currentUser);
   const [viewUpdated, setViewUpdated] = useState(false);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const getArticles = useArticleStore((state) => state.getArticles);
  const deletepopup = usePopup((state: any) => state.deletepopup);
  const setConfirmpopup = usePopup((state: any) => state.setConfirmpopup);

  useEffect(() => {
    getArticles("page", 1);
  }, [getArticles]);
  useEffect(() => {
    if (deletepopup) {
    }
  }, [deletepopup]); // Runs only when deletepopup changes

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);
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
  }, [article?.createdAt]); // Only recompute when createdAt changes

  const updateView = async () => {
    if (!article?._id || viewUpdated) return; // Prevent multiple updates

    try {
      await fetch(`http://localhost:3000/articles/${article._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ views: article.views + 1 }),
      });
      setViewUpdated(true); // Ensure it only updates once
    } catch (error) {
      console.error("Error updating lesson views:", error);
    }
  };
  return (
    <div
      data-aos="slide-up"
      className="lg:border-2 md:border-2 border-t border-b border-[#fc8100] rounded-lg hover:shadow-lg transition-all duration-300"
    >
      <Link className="" to={`/communitydetail/${article._id}`} onClick={updateView}>
        <div className="flex items-center justify-center">
          <div className="lg:w-90 w-full sm:w-full md:w-90 drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.5)] object-cover hover:scale-102 flex items-center justify-center transition-all duration-300">
            <div>
              <div className="w-full relative">
                <img
                  className="w-full h-60 object-cover rounded-t-lg"
                  src={
                    article.file.length === 0
                      ? writing
                      : `${baseURL}${article?.file?.[0]}`
                  }
                  alt="Article Image"
                />
                <div className="absolute top-4 left-4 lg:w-32 md:w-32 w-20">
                  <WinnersLogo />
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6"
                      src={learning}
                      alt="Learning icon"
                    />
                    <p className="font-semibold overflow-hidden">
                      {" "}
                      {article?.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src={search} alt="Search icon" />
                    <p className="font-semibold">{article?.views}</p>
                  </div>
                </div>
                <p className="text-center my-2 text-gray-400">
                  _________________________
                </p>
                <div className="flex items-center justify-between">
                  <p className="m-2 bg-red-500 rounded-sm px-4 text-white">
                    {article?.category}
                  </p>
                  <p className="p-2 text-gray-600">
                    {date.day}.{date.month}.{date.year}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6"
                      src={teachers}
                      alt="Teachers icon"
                    />
                    <p className="hidden lg:block md:block"> </p>
                    <p className="text-sm text-gray-700 overflow-hidden">
                      {article.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiHeart className="w-6 h-6 text-red-500" />
                    <p>{article?.likes}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-gray-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {currentUser?._id === article.userId ? (
        <div className="flex items-center justify-center mt-2">
          <Button
            onClick={() => {
              setConfirmpopup(true, article._id);
            }}
            className="w-[90%] m-2 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white"
          >
            Delete <MdDelete />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-2">
          <Link className="w-[95%]" to={`/communitydetail/${article._id}`}>
            <Button
              // onClick={() => {
              //   setConfirmpopup(true, article._id);
              // }}
              className="w-[95%] m-2 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white"
            >
              See In Detail
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommunityCard;
