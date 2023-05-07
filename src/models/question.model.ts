import { Answer } from "./answer.model";
import { FormTemplate } from "./form-template.model";

export interface Question {
  id: number;
  form: FormTemplate;
  question: string;
  answers: Answer[];
}