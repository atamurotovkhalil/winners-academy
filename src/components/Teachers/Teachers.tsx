import TeacherCard from "../Card/UserCard";
import { Link } from "react-router";
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
import WinnersLogo from "../../widgets/WinnersLogo";
import { FaSearch } from "react-icons/fa";
import { useUserStore } from "../Signup/store/user-store";
import { useEffect, useState } from "react";

interface FindUser {
  name: string;
  phone: string;
  level: string;
}

const Teachers = () => {
  const users = useUserStore((state) => state.users);
  const getUsers = useUserStore((state) => state.getUsers);
  const [page] = useState(1);
  const [size] = useState(6);
  const [allUsers, setAllUsers] = useState<FindUser>({
    name: "",
    phone: "",
    level: "",
  });

  useEffect(() => {
    getUsers(allUsers, page, size);
  }, [getUsers]);

  function findUsers() {
    getUsers(allUsers, page, size);
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10">
      <div
        data-aos="slide-up"
        className="container mx-auto max-w-6xl px-4 lg:px-16"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Teachers
          </h1>
          <p className="text-gray-500 mt-2">
            Find the best teacher for yourself
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {/* Search/Filter Card */}
          <div className="col-span-1">
            <Card className="p-4 shadow-lg rounded-lg border border-gray-200">
              <div className="flex justify-center mb-4">
                <WinnersLogo />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Filter</CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  Search your desired teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex flex-col">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter name"
                      value={allUsers.name}
                      onChange={(e) =>
                        setAllUsers({ ...allUsers, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                onClick={findUsers}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Search <FaSearch className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Teacher Cards */}
          <div className="lg:col-span-3 md:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {users?.length > 0 ? (
              users.map((teach) => (
                <Link key={teach.id} to={`/teacherdetail/${teach.id}`}>
                  <div className="hover:scale-105 transition-transform duration-300">
                    <TeacherCard user={teach} />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No teachers found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
