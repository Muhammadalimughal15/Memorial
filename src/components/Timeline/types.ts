export type TimelineEntry = {
  id: string;
  year: string;
  month: string;
  day: string;
  headline: string;
  description: string;
};

export type TimelineData = {
  enabled: boolean;
  title: string;
  entries: TimelineEntry[];
};