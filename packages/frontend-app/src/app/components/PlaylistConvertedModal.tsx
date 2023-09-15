import React, { ReactNode, ComponentProps } from "react";
import { Button } from "./Button/Button";
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
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useToast } from "./Toast/ToastContext";

interface IProps {
  open: boolean;
  link: string | null;
  fromPlatform: string;
  toPlatform: string;
  onClose: () => void;
}

export const PlaylistConvertedModal: React.FC<IProps> = ({
  open,
  fromPlatform,
  toPlatform,
  link,
  onClose,
}) => {
  const toast = useToast();
  const [_, copy] = useCopyToClipboard();

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
    const encodedText = encodeURIComponent(
      `You can access your ${toPlatform} playlist with this link`
    );

    return (
      <div className="mt-16">
        <h6 className="text-primaryGray text-lg mb-6 text-center">Share via</h6>
        <Space size="small">
          <Shareable
            className="border-whatsapp"
            buttonProps={{
              href: `whatsapp://send?text=You can access your ${toPlatform} playlist here ${link}`,
              target: "_blank",
            }}
          >
            <WhatsappIcon />
          </Shareable>
          <Shareable
            className="border-twitter"
            buttonProps={{
              href: `http://twitter.com/share?text=${encodedText}&url=${link}&hashtags=music,converter,musicport`,
              target: "_blank",
            }}
          >
            <TwitterIcon />
          </Shareable>
          <Shareable
            className="border-telegram"
            buttonProps={{
              href: `https://t.me/share/url?url=${link}&text=You can access your ${toPlatform} playlist with this link`,
              target: "_blank",
            }}
          >
            <TelegramIcon />
          </Shareable>
          <Shareable
            className="border-linkedIn"
            buttonProps={{
              href: `https://www.linkedin.com/shareArticle?mini=true&url=${link}&summary=${encodedText}&source=${encodeURIComponent(
                process.env.SITE_ORIGIN!
              )}`,
              target: "_blank",
            }}
          >
            <LinkedInIcon />
          </Shareable>
          <Shareable
            className="border-facebook"
            buttonProps={{
              href: `https://www.facebook.com/dialog/share?app_id=${process.env.FACEBOOK_APP_ID}&display=popup&href=${link}&quote=You can access your ${toPlatform} playlist with this link`,
              target: "_blank",
            }}
          >
            <FacebookIcon />
          </Shareable>
        </Space>
      </div>
    );
  };

  return (
    <Modal width="lg" open={open} onClose={onClose}>
      <div className="flex flex-col items-center">
        <SuccessCelebrationIcon size={150} />
        {renderHeadline()}
        <Space.Compact className="w-full">
          <Input
            value={link ?? ""}
            disabled
            fullWidth
            className="!border-mediumGray"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              copy(link as string);
              toast({
                title: "Link copied to cliboard!",
                status: "info",
              });
            }}
          >
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
  buttonProps?: ComponentProps<typeof Button>;
}

const Shareable: React.FC<IShareable> = ({
  children,
  className,
  buttonProps,
}) => {
  return (
    <Button variant="transparent" {...buttonProps}>
      <div
        className={`w-12 h-12 rounded-full flex border items-center justify-center ${className}`}
      >
        {children}
      </div>
    </Button>
  );
};
