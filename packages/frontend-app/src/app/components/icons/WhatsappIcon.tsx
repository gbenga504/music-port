import React from "react";

interface IProps {
  size?: number;
  className?: string;
}

export const WhatsappIcon: React.FC<IProps> = ({ size = 20, className }) => {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 0C18.6276 0 24 5.3724 24 12C24 18.6276 18.6276 24 12 24C9.95755 24.003 7.94842 23.4824 6.16441 22.488L5.79841 22.2744L2.16001 23.3448C1.96201 23.4031 1.7524 23.4099 1.55103 23.3646C1.34966 23.3192 1.16322 23.2232 1.00937 23.0855C0.85553 22.9479 0.739382 22.7733 0.671942 22.5782C0.604501 22.3831 0.588003 22.174 0.62401 21.9708L0.65521 21.84L1.72561 18.2016C0.593961 16.3312 -0.00289685 14.1861 1.05714e-05 12C1.05714e-05 5.3724 5.37241 0 12 0ZM12 2.4C10.2812 2.39969 8.59375 2.86087 7.114 3.73538C5.63425 4.60989 4.41643 5.86565 3.58772 7.37153C2.75901 8.8774 2.34981 10.5782 2.40284 12.2962C2.45587 14.0142 2.9692 15.6865 3.88921 17.1384C4.12681 17.5128 4.22881 17.9736 4.14841 18.4308L4.10161 18.6264L3.57241 20.4276L5.37361 19.8984C5.89321 19.7448 6.43321 19.8384 6.86161 20.1108C8.1196 20.9073 9.54563 21.4003 11.027 21.5508C12.5083 21.7013 14.0044 21.5052 15.3969 20.9779C16.7893 20.4506 18.0401 19.6067 19.0502 18.5127C20.0603 17.4188 20.8022 16.1049 21.2171 14.6749C21.6319 13.2449 21.7085 11.738 21.4407 10.2733C21.1729 8.80863 20.568 7.42632 19.674 6.23565C18.7799 5.04498 17.6212 4.0786 16.2893 3.4129C14.9574 2.7472 13.489 2.40043 12 2.4ZM8.52241 6.2208C8.65526 6.16326 8.80081 6.14131 8.94473 6.15709C9.08864 6.17287 9.22597 6.22584 9.34321 6.3108C9.94801 6.7524 10.428 7.3452 10.8408 7.9236L11.2332 8.4924L11.4168 8.7624C11.5227 8.91729 11.5747 9.10275 11.5648 9.29014C11.5548 9.47753 11.4834 9.65643 11.3616 9.7992L11.2716 9.8904L10.1628 10.7136C10.1094 10.7522 10.0719 10.8089 10.0571 10.8731C10.0423 10.9373 10.0513 11.0047 10.0824 11.0628C10.3344 11.5188 10.7796 12.1992 11.2908 12.7104C11.8032 13.2216 12.5148 13.6968 13.002 13.9764C13.1076 14.0364 13.2348 14.0172 13.3212 13.9392L13.3668 13.8852L14.088 12.7872C14.2204 12.6108 14.4159 12.4926 14.6336 12.4572C14.8513 12.4219 15.0742 12.4722 15.2556 12.5976L15.9072 13.0524C16.5552 13.5144 17.178 14.0112 17.6712 14.6412C17.7629 14.7594 17.8212 14.9 17.84 15.0484C17.8588 15.1968 17.8374 15.3475 17.778 15.4848C17.3028 16.5936 16.0992 17.538 14.8488 17.4924L14.658 17.4804L14.4288 17.4588C14.3855 17.4537 14.3423 17.4481 14.2992 17.442L14.0136 17.394C12.9048 17.1852 11.1276 16.5564 9.28561 14.7156C7.44481 12.8736 6.81601 11.0964 6.60721 9.9876L6.55921 9.702L6.52921 9.4524L6.51361 9.2424C6.51171 9.21241 6.51011 9.18241 6.50881 9.1524C6.46321 7.8996 7.41241 6.696 8.52241 6.2208Z"
        fill="#4ECB71"
      />
    </svg>
  );
};