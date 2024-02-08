export const useError = (error: any, state: any) => {
  if (error.length > 0) {
    const onlyMessage: any = error.map((el: any) => {
      const keyName: any = Object.keys(el).find((x: any) => x === "message");

      return el[keyName];
    });
    return (state = {
      ...state,
      fetchError: onlyMessage,
      actionStatus: "idle",
    });
  }
};
