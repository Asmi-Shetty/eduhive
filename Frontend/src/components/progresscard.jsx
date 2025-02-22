// import React, { useState, useEffect, useRef } from "react";
// // import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// // import "react-circular-progressbar/dist/styles.css";

// const ProgressTracker = () => {
//   const [dailyProgress, setDailyProgress] = useState(0);
//   const [weeklyProgress, setWeeklyProgress] = useState(0);

//   // Get the start of the current day
//   const startOfDay = useRef(new Date().setHours(0, 0, 0, 0));

//   // Get the start of the current week (Monday)
//   const today = new Date();
//   const startOfWeek = useRef(new Date(today.setDate(today.getDate() - today.getDay() + 1)).setHours(0, 0, 0, 0));

//   useEffect(() => {
//     const updateProgress = () => {
//       const currentTime = Date.now();

//       // Daily Progress Calculation
//       const elapsedTimeToday = currentTime - startOfDay.current;
//       const dailyProgressPercentage = Math.min((elapsedTimeToday / 86400000) * 100, 100); // 24 hours in ms

//       // Weekly Progress Calculation
//       const elapsedTimeThisWeek = currentTime - startOfWeek.current;
//       const weeklyProgressPercentage = Math.min((elapsedTimeThisWeek / 604800000) * 100, 100); // 7 days in ms

//       setDailyProgress(dailyProgressPercentage);
//       setWeeklyProgress(weeklyProgressPercentage);
//     };

//     updateProgress();
//     const interval = setInterval(updateProgress, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-10 justify-center items-center text-white">
//       {/* Daily Progress */}
//       <div className="flex flex-col items-center">
//         <div style={{ width: 180, height: 180 }}>
//           <CircularProgressbar
//             value={dailyProgress}
//             text={`${Math.round(dailyProgress)}%`}
//             styles={buildStyles({
//               textColor: "#ffffff", // White text
//               pathColor: "#4ade80", // Green progress bar
//               trailColor: "#374151", // Dark gray background
//             })}
//           />
//         </div>
//         <p className="text-center mt-2 text-gray-300 text-sm font-semibold">Daily Progress</p>
//       </div>

//       {/* Weekly Progress */}
//       <div className="flex flex-col items-center mt-6 sm:mt-0">
//         <div style={{ width: 180, height: 180 }}>
//           <CircularProgressbar
//             value={weeklyProgress}
//             text={`${Math.round(weeklyProgress)}%`}
//             styles={buildStyles({
//               textColor: "#ffffff", // White text
//               pathColor: "#60a5fa", // Blue progress bar
//               trailColor: "#374151", // Dark gray background
//             })}
//           />
//         </div>
//         <p className="text-center mt-2 text-gray-300 text-sm font-semibold">Weekly Progress</p>
//       </div>
//     </div>
//   );
// };

// export default ProgressTracker;
