export default interface Request {
  accepted: boolean | null;
  totalCost: boolean;
  paid: boolean;
  completed: boolean;
  rating: boolean;
  notes: string;
  viewed: boolean;
  _id: string;
  ownerId: string;
  sitterId: string;
  sitterInfo: { username: string; email: string };
  duration: {
    _id: string;
    start: string;
    end: string;
  };
  __v: number;
}

export default interface RequestData {
  after: [Request];
  before: [Request];
  nextRequest: Request;
}
