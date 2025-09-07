import React, { useEffect } from "react";
import styled from "styled-components";
import { FaPlay, FaStepForward, FaStepBackward, FaPause } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box; /* scrollbar padding fix */

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Info = styled.div`
  flex: 1; /* Esnek alan */
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  overflow: hidden;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    align-items: center;
  }
`;

const Song = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.span`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Time = styled.span`
  font-size: 0.7rem;
  opacity: 0.8;

  @media (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const ProgressContainer = styled.div`
  flex: 1;
  height: 5px;
  background: #444;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
`;

const ProgressDot = styled.div`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  left: ${(props) => props.progress}%;
  transform: translateX(-50%);
  transition: left 0.1s linear;

  @media (max-width: 600px) {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Ortada */
  gap: 1.5rem;
  font-size: 1.8rem;
  flex-shrink: 0; /* Daralmayı engelle */

  @media (max-width: 600px) {
    gap: 1rem;
    font-size: 1.5rem;
  }
`;

function FooterBar() {
  const location = useLocation();
  const {
    source,
    track,
    progress,
    setProgress,
    isPlaying,
    setIsPlaying,
  } = usePlayer();

  const totalDuration = 200; // örnek: 200 saniye
  const currentTime = Math.round((progress / 100) * totalDuration);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 0.5 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, setProgress]);

  if (
    (source === "local" && location.pathname === "/music") ||
    (source === "radio" && location.pathname === "/radio") ||
    (source === "spotify" && location.pathname === "/spotify")
  ) {
    return null;
  }

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
  };

  return (
    <Bar>
      <Thumbnail src={track.thumbnail} alt="cover" />
      <Info>
        <Song>{track.title}</Song>
        <Artist>{track.artist}</Artist>
        <ProgressWrapper>
          <Time>{formatTime(currentTime)}</Time>
          <ProgressContainer onClick={handleSeek}>
            <ProgressDot progress={progress} />
          </ProgressContainer>
          <Time>{formatTime(totalDuration)}</Time>
        </ProgressWrapper>
      </Info>
      <Controls>
        <FaStepBackward style={{ cursor: "pointer" }} />
        {isPlaying ? (
          <FaPause
            onClick={() => setIsPlaying(false)}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaPlay
            onClick={() => setIsPlaying(true)}
            style={{ cursor: "pointer" }}
          />
        )}
        <FaStepForward style={{ cursor: "pointer" }} />
      </Controls>
    </Bar>
  );
}

export default FooterBar;
