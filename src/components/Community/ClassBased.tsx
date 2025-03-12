import { useEffect, useMemo } from "react";
import CommunityCard from "../Card/CommunityCard";
import { useArticleStore } from "./store/article-stroe";

const ClassBased = () => {
  const articles = useArticleStore((state) => state.articles);
  const getArticles = useArticleStore((state) => state.getArticles);
  useEffect(() => {
    // Check to prevent unnecessary re-fetching
    getArticles("page", 1);
  }, [articles.length, getArticles]);
  const memoizedArticles = useMemo(() => articles, [articles]);
  const freearticles = memoizedArticles.filter(
    (art) => art.category === "classbased"
  );
  return (
    <ul className="lg:col-span-3 md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
      {freearticles.map((article) => (
        <li key={article._id}>
          <CommunityCard article={article} />
        </li>
      ))}
    </ul>
  );
};

export default ClassBased;
