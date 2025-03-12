import { create } from "zustand";

export const usePopup = create((set) => ({
  deletepopup: false,
  deletelessonpopup: false,
  //canceldeletepopup: false,
  confirmpopup: false,
  confirmlessonpopup: false,
  articleCardId: null,
  lessonCardId: null,

  signuppopup: false,
  likespopup: false,
  errorMsg: null,
  doneMsg: null,
  signuperrorpopup: false,

  setLessonConfirmpopup: (state: void, id: string) =>
    set({ deletelessonpopup: state, lessonCardId: id }),
  setConfirmpopup: (state: void, id: string) =>
    set({ confirmpopup: state, articleCardId: id }),
  setDeleteLessonpopup: (state: void, statement: void) =>
    set({ deletelessonpopup: state, confirmpopup: statement }),
  setDeletepopup: (state: void, statement: void) =>
    set({ deletepopup: state, confirmpopup: statement }),

  setCancelDeletepopup: (state: void, statement: void) =>
    set({ deletepopup: state, confirmpopup: statement }),

  setSignuppopup: (state: void, done: string) =>
    set({ signuppopup: state, doneMsg: done }),
  setSignErroruppopup: (state: void, error: string) =>
    set({ signuperrorpopup: state, errorMsg: error }),
  closePopup: () => set({ popup: false }),
  setLikespopup: () => {
    set({ likespopup: true });
    setTimeout(() => {
      set({ likespopup: false });
    }, 1000);
  },
}));
