import React, { ReactNode } from "react";
import { Button } from "./Button";
import {
  CopyIcon,
  FacebookIcon,
  LinkedInIcon,
  SuccessCelebrationIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "./icons";

import { Modal } from "./Modal";
import { Space } from "./Space";
import { Input } from "./Input";

interface IProps {
  open: boolean;
  link: string;
  fromPlatform: string;
  toPlatform: string;
  onClose: () => void;
}

export const PlaylistConvertedModal: React.FC<IProps> = ({
  open,
  fromPlatform,
  toPlatform,
  link,
}) => {
  const renderHeadline = () => {
    return (
      <div className="my-8 text-black text-center">
        <h3 className="text-2xl lg:text-4xl">Successfully Converted</h3>
        <div className="mt-4">
          <span className="text-primaryGray">
            Your {fromPlatform} playlist has been successfully converted to an
            {toPlatform} music playlist. You can copy or visit the link below
          </span>
        </div>
      </div>
    );
  };

  const renderSocialShare = () => {
    return (
      <div className="mt-16">
        <h6 className="text-primaryGray text-lg mb-6 text-center">Share via</h6>
        <Space size="small">
          <Shareable className="border-whatsapp">
            <WhatsappIcon />
          </Shareable>
          <Shareable className="border-twitter">
            <TwitterIcon />
          </Shareable>
          <Shareable className="border-telegram">
            <TelegramIcon />
          </Shareable>
          <Shareable className="border-linkedIn">
            <LinkedInIcon />
          </Shareable>
          <Shareable className="border-facebook">
            <FacebookIcon />
          </Shareable>
        </Space>
      </div>
    );
  };

  return (
    <Modal width="lg" open={open}>
      <div className="flex flex-col items-center">
        <SuccessCelebrationIcon size={150} />
        {renderHeadline()}
        <Space.Compact className="w-full">
          <Input
            value={link}
            disabled
            fullWidth
            className="!border-mediumGray"
          />
          <Button variant="contained" color="primary">
            <CopyIcon className="mr-2" />
            Copy
          </Button>
        </Space.Compact>
        {renderSocialShare()}
      </div>
    </Modal>
  );
};

interface IShareable {
  children: ReactNode;
  className: string;
}

const Shareable: React.FC<IShareable> = ({ children, className }) => {
  return (
    <Button variant="transparent">
      <div
        className={`w-12 h-12 rounded-full flex border items-center justify-center ${className}`}
      >
        {children}
      </div>
    </Button>
  );
};
