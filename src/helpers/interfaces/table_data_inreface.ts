export interface TableDataInterface {
    userId:string,
    name: string,
    age: number,
    dateOfBirth: Date |string,
    indianCitizen: boolean | string,
    actions: string[]  // todo think again can we keep this or not,
    address:string;
    email:string

}[]