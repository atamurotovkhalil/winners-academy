import CommunityCard from "../Card/CommunityCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useArticleStore } from "../Community/store/article-stroe";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect } from "react";

const MyArticles = () => {
  const getArticles = useArticleStore((state) => state.getArticles);
  const articles = useArticleStore((state) => state.articles);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);

  useEffect(() => {
    getArticles("page", 1);
    if (!currentUser) {
      fetchUserData();
    }
  }, [getArticles, fetchUserData]);

  const myArticle = articles.filter((art) => art.userId === currentUser._id);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Articles*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {myArticle.map((art) => (
            <div key={art._id}>
              <CommunityCard article={art} />
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

export default MyArticles;
