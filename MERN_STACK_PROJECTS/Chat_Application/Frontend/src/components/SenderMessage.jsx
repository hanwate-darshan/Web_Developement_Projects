import React from "react";
import dp from "../assets/dp.png";

const SenderMessage = () => {
  return (
    <div className="flex justify-end mb-3 px-2">
      <div className="max-w-[70%]  text-black rounded-2xl rounded-br-sm px-4 py-2 shadow-md flex flex-col gap-2">

        {/* Image (optional message image) */}
        <img
          src={dp}
          alt="sent"
          className="w-40 rounded-lg object-cover"
        />

        {/* Text message */}
        <span className="text-sm leading-relaxed">
          Hi
        </span>

        {/* Time */}
        <span className="text-[10px] text-black-100 self-end">
          10:45 AM
        </span>
      </div>
    </div>
  );
};

export default SenderMessage;
