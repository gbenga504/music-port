export const sleep = (duration: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
};
