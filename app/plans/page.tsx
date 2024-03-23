"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/pages/api/appwriteConfig";
import Link from "next/link";
import GraphSvg from "public/images/github-contribution-grid-snake.svg";
import Image from "next/image";
import useFormOneStore from "@/store/formStore";
import Footer from "../components/Footer";
import axios from "axios";

interface UserData {
  $id?: string;
  name?: string;
  email?: string;
  emailVerification?: boolean;
  charAt?: string;
}

const page: React.FC = () => {
  const [state] = useFormOneStore((state) => [state]);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserData>({});
  const [planText, setPlanText] = useState<string>("");
  let firstLetter = "";
  if (userDetails.email) {
    firstLetter = userDetails.email.charAt(0).toUpperCase();
  }

  // fetching user data
  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (response: any) {
        setUserDetails(response);
      },
      function (error: any) {
        console.log(error);
      }
    );

    // Fetch plan text
    axios.get('http://localhost:3001/plan')
      .then(response => {
        setPlanText(response.data.plantext);
        // console.log('Plan text:', response.data.plantext);
      })
      .catch(error => {
        console.error('Error fetching plan text:', error);
      });
  }, []);
  

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // replaces all newline characters with HTML line break tags
  // const html = state?.answer?.replace(/\n/g, "<br>");

  return (
    <>
      {userDetails ? (
        <>
          <div className="md:container md:mx-auto shadow-xl font-product flex flex-row items-center justify-between py-3 px-4 mt-8 border border-black max-sm:overflow-hidden">
            <div>
              <button
                className="bg-[#FF4C6E] text-white p-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <div className="text-xl flex items-center gap-2 max-sm:text-lg">
              <span> Hello, {userDetails.name}! </span>
              <div className="bg-violet-500 w-[50px] h-[50px] rounded-full flex justify-center items-center text-white">
                {firstLetter}
              </div>
            </div>
          </div>
          <div className="form bg-violet-500 text-white shadow-lg py-8 rounded-full mt-12 w-[40%] md:mx-auto px-12 border">
            <div className="title mt- font-product flex flex-row justify-center items-center">
              <h2 className="mt-2 text-4xl text-white  font-bold tracking-tight">
                My Plans
              </h2>
            </div>
          </div>
          
          <div className="plans-section bg-violet-500 mt-24 py-24 font-product flex flex-col justify-center items-center">
            <h2 className="mt-2 text-6xl text-white font-bold  tracking-tight">
              Saved Plans
            </h2>
            {planText? (
              <div
                className="w-[1300px] h-[600px] bg-white overflow-auto p-12 rounded-md mt-24 border-2 text-left border-black max-sm:w-full max-sm:h-[800px]"
                dangerouslySetInnerHTML={{ __html: planText }}
              />
            ) : (
              <p className="text-white">No saved plans yet</p>
            )}
          </div>
          <div className="font-product flex flex-row  py-12 items-center border-2 justify-center md:container md:mx-auto mt-12 max-sm:flex-col">
            <div className="justify-self-center w-auto font-product font-medium">
              <button className=" px-4 py-3 font-semibold rounded-md  bg-violet-600 text-white mx-8 mt-7 hover:scale-105 transition-all">
                Save Diet🚀
              </button>
            </div>
            <div className="justify-self-center w-auto font-product font-medium">
              <button className="bg-lime-600 shadow-sm text-white px-4 py-3 font-semibold rounded-md mx-8 mt-7 hover:scale-105 transition-all">
                Regenerate Diet🚀
              </button>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link href="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
};

export default page;
