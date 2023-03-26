import React from "react";

interface IProps {
  size?: number;
}

export const LinkIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6885 14.5083L9.31146 15.7324C7.4101 17.4225 4.32738 17.4225 2.42602 15.7324C0.52466 14.0423 0.52466 11.3021 2.42602 9.61204L3.80311 8.38796M16.1969 9.61204L17.574 8.38796C19.4753 6.69786 19.4753 3.95767 17.574 2.26757C15.6726 0.577475 12.5899 0.577476 10.6885 2.26757L9.31146 3.49165M6.59188 12.0294L13.4081 5.97054"
        stroke="#ABA6A6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
