/**
 * @description
 * This hook was adapted from the use hooks ts site
 * @see https://usehooks-ts.com/react-hook/use-ssr
 */
function useSsr() {
  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement;

  return {
    isBrowser: isDOM,
    isServer: !isDOM,
  };
}

export default useSsr;
