export interface CareerItem {
  title: string;
  website: string;
  subTitle: string;
  dateFrom: string; // ISO date string
  dateTo?: string; // ISO date string, optional
  technologies?: string[];
  content: string;
}

