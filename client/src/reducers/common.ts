export type Screen = HomePage | BoardPage;

type HomePage = {
  type: "HOME";
};

type BoardPage = {
  type: "BOARD";
  title: string;
};

export type CommonState = {
  screen: Screen;
};

export const UPDATE_TITLE = "UPDATE_TITLE";

interface UpdateScreen {
  type: typeof UPDATE_TITLE;
  payload: Screen;
}

export type CommonAction = UpdateScreen;

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
    case UPDATE_TITLE:
      return {
        ...state,
        screen: action.payload,
      };
    default:
      return state;
  }
}
