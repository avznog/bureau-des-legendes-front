import { Status } from "../constants/status.type";
import { FormTemplate } from "./form-template.model";
import { Message } from "./message.model";
import { Person } from "./person.model";

export interface Alert {
  id: number;
  creationDate: Date;
  anonymoous: boolean;
  sendMail: boolean;
  status: Status;
  messages: Message[];
  filler: Person;
  reviewer: Person;
  form: FormTemplate;
}