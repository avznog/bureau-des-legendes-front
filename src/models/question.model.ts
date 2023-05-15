import { Answer } from "./answer.model";
import { Form } from "./form.model";

export interface Question {
  id: number;
  form: Form;
  question: string;
  answers: Answer[];
}