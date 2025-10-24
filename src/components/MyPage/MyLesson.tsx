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
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCurrentUserStore } from "../Signup/store/currentUser-store";
import { Link } from "react-router";
import LessonCard from "../Card/LessonCard";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { usePopup } from "@/widgets/popup-store/popup-store";

interface FindLesson {
  title: string;
  author: string;
  category: string;
}

const MyLesson = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [lesson] = useState<FindLesson>({
    title: "",
    author: "",
    category: "All",
  });
  const userLessons = useLessonStore((state) => state.userLessons);
  const getUserLessons = useLessonStore((state) => state.getUserLessons);
  const currentUser = useCurrentUserStore((state: any) => state.currentUser);
  const setLessonConfirmpopup = usePopup(
        (state: any) => state.setLessonConfirmpopup
      );
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []); // only once

  useEffect(() => {
    getUserLessons(currentUser?.id, page, size);
  }, [lesson, page, size, getUserLessons,]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Lessons*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
          {userLessons?.map((l) => (
            <li key={l.id}>
              <Link to={`/lessons/${l?.id}/${l?.profileId}`}>
                <LessonCard lesson={l} />
              </Link>
              
              <div>
                <div className="flex items-center justify-center mt-1">
                  <Button
                    onClick={() => {setLessonConfirmpopup(true, l.id)
                      getUserLessons(currentUser?.id, page, size)
                    }
                      
                    }
                    className="w-[95%] m-1 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white transition-all duration-300"
                  >
                    Delete Lesson <MdDelete />
                  </Button>
                </div>
              </div> 
            </li>
          ))}
        </ul>
      </div>
      <div className="my-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getUserLessons(currentUser?.id, page - 1, size);
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
                  getUserLessons(currentUser?.id, page + 1, size);
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

export default MyLesson;
