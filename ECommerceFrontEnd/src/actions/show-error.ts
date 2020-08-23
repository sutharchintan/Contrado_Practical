import { LayoutActions } from '../enums';

export const showError = (errorMessage: string) => {
    return { type: LayoutActions.Show_Error, payload: errorMessage }
}