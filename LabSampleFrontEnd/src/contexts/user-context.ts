
import { StorageItems } from '../enums/storage-items';
import { UserModel } from '../models/user-model';

export const setUserDetails = (userModel: any) => {
    sessionStorage.setItem(StorageItems.LAB_AUTHENTICATED, "1");
    sessionStorage.setItem(StorageItems.LAB_USER_ID, userModel.Lab_Sample_Tracking_User_ID);
    sessionStorage.setItem(StorageItems.LAB_USER_ROLE, userModel.Role_Name);
    sessionStorage.setItem(StorageItems.LAB_USER_CODE, userModel.User_Code);
} 

export const getUserDetails = () => {
    const userModel = new UserModel();
    userModel.user_id = +sessionStorage.getItem(StorageItems.LAB_USER_ID);
    userModel.user_role = sessionStorage.getItem(StorageItems.LAB_USER_ROLE);
    userModel.user_code = sessionStorage.getItem(StorageItems.LAB_USER_CODE);
    return userModel;
}

export const isAuthenticated = () => {
    return sessionStorage.getItem(StorageItems.LAB_AUTHENTICATED)    
}