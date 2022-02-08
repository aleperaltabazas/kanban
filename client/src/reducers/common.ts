import { useHistory } from "react-router";

export type CommonState = {
  title: string;
};

export const UPDATE_TITLE = "UPDATE_TITLE";

interface UpdateTitle {
  type: typeof UPDATE_TITLE;
  payload: string;
}

export type CommonAction = UpdateTitle;

const defaultCommonState: CommonState = {
  title: "Kanban",
};

export default function commonReducer(
  state = defaultCommonState,
  action: CommonAction
) {
  switch (action.type) {
    case UPDATE_TITLE:
      document.title = action.payload;

      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
}
