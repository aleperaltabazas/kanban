export type Screen = HomePage | BoardPage | TrashPage;

type HomePage = {
  type: "HOME";
};

type BoardPage = {
  type: "BOARD";
  title: string;
};

type TrashPage = {
  type: "TRASH";
};

export type CommonState = {
  screen: Screen;
};

export const UPDATE_SCREEN = "UPDATE_SCREEN";

interface UpdateScreen {
  type: typeof UPDATE_SCREEN;
  payload: Screen;
}

export type CommonAction = UpdateScreen;
