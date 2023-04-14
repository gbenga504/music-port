import React, { useState } from "react";
import classNames from "classnames";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { AppHeader } from "../../components/AppHeader";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { Playlists } from "./Playlists";
import { CreatePlaylistModal } from "./CreatePlaylistModal";

const Community: React.FC<ILoadableComponentProps> = ({ query }) => {
  const { isAuthTokenAvailableForCreatingPlaylist } = query;
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(
    isAuthTokenAvailableForCreatingPlaylist === "true"
  );

  const renderHeadline = () => {
    return (
      <h3 className="font-bold text-2xl md:text-4xl">
        <span className="text-primary">Discover</span>
        <span> a new world of music with our shared community playlists</span>
      </h3>
    );
  };

  const renderTagline = () => {
    return (
      <span className="text-base px-0 md:px-12 text-primaryGray">
        Finally, you can preview lots of musical playlist shared by different
        users, in different genres and streaming services for you to enjoy.
      </span>
    );
  };

  return (
    <PageLayout>
      <AppHeader />
      <div
        className={classNames(
          "w-full md:max-w-screen-md grid grid-rows-autoRepeat3 justify-items-center gap-y-6",
          "text-left md:text-center mt-12 lg:mt-24 md:mx-auto"
        )}
      >
        {renderHeadline()}
        {renderTagline()}
        <div className="mt-6 md:mt-8 w-full md:w-56">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsCreatePlaylistModalOpen(true)}
          >
            Post a playlist
          </Button>
        </div>
      </div>
      <Playlists />
      <CreatePlaylistModal
        open={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
      />
    </PageLayout>
  );
};

export default Community;
