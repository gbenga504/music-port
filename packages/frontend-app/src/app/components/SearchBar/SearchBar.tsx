import React, { useState } from "react";

import "./SearchBar.scss";
import { ComingSoonModal } from "../ComingSoonModal";
import { Input } from "../Input/Input";

export const SearchBar = () => {
  const [isComingSoonModalVisible, setIsComingModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Input
        type="search"
        fullWidth
        textColor="white"
        className="searchBar"
        placeholder="Search"
        readOnly
        onClick={() => setIsComingModalVisible(true)}
      />
      <ComingSoonModal
        open={isComingSoonModalVisible}
        onClose={() => setIsComingModalVisible(false)}
      />
    </React.Fragment>
  );
};
