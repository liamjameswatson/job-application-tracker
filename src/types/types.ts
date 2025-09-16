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
  link: string;
  dateApplied: string;
  status: string;
  resumeVersion: CV;
  contact?: Contact;
  coverLetter?: string;
};

export type { Job, CV, Contact };
