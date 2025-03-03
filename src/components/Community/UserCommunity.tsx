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


const UserCommunity = () => {
  return (
    <div className="mt-16">
      <div className="w-full">
        <div data-aos="slide-up" className="lg:mx-16 md:mx-12  py-4 ">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <div className="flex items-start justify-center">
              <div className="col-span-1 lg:sticky md:sticky top-20">
                <UserCard />
              </div>
            </div>
            <div className="lg:col-span-3  md:col-span-2 grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 space-y-3 space-x-3 my-3">
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
      </div>
    </div>
  );
};

export default UserCommunity;
