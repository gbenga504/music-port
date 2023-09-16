import classNames from "classnames";
import React from "react";

import { Button } from "./Button/Button";
import { Space } from "./Space";
import { FacebookIcon, LinkedInIcon, TwitterIcon } from "./icons";


export const Footer: React.FC = () => {
  return (
    <footer
      className={classNames(
        "mt-40 border-t border-secondaryAlpha py-12 items-center text-sm",
        "flex flex-col md:flex-row",
        "md:justify-between"
      )}
    >
      <Space
        size="large"
        className="flex flex-col-reverse w-full !items-start md:inline-flex md:flex-row md:w-auto md:items-center"
      >
        <span>
          &copy; {new Date().getFullYear()} MusicPort | All Rights Reserved
        </span>
        <Button variant="transparent" size="small" to="#">
          Terms and privacy
        </Button>
      </Space>

      <Space className="mt-6 md:mt-0 w-full md:w-auto !items-start md:items-center">
        <Button variant="transparent" size="small">
          <TwitterIcon />
        </Button>
        <Button variant="transparent" size="small">
          <FacebookIcon />
        </Button>
        <Button variant="transparent" size="small">
          <LinkedInIcon />
        </Button>
      </Space>
    </footer>
  );
};
