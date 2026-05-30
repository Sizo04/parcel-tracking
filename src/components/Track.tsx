import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Track = () => {
  const trackPackage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(trackingNumber);
  };

  const [trackingNumber, setTrackingNumber] = useState<string>("");

  return (
    <div className="text-white h-screen">
      <div className="input-container py-4 my-0 mx-auto w-fit">
        <div>
          <h2>Track your shipment</h2>
          <p className="mb-2">
            Enter a tracking number to get real-time updates on your parcel's
            location and status.
          </p>
        </div>
        <form onSubmit={trackPackage} className="flex gap-2">
          <input
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-[90%] bg-[var(--light)] rounded"
            type="text"
            placeholder="e.g. TF-2024-887261"
          />
          <button
            className="flex items-center border-1 rounded py-1 px-3 border-gray-500 hover:bg-[var(--dark)]"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p>Track</p>
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default Track;
