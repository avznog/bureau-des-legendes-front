import { FormType } from '../constants/form.type';
import { Alert } from './alert.model';
import { Person } from './person.model';
import { Question } from './question.model';
import { Team } from './team.model'

export interface Form {
  id: number;
  creationDate: Date;
  type: FormType;
  team: Team;
  creator: Person;
  alerts: Alert[];
  questions: Question[];
}