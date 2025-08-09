export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  status: string;
  sellerId: number;
  buyerId?: number | null;
}
