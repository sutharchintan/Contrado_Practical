import { LayoutActions } from "../enums"

export const setCurrentRecord = (record) => {
    return { type: LayoutActions.Current_Record, payload: record }
}