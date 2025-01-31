export type Session = {
  user: string;
  meat: string;
  weight: number;
  timeTemp: string;
}

export interface SessionRequest {
  body: Session;
  params: {
    id: number,
  };
}
