import React from "react";

interface IProps {
  size?: number;
}

export const FacebookIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 36 60"
      style={{ width: size, height: size }}
    >
      <image
        width="36"
        height="60"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA8CAYAAAAOhRhuAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHdSURBVHgB7ZpNSsNAGIbfb4yuXGRhFMGFnqC9gT2CLm27yA16BNsTiCeoghTBjTewR+gNTEEotoVmqf3J56S0IorMT1OYxTybCeGb5MlM5i8TQsFE1bcyU1AhFiWAywSEDJz+jJHnkjxlpoSIU2bus0wFix6hAML4Ndyb7jeALP59c1M2ForqwwYYTfm4IQpgI6HD2rAtiztGgVgLRVfDFxBXUDACFkS14c02ZHKMSyiqDmL5HG1sCYsSEtfYIkZCB/VBBRs2axWBSTAtRIwiei6ilJhTbCokZc5hC3MXJO5n2aKbPh4n/99CkzCehLvT6QQWyN67Ne4cNXVitd+hYP5Rhh13ujI5Vv2QEbPZrUm4thBD2IxV6ejppGeSQVtIZJmVEAzZfpUZ4oVUeCEVzgkFB/VRRStysSjbDKza15fMg3lCUfWd4QgkcOlUlWUQqVNC44eo65AQLcc8Z4QIWT9PnRHKwG6VkBDCLSH+nCV56ozQeiLniBB9zyoDRtbSyxSUZEu4gBmpvL5yTr3+gLU61sNyTZ+MOkdnJhn89EOFF1LhhVR4IRVeSIUXUuGFVHghFV5IhRdS4YVUeCEVBht4Oz0GPxNTSMSnTBT++XlgtVPIyxUrEiJKYMgXDpSR1I0ZvB0AAAAASUVORK5CYII="
      />
    </svg>
  );
};
