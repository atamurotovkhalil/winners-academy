import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WinnersLogo from "../../widgets/WinnersLogo";
import { useEffect, useState } from "react";
import { useLessonStore } from "./store/lessons-store";
import { Link } from "react-router";
import LessonCard from "../Card/LessonCard";
import { PiGridFourFill } from "react-icons/pi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

const Lessons = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [lesson, setLesson] = useState<FindLesson>({
    title: "",
    author: "",
    category: "All",
  });

  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);

  interface FindLesson {
    title: string;
    author: string;
    category: string;
  }
  useEffect(() => {
    AOS.init({ duration: 1200 });
    getLessons(lesson, page, size);
  }, []);
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start justify-center  my-5 min-h-screen">
          <div className="col-span-1 lg:sticky sm:sticky md:sticky top-20">
            <div className="flex items-center  lg:justify-start md:justify-start justify-center">
              <Card
                className=" border-0 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover rounded-xs "
              >
                <div className="flex items-center justify-center">
                  <WinnersLogo />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Filtering</CardTitle>
                      <CardDescription>Here find your Lesson</CardDescription>
                    </div>
                    <div className="border-1 rounded-xs border-black">
                      {size === 6 ? (
                        <PiGridFourFill
                          onClick={() => {
                            setSize(9);
                            getLessons(lesson, page, 9);
                          }}
                          className="text-black"
                          size={24}
                        />
                      ) : (
                        <TfiLayoutGrid3Alt
                          onClick={() => {
                            setSize(6);
                            getLessons(lesson, page, 6);
                          }}
                          className="text-black"
                          size={24}
                        />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Find by Name:</Label>
                        <Input
                          className="drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                          id="name"
                          placeholder="Wanted Lesson Name"
                          onChange={(e) =>
                            setLesson({ ...lesson, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Find by Author:</Label>
                        <Input
                          className="drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                          id="name"
                          placeholder="Wanted Lesson Author"
                          onChange={(e) =>
                            setLesson({ ...lesson, author: e.target.value })
                          }
                        />
                      </div>
                      <div
                        className="flex flex-col space-y-1.5 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                      >
                        <Label htmlFor="framework">Choose Category</Label>
                        <Select
                          onValueChange={(value) =>
                            setLesson({ ...lesson, category: value })
                          }
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="GRAMMAR">Grammar</SelectItem>
                            <SelectItem value="PRE_IELTS">Pre-IELTS</SelectItem>
                            <SelectItem value="IELTS">IELTS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between ">
                  <Button
                    onClick={() => getLessons(lesson, page, size)}
                    className=" w-full hover:bg-[#fc8100] rounded-xs drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                  >
                    Search <FaSearch />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-2 md:gap-2 my-1">
            {lessons?.map((lesson) => (
              <li key={lesson.id}>
                <Link to={`/lessons/${lesson?.id}/${lesson?.profileId}`}>
                  <LessonCard lesson={lesson} />
                </Link>
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
                  className={`${
                    lessons.length < 6 ? "pointer-events-none opacity-50" : ""
                  }`}
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
    </div>
  );
};

export default Lessons;
