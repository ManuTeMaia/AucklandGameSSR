import { AppState } from 'src/client'

export type SelectorResponse<DATA> = (state: AppState) => DATA
