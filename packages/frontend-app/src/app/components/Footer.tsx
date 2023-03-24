import React from "react";
import classNames from "classnames";

import { Space } from "./Space";
import { Button } from "./Button";
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
      <Space size="large">
        <span>
          &copy; {new Date().getFullYear()} Conplay | All Rights Reserved
        </span>
        <Button variant="transparent" size="small" to="#">
          Terms and privacy
        </Button>
      </Space>

      <Space className="mt-3 md:mt-0">
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
