
export interface EmployeeType {
    firstname : string;
    lastname : string;
    email : string;
    mobile : number;
    designation ?: string;
    salary ?: number;
}

export interface EntrySchemaType {
    firstname : string;
    lastname : string;
    createdAt : any;
}
