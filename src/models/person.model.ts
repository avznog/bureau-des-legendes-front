import { Role } from "../constants/role.type";
import { Alert } from "./alert.model";
import { Message } from "./message.model";
import { Team } from "./team.model";

export interface Person {
  id: number;
  role: Role;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  photo: string;
  team: Team;
  messages: Message[];
  alerts: Alert[];
}