import { CommonAction, UPDATE_SCREEN } from "../state/common";

export const updateScreenHomePage = (): CommonAction => ({
  type: UPDATE_SCREEN,
  payload: {
    type: "HOME",
  },
});

export const updateScreenTrashPage = (): CommonAction => ({
  type: UPDATE_SCREEN,
  payload: {
    type: "TRASH",
  },
});

export const updateScreenBoardPage = (title: string): CommonAction => ({
  type: UPDATE_SCREEN,
  payload: {
    type: "BOARD",
    title,
  },
});
