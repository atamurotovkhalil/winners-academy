import React, { useState } from "react";
import WinnersLogo from "../../widgets/WinnersLogo";
import { Link, useNavigate } from "react-router";
import { usePopup } from "@/widgets/popup-store/popup-store";
import { useCurrentUserStore } from "./store/currentUser-store";

const Login: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error] = useState<string | null>(null);
  const fetchUserData = useCurrentUserStore((state: any) => state.fetchUserData);
  const setLikespopup = usePopup((state: any) => state.setLikespopup);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email && formData.password) {
      try {
        const response = await fetch(`${BASE_URL}/profile/authorization`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          
          const  data = await response.json();
          localStorage.setItem("token", data.jwtToken);  
          fetchUserData(); 
          setLikespopup()
          setFormData({ email: "", password: "" })
          navigate("/mypage");
        } else {
          const errorData = await response.json();
          setSignErroruppopup(true, `Error during login: ${errorData}`);
        }
      } catch (error) {
        setSignErroruppopup(true, `An error occured during login: ${error}`)
      }
    } else {
      alert("Form validation failed! Please correct the errors and try again.");
    }
  };

  return (
    <div className="max-w-md h-screen border-l-2 border-r-2 border-[#fc8100] lg:mt-12 md:mt-12 flex items-center justify-center mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="w-full">
        <div className="flex items-center justify-center">
          <WinnersLogo />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border border-[#fc8100] rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border border-[#fc8100] rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md hover:bg-[#fc8100]"
          >
            Login
          </button>
        </form>
        <p className="text-center">or</p>
        <Link to="/signup">
          <button className="w-full bg-black text-white py-2 rounded hover:bg-[#fc8100]">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
