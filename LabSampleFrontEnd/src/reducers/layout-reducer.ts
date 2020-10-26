import { LayoutState } from '../models';
import { LayoutActions } from '../enums/layout-actions';

export const layoutReducer = (state: LayoutState = new LayoutState(), action: any) => {
    switch (action.type) {
        case LayoutActions.Show_Loading:
            return {
                ...state,
                loading: action.payload
            }

        case LayoutActions.Show_Error:
            return {
                ...state,
                showError: true,
                errorMessage: action.payload
            }

        case LayoutActions.Hide_Error:
            return {
                ...state,
                showError: false,
                errorMessage: ""
            }

        case LayoutActions.Current_Record:
            return {
                ...state,
                currentRecord: action.payload
            }

        default:
            if (state.loading !== undefined) {
                state.loading = false;
            }

            return state;
    }
}