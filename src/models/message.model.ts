import { Alert } from "./alert.model";
import { Person } from "./person.model";

export interface Message {
  id: number;
  date: Date;
  alert: Alert;
  sender: Person;
  value: string;
}