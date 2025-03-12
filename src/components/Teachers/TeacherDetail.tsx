import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Cards from "../Card/LessonCard";
import TeacherCard from "../Card/UserCard";
import { useParams } from "react-router";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect } from "react";
import { useLessonStore } from "../Lessons/store/lessons-store";

const TeacherDetail = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);

  useEffect(() => {
    if (!user || !lessons) {
      getUser(id);
      getLessons("page", 1);
    }
  }, [getUser, user, lessons, getLessons]);

  const myLesson = lessons.filter((less) => less?.userId === user?._id);
  return (
    <div className="mt-16">
      <div className="w-full">
        <div data-aos="slide-up" className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <div className="flex items-start justify-center">
              <div className="col-span-1 lg:sticky md:sticky top-20">
                <TeacherCard user={user} />
              </div>
            </div>
            <div className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 space-x-3 my-3">
              {myLesson.map((lesson) => (
                <div key={lesson?._id}>
                  <Cards lesson={lesson} />
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
      </div>
    </div>
  );
};

export default TeacherDetail;
