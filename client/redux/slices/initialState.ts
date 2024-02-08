export type SameStateType = {
  tasks?: Array<Object> | any;
  fetchError?: Array<String>;
  actionStatus?: string;
};

export const sameState: SameStateType = {
  tasks: [],
  fetchError: [],
  actionStatus: "idle",
};
