class EventIdService {
  private readonly eventIdStoreKey = 'ton-connect-service-event-id';

  private eventId = 0;

  constructor() {
    const value = localStorage.getItem(this.eventIdStoreKey);
    this.eventId = Number(value);
  }

  public getId() {
    this.eventId++;
    localStorage.setItem(this.eventIdStoreKey, String(this.eventId));
    return this.eventId;
  }
}

export const TCEventID = new EventIdService();
