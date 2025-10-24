import { useEffect, useState, useCallback } from "react";
import FreeSharing from "./FreeSharing";
import ClassBased from "./ClassBased";
import News from "./News";
import WinnersLogo from "../../widgets/WinnersLogo";
import { Button } from "@/components/ui/button";
import { MdCropFree, MdClass } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { useArticleStore } from "./store/article-stroe";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface FindArticle {
  title: string;
  author: string;
  category: string;
}

const Community = () => {
  const [showComponent, setShowComponent] = useState("FREE_SHARING");
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [article, setArticle] = useState<FindArticle>({
    title: "",
    author: "",
    category: showComponent,
  });

  const getArticles = useArticleStore((state) => state.getArticles);
  const articles = useArticleStore((state) => state.articles);
  

  useEffect(() => {
    setArticle((prev) => ({ ...prev, category: showComponent }));
    getArticles({ ...article, category: showComponent }, page, size);
  }, [showComponent, page, size]);


  const RenderComponent = useCallback(() => {
    switch (showComponent) {
      case "FREE_SHARING":
        return <FreeSharing articles={articles} />;
      case "CLASS_BASED":
        return <ClassBased articles={articles} />;
      case "NEWS":
        return <News articles={articles} />;
      default:
        return <FreeSharing articles={articles} />;
    }
  }, [showComponent, articles]); 

  return (
    <div>
      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
        <div>
          <div>
            <div className="lg:flex items-center justify-between">
              <div>
                <div className="flex justify-start items-center pt-1 md:pt-5 lg:pb-6">
                  <p className="lg:text-2xl md:text-xl text-base sm:text-xl text-black">
                    - Sharing & News & Free -
                  </p>
                </div>
                <div className="lg:flex items-center justify-center">
                  <p className="lg:text-4xl md:text-3xl sm:text-2xl text-xl lg:p-5 md:p-2 p-1">
                    Our Latest{" "}
                    <span className="text-green1">Sharing & News & Free</span>
                  </p>
                </div>
              </div>
              <div className="lg:flex md:flex lg:mt-20 md:mt-20 items-center justify-center">
                <div className="lg:flex md:flex lg:space-y-0 md:space-y-0 sm:space-y-2 space-y-1  items-center gap-2 justify-center">
                  
                  <input
                    placeholder=" SEARCH BY TITLE..."
                    onChange={(e) =>
                            setArticle({ ...article, title: e.target.value })
                          }
                    className="border rounded-sm   py-2 px-10 border-black"
                  />
                  <p></p>
                  <input
                    placeholder="SEARCH BY AUTHOR..."
                    onChange={(e) =>
                            setArticle({ ...article, author: e.target.value })
                          }
                    className="border rounded-sm   py-2 px-10 border-black"
                  />
                  <button 
                  onClick={() => getArticles(article, page, size)}
                  className="rounded-sm flex items-center justify-between gap-3 hover:text-white  border py-2 px-10 bg-[#fc8100]  hover:bg-black">
                    <FaSearch />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start justify-between gap-4 my-5 min-h-screen">
            <div
              data-aos="zoom-in"
              className="sm:mx-1 py-4 col-span-1 lg:sticky sm:sticky  md:sticky top-20"
            >
              <div className="flex items-center lg:justify-start md:justify-start justify-center">
                <Card className="w-[300px] border-0 rounded-xs drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
                  <div className="flex items-center justify-center">
                    <WinnersLogo />
                  </div>
                  <CardHeader>
                    <CardTitle>Ideas</CardTitle>
                    <CardDescription>Here Give your Ideas</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-2">
                    <Button
                      onClick={() => setShowComponent("FREE_SHARING")}
                      className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                    >
                      Free Sharing <MdCropFree />
                    </Button>
                    <Button
                      onClick={() => setShowComponent("CLASS_BASED")}
                      className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                    >
                      Class Based <MdClass />
                    </Button>
                    <Button
                      onClick={() => setShowComponent("NEWS")}
                      className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                    >
                      News <FaRegNewspaper />
                    </Button>
                  </CardFooter>
                </Card>
              </div> 
            </div>
            <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 col-span-1 gap-3">
              {RenderComponent()}
              <div className="my-3">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage(page - 1);
                            getArticles(article, page - 1, size);
                          }
                        }}
                        className={
                          page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                        href="#"
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="disabled">
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                      className={`${articles.length < 6? "pointer-events-none opacity-50" :"" }`}
                        onClick={() => {
                          setPage(page + 1);
                          getArticles(article, page + 1, size);
                        }}
                        href="#"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
