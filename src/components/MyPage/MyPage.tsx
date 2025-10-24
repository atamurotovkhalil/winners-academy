import {useEffect, useState} from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AddLesson from "./AddLesson";
import MyLesson from "./MyLesson";
import MyFavourites from "./MyFavourites";
import MyArticles from "./MyArticles";
import WriteArticle from "./WriteArticle";
import MyProfile from "./MyProfile";
import WinnersLogo from "../../widgets/WinnersLogo";
import {FaRegCircleUser} from "react-icons/fa6";
import {MdAssignment} from "react-icons/md";
import {MdAssignmentInd} from "react-icons/md";
import {GiHeartPlus} from "react-icons/gi";
import {PiArticleMediumFill} from "react-icons/pi";
import {TfiWrite} from "react-icons/tfi";
import {TbLogout} from "react-icons/tb";
import {baseURL} from "@/lib/baseURL";
import avatar from "./../../assets/avatar6.png";
import {GrUserAdmin} from "react-icons/gr";

import AOS from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router";
import {useCurrentUserStore} from "../Signup/store/currentUser-store";
import AdminPage from "@/App/Admin";
import LogoutPopup from "@/widgets/popups/logout-popup";

const MyPage = () => {
    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const [showComponent, setShowComponent] = useState(1);
    const [showLogout, setShowLogout] = useState(false);
    useEffect(() => {
        AOS.init({duration: 1200});
    }, []); // only once
    const RenderComponent = () => {
        switch (showComponent) {
            case 1:
                return <AddLesson/>;
            case 2:
                return <MyLesson/>;
            case 3:
                return <MyFavourites/>;
            case 4:
                return <MyArticles/>;
            case 5:
                return <WriteArticle/>;
            case 6:
                return <MyProfile/>;
            case 7:
                return <AdminPage/>;
            default:
                return <AddLesson/>;
        }
    };
    return (
        <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
            {showLogout && <LogoutPopup setShowLogout={setShowLogout}/>}
            <div
                className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-1 grid-cols-1 items-start justify-between gap-4 my-5 min-h-screen">
                <div
                    data-aos="zoom-in"
                    className="sm:mx-1 md:w-[90%] lg:w-[100%]  mt-16 py-4 col-span-1 lg:flex md:flex lg:sticky sm:hidden hidden md:sticky top-20"
                >
                    <div
                        className="flex lg:w-[100%] md:w-[80%] items-center lg:justify-start md:justify-start justify-center">
                        <Card
                            className="lg:w-[100%] md:w-[100%] border-0 rounded-xs drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover">
                            <div className="flex items-center justify-center">
                                <WinnersLogo/>
                            </div>
                            <CardHeader className="flex items-center justify-center">
                                <div>
                                    <div
                                        className="flex items-center border-t border-b border-[#fc8100] justify-center">
                                        <img
                                            src={
                                                currentUser?.attach
                                                    ? `${baseURL}${currentUser?.attach.path}`
                                                    : avatar
                                            } // Fallback to `avatar` if image is undefined
                                            alt="User Image"
                                            className="w-20 h-20 object-cover rounded-full m-2"
                                        />
                                    </div>
                                    <CardTitle className="text-center">
                                        {currentUser?.name}
                                    </CardTitle>
                                    <CardDescription className="text-center">
                                        {currentUser?.level}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex flex-col gap-2">
                                {currentUser?.type === "TEACHER" || "ADMIN" ? (
                                    <Button
                                        onClick={() => setShowComponent(1)}
                                        className={
                                            showComponent === 1
                                                ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                                : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                        }
                                    >
                                        Add Lesson <MdAssignment/>
                                    </Button>
                                ) : (
                                    <div className="hidden"></div>
                                )}
                                {currentUser?.type === "TEACHER" || "ADMIN" ? (
                                    <Button
                                        onClick={() => setShowComponent(2)}
                                        className={
                                            showComponent === 2
                                                ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                                : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                        }
                                    >
                                        My Lessons <MdAssignmentInd/>
                                    </Button>
                                ) : (
                                    <div className="hidden"></div>
                                )}
                                <Button
                                    onClick={() => setShowComponent(3)}
                                    className={
                                        showComponent === 3
                                            ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                    }
                                >
                                    My Favourites <GiHeartPlus/>
                                </Button>
                                <Button
                                    onClick={() => setShowComponent(5)}
                                    className={
                                        showComponent === 5
                                            ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                    }
                                >
                                    Write Article <TfiWrite/>
                                </Button>
                                <Button
                                    onClick={() => setShowComponent(4)}
                                    className={
                                        showComponent === 4
                                            ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                    }
                                >
                                    My Articles <PiArticleMediumFill/>
                                </Button>

                                <Button
                                    onClick={() => setShowComponent(6)}
                                    className={
                                        showComponent === 6
                                            ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                    }
                                >
                                    My Profile <FaRegCircleUser/>
                                </Button>
                                {currentUser?.profileRole === "ROLE_ADMIN" && (
                                    <Link to="/admin/admin" className="w-full">
                                        <Button
                                            onClick={() => setShowComponent(7)}
                                            className={
                                                showComponent === 7
                                                    ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                                    : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            }
                                        >
                                            Admin Page
                                            <GrUserAdmin/>
                                        </Button>
                                    </Link>
                                )}
                                <Button
                                    onClick={() => setShowLogout(true)}
                                    className={
                                        showComponent === 8
                                            ? "w-full rounded-xs flex justify-evenly bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                            : "w-full rounded-xs flex justify-evenly hover:bg-[#fc8100] drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                                    }
                                >
                                    Logout <TbLogout/>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className="lg:col-span-3 mt-20    md:col-span-2 sm:col-span-1 col-span-1    gap-3">
                    <RenderComponent/>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
