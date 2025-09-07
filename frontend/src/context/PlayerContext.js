import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

// Hook kullanımı kolay olsun diye
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  // Oynatma kaynağı: "local", "spotify", "radio" vs.
  const [source, setSource] = useState("spotify");

  // Çalan parça bilgisi
  const [track, setTrack] = useState({
    title: "Believer",
    artist: "Imagine Dragons",
    thumbnail: "https://i.scdn.co/image/ab67616d00004851c58b56e9b16a7c6a6e2e2a7f",
  });

  // İlerleme (şimdilik % değer, sonra süreye bağlarız)
  const [progress, setProgress] = useState(0);

  // Çalma durumu
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <PlayerContext.Provider
      value={{
        source,
        setSource,
        track,
        setTrack,
        progress,
        setProgress,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
