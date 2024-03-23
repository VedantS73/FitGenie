"use client";

import React, { MouseEvent, useState } from "react";
import StepFormOne from "./stepform/StepFormOne";
import StepFormTwo from "./stepform/StepFormTwo";
import StepFormThree from "./stepform/StepFormThree";
import StepFormFour from "./stepform/StepFormFour";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation";
import useFormOneStore from "@/store/formStore";
// import mailSender from "../../pages/api/emailsend";
import { marked } from 'marked';
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`65fdbf643f997e6ea8f1`);


const Container = () => {
  const forms = [
    <StepFormOne key="stepFormOne" />,
    <StepFormTwo key="stepFormTwo" />,
    <StepFormThree key="stepFormThree" />,
    <StepFormFour key="stepFormFour" />,
  ];

  // navigating to the next stepform
  const handleRightClick = () => {
    setFormIndex((prev) => (prev < 3 ? prev + 1 : prev));
  };

  // navigating to the prev stepform
  const handleLeftClick = () => {
    setFormIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const changePercent = () => {
    percentage = 100;
  };

  const state = useFormOneStore();
  const [formIndex, setFormIndex] = useState(0);
  const route = useRouter();
  let percentage = (formIndex / 4) * 100;

  // sends a POST request to a openAI server with a prompt and store the result in answer state
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.selectedPlan === "exercise") {
      route.push("/workout");
      let customPlan = {
        "workout_plan": {
          "day_1": {
            "sit-up": 20,
            "pull-up": 3,  
            "push-up": 15,
            "squat": 30,
            "walk": {
              "duration": "30 minutes",
              "steps": 4000
            }
          },
          "day_2": {
            "sit-up": 25,
            "pull-up": 3,
            "push-up": 20,
            "squat": 35,
            "walk": {
              "duration": "30 minutes",
              "steps": 4000
            }
          },
          "day_3": {
            "sit-up": 25,
            "pull-up": 3,
            "push-up": 20,
            "squat": 35,
            "walk": {
              "duration": "30 minutes",
              "steps": 4000
            }
          },
          "day_4": {
            "sit-up": 30,
            "pull-up": 4,
            "push-up": 25,
            "squat": 40,
            "walk": {
              "duration": "40 minutes",
              "steps": 5000
            }
          },
          "day_5": {
            "sit-up": 30,
            "pull-up": 4,
            "push-up": 25,
            "squat": 40,
            "walk": {
              "duration": "40 minutes",
              "steps": 5000
            }
          },
          "day_6": {
            "sit-up": 35,
            "pull-up": 5,
            "push-up": 30,
            "squat": 45,
            "walk": {
              "duration": "45 minutes",
              "steps": 6000
            }
          },
          "day_7": {
            "rest": "Focus on recovery and high-protein meals."  // Rest day for muscle growth
          }
        }
      }


    }
    else {
      state.setLoading(true);
      route.push("/plans");
      state.setAnswer("");
      if (state.weight === "") {
        alert("no data");
        return;
      }

      // constructing a prompt message with user data for OpenAI
      const prompt = `You are given a user's data, now you gotta generate a ${state.timeDuration} ${state.selectedPlan} for that user that wants to ${state.selectedType} and has experience of ${state.exerciseExperience} in this
          weight: ${state.weight} \n
          height: ${state.height} \n
          age: ${state.age} \n
          diseases: ${state.diseases} \n
          allergies: ${state.allergies} \n
          diet: ${state.foodPreference}
          need a ${state.dietType}
          `;

      console.log("sending prompt to server => ", prompt);

      const results = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      console.log("the reponse of promts is => ", prompt);

      console.log(results);

      let newres = marked.parse(results);
      let newnewres = newres.replace(/\n{2,}/g, '\n');

      const email = "vedantsawant72003@gmail.com"
      const subject = "Your FitGennie AI Fitness Plan"
      const title = newnewres;

      const sendmail = await fetch("/api/emailsend", {
        method: "POST",
        body: JSON.stringify({
          email,
          subject,
          title
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log("sendmail result is: ",sendmail);
      // mailSender("jhas0042@gmail.com", "Your FitGennie AI Fitness Plan", results );
      state.setAnswer(newnewres);
      // make text out of answer
      // state.setAnswer(results.result.choices[0].message.content);
      state.setLoading(false);
    };
  };

  return (
    <div className="flex mx-auto my-[4em] border border-grey-900 shadow-md w-[100em]  h-[40em] overflow-hidden rounded-xl max-sm:flex-col max-sm:w-full max-sm:h-full max-sm:justify-center">
      <div className="my-0  h-full relative  flex-1 border-2   p-2  max-sm:py-12">
        {forms[formIndex]}

        {formIndex === 3 ? (
          <button
            onClick={handleSubmit}
            className="  absolute right-[90px] rounded-md bottom-10 cursor-pointer font-product font-medium bg-black px-4 py-2 text-white max-sm:py-3 max-sm:px-6 max-sm:bottom-2"
          >
            Finish
          </button>
        ) : (
          <button
            className=" absolute right-[90px] bottom-10 bg-violet-500 hover:bg-violet-600 text-white font-product font-medium rounded-md px-4 py-2 transition-all max-sm:py-3 max-sm:px-6 max-sm:bottom-2"
            onClick={handleRightClick}
          >
            Next
          </button>
        )}

        <button
          className="absolute left-[90px] bottom-10 rounded-md cursor-pointer font-product bg-violet-500 hover:bg-violet-600 font-medium px-4 py-2 text-white max-sm:py-3 max-sm:px-6 max-sm:bottom-2"
          onClick={handleLeftClick}
        >
          Prev
        </button>
      </div>

      <div className=" bg-violet-500 text-white font-product flex-col w-[10em] flex items-center justify-center  font-bold text-5xl max-sm:w-full max-sm:mt-12 max-sm:py-24">
        <h1>Progress</h1>
        <div style={{ width: 200, height: 200 }} className="mt-12">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              trailColor: "#fff",
              pathColor: "#F3BC34",
              textColor: "#fff",
              pathTransitionDuration: 0.8,
            })}
          />
        </div>

        <h1 className="text-xl mt-20 ">Track Your Progress</h1>
      </div>
      
      <div className="text-black max-sm:w-full" dangerouslySetInnerHTML={{ __html: state.answer }} />
    </div>
  );
};

export default Container;