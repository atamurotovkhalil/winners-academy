import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useLessonStore } from "./../Lessons/store/lessons-store";
import { useCurrentUserStore } from "../Signup/store/currentUser-store";
import { Lesson } from "@/Types/LessonType";
import { Link } from "react-router";
import LessonCard from "./../Card/LessonCard";
import { Article } from "@/Types/ArticleType";
import CommunityCard from "../Card/CommunityCard";

interface FindLesson {
  title: string;
  author: string;
  category: string;
}
const MyFavourites = () => {
  const [showLessons, setShowLessons] = useState(true)
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [lesson] = useState<FindLesson>({
    title: "",
    author: "",
    category: "All",
  });
  const currentUser = useCurrentUserStore((state: any) => state.currentUser);
  const fetchUserData = useCurrentUserStore(
    (state: any) => state.fetchUserData
  );
  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);

  useEffect(() => {
    if (!lessons || !currentUser) {
      fetchUserData();
    }
  }, [fetchUserData, getLessons, lessons, currentUser]);
  useEffect(() => {
    getLessons(lesson, page, size);
  }, [lesson, page, size, getLessons]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favourites*</h2>
      <div className="flex items-center gap-2 m-2 justify-around">
        <button 
        onClick={()=>setShowLessons(true)}
        className={showLessons? "w-full bg-black  text-white py-3 mt-4 rounded-lg font-bold" : "w-full hover:bg-gray-900 bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"}
        >Lessons</button>
        <button 
        onClick={()=>setShowLessons(false)}
        className={!showLessons? "w-full bg-black  text-white py-3 mt-4 rounded-lg font-bold" : "w-full hover:bg-gray-900 bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"}>Articles</button>
      </div>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        {showLessons?  <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
          {currentUser.likedLessons?.map((lesson: Lesson) => (
            <li key={lesson.id}>
              <Link to={`/lessons/${lesson?.id}/${lesson?.profileId}`}>
                <LessonCard lesson={lesson} />
              </Link>
            </li>
          ))}
        </ul> : 
        <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
          {currentUser.likedArticles?.map((article: Article) => (
            <li key={article.id}>
              <Link to={`/community/${article?.id}/${article?.profileId}`}>
                <CommunityCard article={article} />
              </Link>
            </li>
          ))}
        </ul>}
      </div>
      <div className="my-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getLessons(lesson, page - 1, size);
                  }
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="disabled">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPage(page + 1);
                  getLessons(lesson, page + 1, size);
                }}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MyFavourites;
