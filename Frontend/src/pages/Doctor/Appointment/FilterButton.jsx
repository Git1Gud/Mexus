import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabs = ({ setFilter }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border border-gray-300 bg-white p-1"
    >
      <Tab setPosition={setPosition} onClick={() => setFilter('all')}>
        All
      </Tab>
      <Tab setPosition={setPosition} onClick={() => setFilter('oldest')}>
        Oldest
      </Tab>
      <Tab setPosition={setPosition} onClick={() => setFilter('newest')}>
        Newest
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, onClick }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className="relative z-10 block cursor-pointer px-2 py-1 text-sm uppercase text-gray-700 hover:text-white"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black "
    />
  );
};
