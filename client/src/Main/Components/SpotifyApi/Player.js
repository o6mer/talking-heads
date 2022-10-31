import React, { useContext, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { UserContext } from "../../../contexts/UserContextProvider";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showwSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      magnifySliderOnHover={true}
    />
  );
};

export default Player;
