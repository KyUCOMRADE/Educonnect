// src/components/TutorCard.jsx
import React from "react";

export default function TutorCard({ name = "Tutor", subject = "", rating = "4.8", bio = "" }) {
  const initials = name.split(" ").map(n => n[0]).slice(0,2).join("");
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="text-sm text-gray-500">{subject}</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{bio}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">⭐ {rating}</div>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md">Book</button>
      </div>
    </div>
  );
}
