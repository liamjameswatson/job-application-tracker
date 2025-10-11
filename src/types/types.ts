import { statuses } from "../constants/statuses";

type CV = {
  id: number;
  title: string;
  link: string;
};

type Contact = {
  name: string;
  email: string;
  phoneNumber: string;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  platform: string;
  platformApplied: string;
  followUpDate: Date;
  link: string;
  dateApplied: string;
  status: string;
  resumeVersion: CV;
  contact?: Contact;
  coverLetter?: string;
  notes?: string;
};

type Status = string;

type Statuses = typeof statuses;

export type { Job, CV, Contact, Status, Statuses };
