import { Status } from "../constants/status.type";
import { Form } from "./form.model";
import { Message } from "./message.model";
import { Person } from "./person.model";

export interface Alert {
  id: number;
  creationDate: Date;
  anonymous: boolean;
  sendMail: boolean;
  status: Status;
  messages: Message[];
  filler: Person;
  reviewer: Person;
  form: Form;
}