import { TableDataInterface} from "../interfaces/table_data_inreface";
export const tableActions:string[]=["view","edit","delete"]

//currently order has to be  maintained  
export const TableData :TableDataInterface[]= [
    {
    userId:"1",
    name: 'Siddhant Agarwal3', 
    age:24,
    dateOfBirth: new Date("1999-07-12"), 
    indianCitizen: true, 
    actions: tableActions,
},
{
    userId:"2",
    name: 'Siddhant Agarwal1', 
    age:24,
    dateOfBirth: new Date("1999-07-14"), 
    indianCitizen: false, 
    actions: tableActions,
},
{
    userId:"3",
    name: 'Siddhant Agarwal4', 
    age:25,
    dateOfBirth: new Date("1999-07-11"), 
    indianCitizen: false, 
    actions: tableActions,
},
{
    userId:"4",
    name: 'Siddhant Agarwal2', 
    age:26,
    dateOfBirth: new Date("1999-07-15"), 
    indianCitizen: true, 
    actions: tableActions,
},
{
    userId:"5",
    name: 'Siddhant Agarwal5', 
    age:27,
    dateOfBirth: new Date("1999-07-13"), 
    indianCitizen: false, 
    actions: tableActions,
},
{
    userId:"50",
    name: 'Siddhant Agarwal50', 
    age:27,
    dateOfBirth: new Date("1999-07-13"), 
    indianCitizen: false, 
    actions: tableActions,
},
{
    userId:"500",
    name: 'Siddhant Agarwal500', 
    age:27,
    dateOfBirth: new Date("1999-07-13"), 
    indianCitizen: true, 
    actions: tableActions,
}


] 