import React from "react";

const Loading = () => {
  return (
    <>
      {/* Title Area */}
      <div className=" bg-black text-center  grid place-content-center"></div>

      <div className="flex scl row-span-6 place-self-center animation-blink">
        LOADING...
      </div>
    </>
  );
};

export default Loading;
