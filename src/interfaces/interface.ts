
export interface EmployeeType {
    employeeId : string;
    firstname : string;
    lastname : string;
    email : string;
    mobile : number;
    designation ?: string;
    salary ?: number;
}

export interface EntrySchemaType {
    employeeId : string | number;
    name : string;
}

export interface ProjectType {
    employeeId : string ;
    name : string;
    project : string;
    role : string;
    projectManager : string;
}

