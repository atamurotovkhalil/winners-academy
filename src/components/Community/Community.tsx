import { useEffect, useState, useCallback } from "react";
import FreeSharing from "./FreeSharing";
import ClassBased from "./ClassBased";
import News from "./News";
import WinnersLogo from "../ui/WinnersLogo";
import { Button } from "@/components/ui/button";
import { MdCropFree, MdClass } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { useArticleStore } from "./store/article-stroe";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";

const Community = () => {
  const [showComponent, setShowComponent] = useState(1);
  const getArticles = useArticleStore((state) => state.getArticles);

  useEffect(() => {
    getArticles("page", 1);
  }, [getArticles]); // Add `getArticles` in the dependency array to avoid warnings
  const RenderComponent = useCallback(() => {
    switch (showComponent) {
      case 1:
        return <FreeSharing />;
      case 2:
        return <ClassBased />;
      case 3:
        return <News />;
      default:
        return <FreeSharing />;
    }
  }, [showComponent]); // Only re-render when `showComponent` changes

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
                  <div className="w-40 ">
                    <Label htmlFor="framework"></Label>
                    <Select>
                      <SelectTrigger
                        className="border-black h-11"
                        id="framework"
                      >
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">All</SelectItem>
                        <SelectItem value="sveltekit">Free Sharing</SelectItem>
                        <SelectItem value="astro">Class Based</SelectItem>
                        <SelectItem value="nuxt">News</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <input
                    placeholder="SEARCH"
                    className="border rounded-sm   py-2 px-10 border-black"
                  />
                  <button className="rounded-sm flex items-center justify-between gap-3 hover:text-white  border py-2 px-10 bg-[#fc8100]  hover:bg-black">
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
                      onClick={() => setShowComponent(1)}
                      className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                    >
                      Free Sharing <MdCropFree />
                    </Button>
                    <Button
                      onClick={() => setShowComponent(2)}
                      className="w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                    >
                      Class Based <MdClass />
                    </Button>
                    <Button
                      onClick={() => setShowComponent(3)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
