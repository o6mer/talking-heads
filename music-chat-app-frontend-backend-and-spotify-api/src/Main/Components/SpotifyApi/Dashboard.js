import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "d679667fbb3e4d9e92688887dd7e6db3",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResaults, setSearchResaults] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log(accessToken);
    if (!search) return setSearchResaults([]);
    if (!accessToken) return;

    console.log(search);
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResaults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [search, accessToken]);

  return (
    <div className="flex p-2 w-full  max-h-full flex-col">
      <form action="" className="w-full">
        <input
          className="w-full"
          type="serach"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // console.log(search);
          }}
        />
      </form>
      <div className="flex flex-grow m-2 overflow-y-auto">Songs</div>
    </div>
  );
};

export default Dashboard;
