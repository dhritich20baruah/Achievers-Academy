"use client";
import Link from "next/link";
import TestPortal from "./AdminComponents/TestPortal";
import React, { useState } from "react";

export default function Admin() {
  const [testVisible, setTestVisible] = useState(false);
  return (
    <main>
      <h1 className="text-center text-xl font-semibold m-5">Dashboard</h1>
      <div className="m-20">
        <ul className="flex space-x-10 font-bold justify-evenly text-white">
          <li className="p-10 m-10 bg-red-700">Student Portal</li>
          <li
            className="p-10 m-10 bg-red-700 hover:cursor-pointer hover:bg-orange-700"
            onClick={() => setTestVisible(!testVisible)}
          >
            Exam Portal
          </li>
        </ul>
      </div>
      {testVisible && (
        <div className="p-10 absolute top-0 left-0 h-[100vh] overflow-auto w-full bg-white z-30">
            <button className="p-3 bg-red-700 text-white"  onClick={() => setTestVisible(!testVisible)}>CLOSE</button>
          <TestPortal />
        </div>
      )}
    </main>
  );
}
