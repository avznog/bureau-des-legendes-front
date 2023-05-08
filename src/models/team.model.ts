import { FormTemplate } from './form-template.model';
import { Person } from './person.model';

export interface Team {
  id: number;
  name: string;
  manager: Person;
  rh: Person;
  members: Person[];
  forms: FormTemplate[];
}