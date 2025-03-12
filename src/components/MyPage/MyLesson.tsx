import Cards from "../Card/LessonCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLessonStore } from "../Lessons/store/lessons-store";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUserStore } from "../Signup/store/user-store";

const MyLesson = () => {
  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  useEffect(() => {
    AOS.init({ duration: 1200 });
    getLessons("page", 1);
    if (!currentUser) {
      fetchUserData();
    }
  }, [fetchUserData, currentUser]);

  const myLesson = lessons.filter((less) => less.userId === currentUser._id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Lessons*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {myLesson.map((less) => (
            <div key={less._id}>
              <Cards lesson={less} />
            </div>  
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

export default MyLesson;
