import { Status } from "../constants/status.type";

export interface CreateAlertDto {
  creationDate: Date;
  anonymous: boolean;
  sendMail: boolean;
  status: Status;
  fillerId: number;
  reviewerId: number;
  formId: number;
}