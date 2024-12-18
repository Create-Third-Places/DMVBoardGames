export interface Event {
  id: number;
  title: string;
  dayOfWeek: number;
  location: string;
  summary: string;
}

export interface Group {
  id: number;
  events: Event[];
  link: string;
  title: string;
  summary: string;
}

export interface Convention {
  id: number;
  title: string;
  date: Date;
}

export interface EventListingData {
  groups: Group[];
  conventions: Convention[];
}
