import {
  faMagnifyingGlass,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type TrackingSummary = {
  lastEvent: string;
  lastUpdate: string;
  carrier: string;
  estimate: string;
  origin: string;
  destination: string;
  servicetype: string;
};

type TrackingEvents = {
  events: string[];
};

type Event = {
  status: string;
  location: string;
  date: string;
};

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [trackingData, setTrackingData] = useState<TrackingSummary | null>(
    null,
  );
  const [events, setEvents] = useState<TrackingEvents | null>(null);

  const trackPackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackingNumber,
      }),
    });

    const data = await response.json();
    console.log(data);
    setTrackingData({
      lastEvent: data.data.trackings[0].events[0].status,
      lastUpdate: data.data.trackings[0].events[0].occurrenceDatetime,
      carrier: data.data.trackings[0].events[0].courierCode,
      estimate: data.data.trackings[0].events[0].occurrenceDatetime,
      origin: data.data.trackings[0].shipment.originCountryCode,
      destination: data.data.trackings[0].shipment.destinationCountryCode,
      servicetype: data.data.trackings[0].shipment.destinationCountryCode,
    });
    setEvents({
      events: data.data.trackings[0].events,
    });
  };

  return (
    <div className="text-white h-screen">
      <div className="input-container py-4 my-0 mx-auto max-w-[40%]">
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
        {trackingData && (
          <div className="mt-4 border p-4 rounded flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <div>
              <p>Shipment status</p>
              <h3>{trackingData.lastEvent}</h3>
              <p>{`Last update : ${trackingData.lastUpdate}`}</p>
            </div>
            <div>
              <p>{trackingData.lastEvent}</p>
            </div>
          </div>
        )}
        <div>
          {trackingData && (
            <div className="flex flex-wrap">
              <div className="card w-[33%]">
                <p>Tracking #</p>
                {trackingNumber}
              </div>
              <div className="card w-[33%]">
                <p>Carrier</p>
                {trackingData.carrier}
              </div>
              <div className="card w-[33%]">
                <p>Estimated delivery</p>
                {trackingData.estimate}
              </div>
              <div className="card w-[33%]">
                <p>Origin</p>
                {trackingData.origin ? (
                  <p>{trackingData.origin}</p>
                ) : (
                  "No origin"
                )}
              </div>
              <div className="card w-[33%]">
                <p>Destination</p>
                {trackingData.destination ? (
                  <p>{trackingData.destination}</p>
                ) : (
                  "No destination"
                )}
              </div>

              <div className="card w-[33%]">
                <p>
                  <p>Service type</p>
                </p>
                <p>international</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
