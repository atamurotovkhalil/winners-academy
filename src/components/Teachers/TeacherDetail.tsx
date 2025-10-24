import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useParams } from "react-router";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect, useState } from "react";
import { useLessonStore } from "../Lessons/store/lessons-store";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { baseURL } from "@/lib/baseURL";
import { useArticleStore } from "../Community/store/article-stroe";
import { Lesson } from "@/Types/LessonType";
import LessonCard from "../Card/LessonCard";
import { Article } from "@/Types/ArticleType";
import CommunityCard from "../Card/CommunityCard";

const TeacherDetail = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const getUserArticles = useArticleStore((state) => state.getUserArticles);
  const userArticles = useArticleStore((state) => state.userArticles);
  const [showLessons, setShowLessons] = useState(true);
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const userLessons = useLessonStore((state) => state.userLessons);
  const getUserLessons = useLessonStore((state) => state.getUserLessons);

  useEffect(() => {
    getUserArticles(user?.id, page, size);
  }, [getUserArticles]);

  useEffect(() => {
    if (!user || user.id !== Number(id)) {
      getUser(id);
    }
  }, [id, getUser, user]);

  useEffect(() => {
    if (id) {
      getUserLessons(id, page, size);
    }
  }, [id, page, size, getUserLessons]);

  return (
    <div className="mt-20">
      <div className="container mx-auto max-w-6xl py-6 px-4 lg:px-16">
        {/* Teacher Info Section */}
        <div
          data-aos="fade-up"
          className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-10 items-start"
        >
          {/* LEFT: Teacher Image */}
          <div className="col-span-1 flex justify-center">
            <div className="relative">
              <img
                src={
                  user?.attach
                    ? `${baseURL}${user?.attach.path}`
                    : `${baseURL}${user?.attachPath}`
                }
                alt={user?.name || "Teacher"}
                className="rounded-2xl w-64 h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* RIGHT: Teacher Details */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#1C1C33] to-[#2D2D4D] text-white p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUser className="text-[#fc8100]" />
              {user?.name} {user?.surname}
            </h2>
            <div className="space-y-3 text-[15px]">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-[#fc8100]" /> {user?.email || "N/A"}
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="text-[#fc8100]" /> {user?.phone || "N/A"}
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#fc8100]" />{" "}
                {user?.address || "No address available"}
              </p>
              <p className="pt-4 text-sm leading-relaxed text-gray-300 border-t border-gray-600">
                {user?.detail ||
                  "This teacher has not added additional information yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <h3 className="text-xl font-semibold text-[#fc8100] mb-4">
          Lessons and Articles by {user?.name}
        </h3>
        <div className="flex items-center gap-2 m-2 justify-around">
          <button
            onClick={() => setShowLessons(true)}
            className={
              showLessons
                ? "w-full bg-black  text-white py-3 mt-4 rounded-lg font-bold"
                : "w-full hover:bg-gray-900 bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"
            }
          >
            Lessons
          </button>
          <button
            onClick={() => setShowLessons(false)}
            className={
              !showLessons
                ? "w-full bg-black  text-white py-3 mt-4 rounded-lg font-bold"
                : "w-full hover:bg-gray-900 bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"
            }
          >
            Articles
          </button>
        </div>
        <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
          {showLessons ? (
            <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
              {userLessons?.map((lesson: Lesson) => (
                <li key={lesson.id}>
                  <Link to={`/lessons/${lesson?.id}/${lesson?.profileId}`}>
                    <LessonCard lesson={lesson} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 lg:gap-3 md:gap-3 my-3">
              {userArticles?.map((article: Article) => (
                <li key={article.id}>
                  <Link to={`/community/${article?.id}/${article?.profileId}`}>
                    <CommunityCard article={article} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        <div className="my-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage((prev) => prev - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => prev + 1)}
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

export default TeacherDetail;
