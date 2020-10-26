
import { StorageItems } from '../enums/storage-items';
import { UserModel } from '../models/user-model';
import { UserRoles } from '../enums/user-roles';

const user_roles = {
    1: UserRoles.Sample_Receiver,
    2: UserRoles.Sample_Deliver,
    3: UserRoles.Sample_View
}

export const setUserDetails = (userModel: any) => {
    sessionStorage.setItem(StorageItems.LAB_AUTHENTICATED, "1");
    sessionStorage.setItem(StorageItems.LAB_USER_ID, userModel.Lab_Sample_Tracking_User_ID);
    sessionStorage.setItem(StorageItems.LAB_USER_ROLE, user_roles[userModel.Lab_Sample_Tracking_Role_Id]);
} 

export const getUserDetails = () => {
    const userModel = new UserModel();
    userModel.user_id = +sessionStorage.getItem(StorageItems.LAB_USER_ID);
    userModel.user_role = sessionStorage.getItem(StorageItems.LAB_USER_ROLE);
    return userModel;
}

export const isAuthenticated = () => {
    return sessionStorage.getItem(StorageItems.LAB_AUTHENTICATED)    
}