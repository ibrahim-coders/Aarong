const Loading = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-black"></div>
    </div>
  );
};

export default Loading;

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-white">
//       <div className="flex flex-col items-center gap-3">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <div className="text-orange-600 text-4xl animate-bounce">
//           <FaCar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loading;

// import { FaCar } from 'react-icons/fa';

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="flex flex-col items-center gap-4">
//         {/* Car with blinking headlights */}
//         <div className="relative text-orange-600 text-6xl animate-bounce">
//           <FaCar />
//           {/* Left Headlight */}
//           <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-blink"></div>
//           {/* Right Headlight */}
//           <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-blink"></div>
//         </div>
//         <p className=" text-lg tracking-wide animate-pulse">
//           Loading your ride...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Loading;
