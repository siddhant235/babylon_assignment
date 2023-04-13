export const ROUTES={
    USERS:"/users",
    USER_DETAILS:(userId:string)=>routeToUserDetails(userId),
    USER_EDIT:(userId:string)=>routeToUserEdit(userId)
}

const routeToUserDetails=(userId:string):string=>`${ROUTES.USERS}/user/${userId}`
const routeToUserEdit=(userId:string):string=>`${ROUTES.USERS}/user/${userId}/edit`