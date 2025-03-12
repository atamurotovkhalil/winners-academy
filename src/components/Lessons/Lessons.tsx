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
import WinnersLogo from "../ui/WinnersLogo";
import Cards from "../Card/LessonCard";
import { useEffect } from "react";
import { useLessonStore } from "./store/lessons-store";

const Lessons = () => {
  const lessons = useLessonStore((state) => state.lessons);
  const getLessons = useLessonStore((state) => state.getLessons);
  useEffect(() => {
    AOS.init({ duration: 1200 });
    getLessons("page", 1);
  }, []);
  return (
    <div className="w-full">
      <div data-aos="slide-up" className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
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
                  <CardTitle>Filtering</CardTitle>
                  <CardDescription>Here find your Lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Find by name:</Label>
                        <Input
                          className="drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                          id="name"
                          placeholder="Wanted Lesson"
                        />
                      </div>
                      <div
                        className="flex flex-col space-y-1.5 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                      >
                        <Label htmlFor="framework">Choose Level</Label>
                        <Select>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">All</SelectItem>
                            <SelectItem value="sveltekit">Grammar</SelectItem>
                            <SelectItem value="astro">Pre-IELTS</SelectItem>
                            <SelectItem value="nuxt">IELTS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between ">
                  <Button
                    className=" w-full hover:bg-[#fc8100] rounded-xs drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                object-cover"
                  >
                    Search <FaSearch />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
            {lessons.map((lesson) => (
              <li key={lesson._id}>
                <Cards lesson={lesson} />
              </li>
            ))}
          </ul>
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
  );
};

export default Lessons;
