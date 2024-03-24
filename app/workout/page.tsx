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
  const [workouttPlan, setWorkouttPlan] = useState({});
  const [workoutPlanProgress, setWorkoutPlanProgress] = useState({});
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

    // Fetching workout plan
    axios.get('http://localhost:3001/workout_plan')
      .then(response => {
        setWorkouttPlan(response.data);
        console.log("workout plan:",response.data);
      })
      .catch(error => {
        console.error('Error fetching workout plan:', error);
      });

    // Fetching workout plan progress
    axios.get('http://localhost:3001/workout_plan_progress')
      .then(response => {
        setWorkoutPlanProgress(response.data);
        console.log("workout plan progress:",response.data);
      })
      .catch(error => {
        console.error('Error fetching workout plan progress:', error);
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

    function executeExercise(exerciseType:string, counter_limit:number) {
        fetch(`http://127.0.0.1:5000/run_main/${exerciseType}/${counter_limit}`, {
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
const workoutPlan = state?.answer;

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
            {/* HEREEEEEE */}
            <div className="title mt- font-product flex flex-row justify-center items-center"> 
            </div>
            {/* IF WORKOUT PLAN IS FRESH AND NEW */}
            {workoutPlan && (
              <>
                <div className="sticky top-0">
                  <h6 className="mt-2 text-xl flex items-center text-white font-bold tracking-tight">
                    Your Newly Generated Workout Plan
                  </h6>
                </div>
                <div className="relative overflow-x-auto pt-4 max-h-80">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs bg-gray-900 uppercase dark:text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Workout Session
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Recommended / Day
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(workoutPlan.workout_plan).map((day, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {workoutPlan.workout_plan[day]['dateTime']}
                          </th>
                          <td className="px-6 py-4">
                            <p>Sit Ups : {workoutPlan.workout_plan[day]['sit-up']}</p>
                            <p>Pull Ups : {workoutPlan.workout_plan[day]['pull-up']}</p>
                            <p>Push Ups : {workoutPlan.workout_plan[day]['push-up']}</p>
                            <p>Squat Ups : {workoutPlan.workout_plan[day]['squat']}</p>
                            <p>Walks : {workoutPlan.workout_plan[day]['walk']['steps']}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
              )}
            <>
      
      <div className="sticky top-0">
        <h6 className="mt-2 text-xl flex items-center text-white font-bold tracking-tight">
          Your Workout Plan
        </h6>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-gray-900 uppercase dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Workout Session
            </th>
            <th scope="col" className="px-6 py-3">
              Recommended / Day
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(workouttPlan).map((session, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {session}
              </td>
              <td className="px-6 py-4">
                {typeof workouttPlan[session] === 'object' ? (
                  <p>{workouttPlan[session].duration} {workouttPlan[session].steps}</p>
                ) : (
                  <p>{workouttPlan[session]}</p>
                )}
              </td>
              <td className="px-6 py-4">
              {workoutPlanProgress[session] && workoutPlanProgress[session] >= 1 ? (
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  {/* DONE TICK */}
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
              ) : (
                <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              )}

              </td>
              <td>
                <button onClick={() => executeExercise(session, workouttPlan[session])} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    Start
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>


            <div className="font-product flex flex-row items-center justify-center md:container md:mx-auto mt-12 max-sm:flex-col max-sm:mt-4">
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('sit-up',30)} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    sit-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('pull-up',20)} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    pull-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('push-up',40)} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    push-up
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('squat',15)} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
                    squat
                </button>
              </div>
              <div className="justify-self-center w-auto font-product font-medium">
                <button onClick={() => executeExercise('walk',200)} className=" px-6 py-3 font-semibold rounded-full bg-black text-white mx-3 mt-7 hover:scale-105 transition-all">
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
