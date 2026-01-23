export interface AssignedPerson {
  name: string;
  role: string;
}

export interface SoftwareProject {
  projectId: string;
  projectName: string;
  startDate: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  assignedTo: AssignedPerson;
  budget: number;
}
