import React from "react";

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div
      className="flex m-2 items-center cursor-pointer hover:bg-slate-300"
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-gray-500">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
