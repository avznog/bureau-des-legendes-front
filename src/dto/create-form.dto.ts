import { FormType } from "../constants/form.type";

export interface CreateFormDto {
  creationDate: Date;
  type: FormType;
  teamId: number;
  creatorId: number;
}