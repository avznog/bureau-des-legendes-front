import { Form } from "./form.model";
import { Question } from "./question.model";

export interface Answer {
  id: number;
  question: Question;
  answer: string;
  form: Form;
}