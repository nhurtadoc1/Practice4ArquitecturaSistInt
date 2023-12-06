export type Business = {
    name: string;
    workers: Array<Worker>;
    id: string;
  };
  
  export type Task = {
    name: string;
    status: Status;
    workerID: Worker;
    businessID: Business;
    id: string;
  };
  
  export enum Status {
    TODO = "TODO",
    InProgress = "In Progress",
    InTest = "In Test",
    Closed = "Closed"
  };
  
  export type Worker = {
    name: string;
    id: string;
  };