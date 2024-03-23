"use client";
import Tracker from "../components/Tracker";
import { useEffect, useState } from 'react';

function MyPage() {
    //const [result, setResult] = useState(null); // State to store the fetched result

    // useEffect(() => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     const requestOptions = {
    //         method: "get",
    //         headers: myHeaders,
    //         redirect: "follow",
    //     };

    //     fetch("https://v1.nocodeapi.com/jhas0042/fit/AaShRtGBpoiBsuVE/aggregatesDatasets?dataTypeName=steps_count,active_minutes,calories_expended,activity_summary,sleep_segment&timePeriod=today&durationTime=daily", requestOptions)
    //         .then(response => response.json()) // Parse response as JSON
    //         .then(result => setResult(result)) // Update state with fetched result
    //         .catch(error => console.log('error', error));
    // }, []); // Empty dependency array ensures useEffect runs only once on component mount
    //result &&

    return (
        <div>
            { <Tracker result={{
  "steps_count": [
    {
      "value": 395,
      "startTimeMillis": "1711152001000",
      "endTimeMillis": "1711212714500",
      "startTime": "23 Mar 2024 12:00 am",
      "endTime": "23 Mar 2024 04:51 pm"
    }
  ],
  "active_minutes": [
    {
      "value": 5,
      "startTimeMillis": "1711152001000",
      "endTimeMillis": "1711212714500",
      "startTime": "23 Mar 2024 12:00 am",
      "endTime": "23 Mar 2024 04:51 pm"
    }
  ],
  "calories_expended": [
    {
      "value": 225,
      "startTimeMillis": "1711152001000",
      "endTimeMillis": "1711212714500",
      "startTime": "23 Mar 2024 12:00 am",
      "endTime": "23 Mar 2024 04:51 pm"
    }
  ],
  "activity_summary": [],
  "sleep_segment": []
}} />} {/* Render Tracker component only when result is available */}
        </div>
    );
}

export default MyPage;
