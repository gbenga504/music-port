export const isDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.documentElement
);
