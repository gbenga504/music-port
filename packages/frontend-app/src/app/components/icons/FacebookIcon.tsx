import React from "react";

interface IProps {
  size?: number;
}

export const FacebookIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style={{ width: size, height: size }}
      viewBox="0 0 12 20"
    >
      <path
        d="M11.2137 11.165L11.8356 7.57282H7.94521V5.24175C7.94521 4.25884 8.48866 3.30097 10.2312 3.30097H12V0.242718C12 0.242718 10.3947 0 8.85995 0C5.65589 0 3.56164 1.72039 3.56164 4.83495V7.57282H0V11.165H3.56164V19.849C4.2867 19.9497 5.01951 20.0002 5.75342 20C6.48734 20.0002 7.22015 19.9497 7.94521 19.849V11.165H11.2137Z"
        fill="#0000FF"
      />
    </svg>
  );
};
