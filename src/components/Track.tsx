import { formatTrackingTime } from "@/helpers/formatTrackingTime";
import { TrackingEvents, TrackingSummary } from "@/types";
import {
  faMagnifyingGlass,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [trackingData, setTrackingData] = useState<TrackingSummary | null>(
    null,
  );
  const [events, setEvents] = useState<TrackingEvents | null>(null);
  const [eventDate, setEventDate] = useState<string | null>(null);

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
    <div className="text-white">
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
          <div className="mt-4 p-4 rounded-lg flex items-center justify-between bg-[var(--light)]">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTruckFast}
                className="p-2 bg-blue-500 text-[var(--dark)]"
              />
              <div>
                <p>Shipment status</p>
                <h3>{trackingData.lastEvent}</h3>
                <p>{`Last update :${trackingData.lastUpdate.split("T")[0]} ${formatTrackingTime(trackingData.lastUpdate)}`}</p>
              </div>
            </div>
            <div>
              <p>{trackingData.lastEvent}</p>
            </div>
          </div>
        )}
        <div>
          {trackingData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2 mx-0">
              <div className="card p-2 rounded bg-[var(--light)]">
                <p>Tracking #</p>
                {trackingNumber}
              </div>
              <div className="card p-2 rounded bg-[var(--light)]">
                <p>Carrier</p>
                {trackingData.carrier}
              </div>
              <div className="card p-2 rounded bg-[var(--light)]">
                <p>Estimated delivery</p>
                {trackingData.estimate.split("T")[0]}
              </div>
              <div className="card p-2 rounded bg-[var(--light)]">
                <p>Origin</p>
                {trackingData.origin ? (
                  <p>{trackingData.origin}</p>
                ) : (
                  "No origin"
                )}
              </div>
              <div className="card p-2 rounded bg-[var(--light)]">
                <p>Destination</p>
                {trackingData.destination ? (
                  <p>{trackingData.destination}</p>
                ) : (
                  "No destination"
                )}
              </div>

              <div className="card p-2 rounded bg-[var(--light)]">
                <p>
                  <p>Service type</p>
                </p>
                <p>international</p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-[var(--light)] rounded-xl p-4">
          <h3>Tracking events</h3>
          {events?.events.map((event, index) => {
            const isLast = index === events.events.length - 1;
            const isFirst = index === 0;

            return (
              <div key={event.eventId} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={` h-2 w-2 rounded-full ${
                      isFirst ? "bg-blue-500" : "bg-green-500"
                    }`}
                  ></div>

                  {!isLast && (
                    <div className="m-1 h-full w-[1px] bg-gray-600" />
                  )}
                </div>

                <div className="py-2">
                  <div className="flex">
                    <p className="text-xs">
                      {event.occurrenceDatetime.split("T")[0]}
                    </p>

                    <p className="mx-1 text-xs"> · </p>

                    <p className="text-xs">
                      {" "}
                      {formatTrackingTime(event.occurrenceDatetime)}
                    </p>
                  </div>

                  <p className="text-base">{event.status}</p>
                  <p className="text-xs">{event.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Track;
