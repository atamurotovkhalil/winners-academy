import Cards from "./../Card/LessonCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect } from "react";
import { useLessonStore } from "./../Lessons/store/lessons-store";

const MyFavourites = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);

  useEffect(() => {
    if (!lessons || !currentUser) {
      fetchUserData();
      getLessons("page", 1);
    }
  }, [fetchUserData, getLessons, lessons,  currentUser]);
  const less = lessons.filter((less) =>
    currentUser?.likedLessonId.some((lik) => less._id === lik)
  );
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favourites*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {less.map((lesson) => (
            <Cards key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
      <div className="my-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MyFavourites;
