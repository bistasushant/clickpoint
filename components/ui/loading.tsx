import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-900"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
