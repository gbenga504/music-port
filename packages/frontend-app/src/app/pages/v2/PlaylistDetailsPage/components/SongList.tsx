import React from "react";

import { calculateTime } from "../../../../../utils/playlist";
import { LazyImage } from "../../../../components/LazyImage/LazyImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../../components/Table/Table";
import { useAttachUniqueIdToListItems } from "../../../../hooks/useAttachUniqueIdToListItems";

import type { Playlist } from "../../../../api/graphql/graphql-client.gen";

interface IProps {
  songs: Playlist["songs"];
}

export const SongList: React.FC<IProps> = ({ songs: songsFromProps }) => {
  const songs = useAttachUniqueIdToListItems(songsFromProps);

  const getDisplayNameForArtists = (song: (typeof songs)[number]) => {
    const artists = song.artists || [];
    const firstArtist = `${artists[0].name}`;

    if (artists.length === 1) {
      return firstArtist;
    }

    return `${firstArtist} +${artists.length - 1} more`;
  };

  const renderSongColumn = (song: (typeof songs)[number]) => {
    return (
      <div className="flex items-center">
        <div className="w-10 min-w-[40px] min-h-[40px] h-10 bg-secondary100 rounded-md mr-2">
          <LazyImage
            className="rounded-md w-full h-full object-cover"
            src={song.coverImage}
          />
        </div>
        <div className="grid">
          <span className="whitespace-nowrap w-full text-ellipsis overflow-hidden">
            {song.name}
          </span>
          <span className="text-xs block md:hidden">
            {getDisplayNameForArtists(song)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Song</TableCell>
          <TableCell align="left" className="hidden md:table-cell">
            Artist
          </TableCell>
          <TableCell align="left">Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song.id}>
            <TableCell>{renderSongColumn(song)}</TableCell>
            <TableCell align="left" className="hidden md:table-cell">
              {getDisplayNameForArtists(song)}
            </TableCell>
            <TableCell align="left">{calculateTime(song.duration)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
