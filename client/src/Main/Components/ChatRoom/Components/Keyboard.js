import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const Keyboard = () => {
  return (
    <section className="w-full bg-slate-300 px-5 py-3 ">
      <form action="" className="flex gap-2 ">
        <input type="text" className="w-full" />
        <button type="submit" className="bg-white p-1">
          <AiOutlineSend />
        </button>
      </form>
    </section>
  );
};

export default Keyboard;
