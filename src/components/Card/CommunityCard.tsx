import WinnersLogo from "../../widgets/WinnersLogo";
import { CiHeart } from "react-icons/ci";
import learning from "./../../assets/learning.png";
import search from "./../../assets/search.png";
import teachers from "./../../assets/teachers.png";
import { Article } from "@/Types/ArticleType";
import { useMemo, useState } from "react";
import { baseURL } from "@/lib/baseURL";
import { usePopup } from "@/widgets/popup-store/popup-store";

type Prop = {
  article: Article;
};

const CommunityCard = ({ article }: Prop) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [viewUpdated, setViewUpdated] = useState(false);
  const setSignErroruppopup = usePopup(
      (state: any) => state.setSignErroruppopup
    );
  

  const date = useMemo(() => {
    if (article?.updatedAt) {
      const createdAt = new Date(article.updatedAt);
      return {
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
      };
    }
    return { day: 0, month: 0, year: 0 };
  }, [article?.updatedAt]);

  const updateView = async () => {
    if (!article?.id || viewUpdated) return; // Prevent multiple updates
    const token = window.localStorage.getItem("token")
    if(!token){
      setSignErroruppopup(true, "Please login or signup first to see article in detail")
    }

    try {
      await fetch(`${BASE_URL}/articles/views/${article.id}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" },
      });
      setViewUpdated(true); // Ensure it only updates once
    } catch (error) {
      setSignErroruppopup(true, "Error updating lesson views:", error)
    }
  };

  return (
    <div
      data-aos="slide-up"
      className="lg:border-1 lg:w-60 w-full md:w-60 md:border-1  border border-[#fc8100] rounded-lg hover:shadow-lg transition-all duration-300"
    >
      <div onClick={updateView}>
        <div className="flex items-center justify-center">
          <div className="lg:w-60 w-full md:w-60 drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.5)] hover:scale-102 transition-all duration-300">
            <div className="w-full relative">
              <img
                className="w-full h-60 object-cover rounded-t-lg"
                src={
                  article?.attachPath
                    ? `${baseURL}${article?.attachPath}`
                    :  "/default-avatar.png"
                }
                alt="Article Image"
              />
              <div className="absolute top-0 left-0 lg:w-32 md:w-32 w-20">
                <WinnersLogo />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" src={learning} alt="Learning icon" />
                  <p className="font-semibold">{article?.title}</p>
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
                  <img className="w-6 h-6" src={teachers} alt="Teachers icon" />
                  <p className="text-sm text-gray-700">{article.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CiHeart className="w-6 h-6 text-red-500" />
                  <p>{article?.likes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
