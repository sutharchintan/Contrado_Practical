import { PagerState } from '../models';
import { PagerActions } from '../enums/pager-actions';

export const pagerReducer = (state: PagerState = new PagerState(), action: any) => {
    switch (action.type) {
        case PagerActions.Set_Pager:
            return {
                ...state,
                totalRecords: action.payload.totalRecords ? action.payload.totalRecords : state.totalRecords,
                pageSize: action.payload.pageSize ? action.payload.pageSize : state.pageSize,
                page: action.payload.page ? action.payload.page : state.page
            }
        default:
            if (state.page === undefined) {
                state.page = 1;
                state.pageSize = 10;
            }

            return state;
    }
}