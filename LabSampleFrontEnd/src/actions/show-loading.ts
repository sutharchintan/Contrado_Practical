import { LayoutActions } from '../enums';

export const showLoading = (loading: boolean) => {
    return { type: LayoutActions.Show_Loading, payload: loading }
}