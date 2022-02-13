import { CommonAction, CommonState, UPDATE_SCREEN } from "../state/common";

const defaultCommonState: CommonState = {
  screen: {
    type: "HOME",
  },
};

export default function commonReducer(
  state = defaultCommonState,
  action: CommonAction
) {
  switch (action.type) {
    case UPDATE_SCREEN:
      return {
        ...state,
        screen: action.payload,
      };
    default:
      return state;
  }
}
