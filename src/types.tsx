export type TrackingSummary = {
  lastEvent: string;
  lastUpdate: string;
  carrier: string;
  estimate: string;
  origin: string;
  destination: string;
  servicetype: string;
};

export type TrackingEvents = {
  events: Event[];
};

export type Event = {
  eventId: string;
  status: string;
  location: string;
  occurrenceDatetime: string;
};
