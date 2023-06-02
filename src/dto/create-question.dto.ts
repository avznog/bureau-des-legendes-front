import { Form } from "../models/form.model";

export interface CreateQuestionDto {
  form: Form;
  question: string;
}