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
import { useEffect, useState } from "react";
import { useCurrentUserStore } from "../Signup/store/currentUser-store";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { usePopup } from "@/widgets/popup-store/popup-store";


const MyArticles = () => {
  const getUserArticles = useArticleStore((state) => state.getUserArticles);
  const userArticles = useArticleStore((state) => state.userArticles);
  const currentUser = useCurrentUserStore((state: any) => state.currentUser);
  const fetchUserData = useCurrentUserStore(
    (state: any) => state.fetchUserData
  );
  const setConfirmpopup = usePopup((state: any) => state.setConfirmpopup);
  const [page, setPage] = useState(1);
  const [size] = useState(6);

  useEffect(() => {
    getUserArticles(currentUser?.id, page, size);
    if (!currentUser) {
      fetchUserData();
    }
  }, [getUserArticles, fetchUserData]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Articles*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {userArticles?.map((art) => (
            <div key={art.id}>
              <Link to={`/community/${art?.id}/${art?.profileId}`}>
                <CommunityCard article={art} />
              </Link>
              <div>
                <div className="flex items-center justify-center mt-1">
                  <Button
                    onClick={() => {
                      setConfirmpopup(true, currentUser?.id, art.id);
                      getUserArticles(currentUser?.id, page, size);
                    }}
                    className="w-[95%] m-1 rounded-sm flex justify-center bg-[#fc8100] hover:bg-black/80 text-white transition-all duration-300"
                  >
                    Delete Article <MdDelete />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getUserArticles(currentUser?.id, page - 1, size);
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
                  getUserArticles(currentUser?.id, page + 1, size);
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

export default MyArticles;
