import { UserToken } from "@/api/modernCommuneApi";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserToken = {
  id: 0,
  memberId: 0,
  memberName: "",
  userName: "",
  level: "",
  refreshToken: null,
  expiredTime: "",
  token: "",
  validity: undefined,
};

export const memberSlice = createSlice({
  initialState,
  name: "member",
  reducers: {
    logout: () => initialState,
    setMember: (state, action: PayloadAction<UserToken>) => {
      state.id = action.payload.id;
      state.memberId = action.payload.memberId;
      state.memberName = action.payload.memberName;
      state.userName = action.payload.userName;
      state.level = action.payload.level;
      state.validity = action.payload.validity;
      state.refreshToken = action.payload.refreshToken;
      state.expiredTime = action.payload.expiredTime;
      state.token = action.payload.token;
    },
  },
});

export default memberSlice.reducer;
export const { logout, setMember } = memberSlice.actions;
