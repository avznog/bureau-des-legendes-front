import { FormTemplate } from "./form-template.model";
import { Question } from "./question.model";

export interface Answer {
  id: number;
  question: Question;
  answer: string;
  form: FormTemplate;
}