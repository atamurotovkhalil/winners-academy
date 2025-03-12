import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserCard from "../Card/UserCard";
import CommunityCard from "../Card/CommunityCard";
import { useParams } from "react-router";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect } from "react";
import { useArticleStore } from "./store/article-stroe";

const UserCommunity = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const articles = useArticleStore((state) => state.articles);
  const getArticles = useArticleStore((state) => state.getArticles);

  useEffect(() => {
    if (!user || !articles) {
      getUser(id);
      getArticles("page", 1);
    }
  }, [getUser, user, articles, getArticles]);

  const userArticle = articles.filter((art) => art.userId === user._id);

  return (
    <div className="mt-16">
      <div className="w-full">
        <div data-aos="slide-up" className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <div className="flex items-start justify-center">
              <div className="col-span-1 lg:sticky md:sticky top-20">
                <UserCard user={user} />
              </div>
            </div>
            <div className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 space-x-3 my-3">
              {userArticle.map((lesson) => (
                <div key={lesson._id}>
                  <CommunityCard article={lesson} />
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

export default UserCommunity;
