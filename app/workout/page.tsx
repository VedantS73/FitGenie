"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/pages/api/appwriteConfig";
import Link from "next/link";
import GraphSvg from "public/images/github-contribution-grid-snake.svg";
import Image from "next/image";
import useFormOneStore from "@/store/formStore";
import Footer from "../components/Footer";

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
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

    function executeExercise(exerciseType:string) {
        fetch(`http://127.0.0.1:5000/run_main/${exerciseType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
        })
        .then(response => {
        if (response.ok) {
            console.log('Exercise execution successful');
        } else {
            throw new Error('Failed to execute exercise');
        }
        })
        .catch(error => console.error(error));
    }

  // replaces all newline characters with HTML line break tags
  const html = state?.answer?.replace(/\n/g, "<br>");

  const executesitup = (buttoncontent:string) => {

  }

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
          <div className="form bg-violet-500 text-white  shadow-lg py-24 rounded-md mt-12  md:mx-auto px-12 border">
            <div className="title mt- font-product flex flex-row justify-center items-center">
              <h2 className="mt-2 text-6xl text-white  font-bold tracking-tight">
                Start Workout 🏋️‍♂️
              </h2>
            </div>

            <div className="font-product flex flex-row items-center justify-center md:container md:mx-auto mt-12 max-sm:flex-col max-sm:mt-4">
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('sit-up')} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    sit-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('pull-up')} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    pull-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('push-up')} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    push-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('squat')} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    squat
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('walk')} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    walk
                </button>
              </div>
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
