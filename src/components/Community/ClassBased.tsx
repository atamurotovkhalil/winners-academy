import CommunityCard from "../Card/CommunityCard";
import { Article } from "@/Types/ArticleType";
import { Link } from "react-router";

interface ClassBasedProps {
  articles: Article[];
}
const ClassBased = ({ articles }: ClassBasedProps) => {
  return (
    <ul className="lg:col-span-3 md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
      {articles.map((article) => (
        <li key={article.id}>
          <Link to={`/community/${article?.id}/${article?.profileId}`}>
            <CommunityCard article={article} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ClassBased;
