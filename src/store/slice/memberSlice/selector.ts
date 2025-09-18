import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const memberSelect = (state: RootState) => state.member;

const selectMember = createSelector(memberSelect, (member) => member);

export const useMemberSelect = () => useSelector(selectMember);
