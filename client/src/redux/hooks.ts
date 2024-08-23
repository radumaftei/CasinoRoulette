import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useDispatchHook: () => AppDispatch = useDispatch;
export const useSelectHook: TypedUseSelectorHook<RootState> = useSelector;
