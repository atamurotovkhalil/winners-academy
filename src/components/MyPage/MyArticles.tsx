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

const MyArticles = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Lessons*</h2>
      <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10 lg:border md:border rounded-xl border-[#fc8100]">
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
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
