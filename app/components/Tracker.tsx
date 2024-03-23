import { useState } from "react";
import { useEffect } from "react";
const Dashboard = ({ result }) => {
    // State for storing calories expended and target
    const [caloriesExpended, setCaloriesExpended] = useState(0);
    const [caloriesTarget, setCaloriesTarget] = useState(1000); // Set your target value here

    // Calculate progress percentage
    const progress = (caloriesExpended / caloriesTarget) * 100;

    // Update calories expended on component mount
    useEffect(() => {
        // Calculate total calories expended
        const totalCalories = result.calories_expended.reduce((acc, curr) => acc + curr.value, 0);
        setCaloriesExpended(totalCalories);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col items-center">
            <h2 className="text-4xl text-center font-sans text-violet-700 font-semibold mb-8">Fitness Dashboard</h2>

            {/* Steps Count Section */}
            <div className="bg-gray-100 p-6 text-center w-[60%] rounded-full mb-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold mb-2">Steps Count</h3>
                <div className="text-center text-xl">
                    {/* Loop through steps count data */}
                    {result.steps_count.map((step, index) => (
                        <div key={index}>
                            <p className="text-gray-600 font-bold ">Value: {step.value}</p>
                            <p className="text-gray-600">Start Time: {step.startTime}</p>
                            <p className="text-gray-600">End Time: {step.endTime}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Minutes Section */}
            <div className="bg-gray-100 p-6 text-center w-[60%] rounded-full mb-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold mb-2">Active Minutes</h3>
                <div className="text-center text-xl">
                    {/* Loop through active minutes data */}
                    {result.active_minutes.map((active_minute, index) => (
                        <div key={index}>
                            <p className="text-gray-600 font-bold">Value: {active_minute.value}</p>
                            <p className="text-gray-600">Start Time: {active_minute.startTime}</p>
                            <p className="text-gray-600">End Time: {active_minute.endTime}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calories Expended Section */}
            <div className="bg-gray-100 p-6 text-center w-[60%] rounded-full mb-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold mb-2">Calories Expended</h3>
                <div className="flex items-center justify-center">
                    {/* Circular progress bar */}
                    <div className="relative w-32 h-32">
                        <svg className="absolute" viewBox="0 0 36 36">
                            <path
                                className="text-gray-200 stroke-current"
                                fill="none"
                                strokeWidth="3"
                                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="text-blue-500 stroke-current"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray={`${progress}, 100`}
                                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="absolute w-28 h-28 flex items-center justify-center bg-white rounded-full">
                            <p className="text-2xl font-semibold">{caloriesExpended}</p>
                            <p className="text-gray-500">/ {caloriesTarget}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
