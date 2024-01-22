import React from "react";

import { Modal } from "./Modal/Modal";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} title="Coming Soon!!!" onClose={onClose}>
      <div className="text-secondary100 mt-4">
        This feature is coming soon. Please check back in a few weeks. To
        contribute to the development of this feature, checkout our{" "}
        <a
          className="text-primary underline"
          href="https://github.com/gbenga504/music-port"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        page
      </div>
    </Modal>
  );
};
