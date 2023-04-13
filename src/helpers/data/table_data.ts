import { TableDataInterface} from "../interfaces/table_data_inreface";
import { v4 as uuidv4 } from 'uuid';
const tableActions:string[]=["view","edit","delete"]

//currently order has to be  maintained  
export const TableData :TableDataInterface[]= [
    {
    userId:uuidv4(),
    name: 'Siddhant Agarwal', 
    age:24,
    dateOfBirth: new Date("15/07/1999"), 
    indianCitizen: true, 
    actions: tableActions,
},
{
    userId:uuidv4(),
    name: 'Siddhant Agarwal2', 
    age:24,
    dateOfBirth: new Date("15/07/1999"), 
    indianCitizen: false, 
    actions: tableActions,
}


] 