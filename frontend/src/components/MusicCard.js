import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import ThemedCard from "./ThemedCard";
import ThemedButton from "./ThemedButton";
import ThemedSlider from "./ThemedSlider"; // bunu birazdan ekleyeceğiz

export default function MusicCard() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/music")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Müzik listesi alınamadı:", err));
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, current]);

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const nextSong = () => setCurrent((c) => (c + 1) % songs.length);
  const prevSong = () => setCurrent((c) => (c - 1 + songs.length) % songs.length);

  if (!songs.length) {
    return (
      <ThemedCard>
        <p className="text-center opacity-70">Müzik bulunamadı</p>
      </ThemedCard>
    );
  }

  const song = songs[current];

  return (
    <ThemedCard>
      <audio
        ref={audioRef}
        src={`http://localhost:5050${song.file}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      {/* Şarkı bilgileri */}
      <div className="text-center mb-4">
        <h3 className="font-semibold">{song.title}</h3>
        <p className="text-sm opacity-70">{song.artist}</p>
      </div>

      {/* Kontroller */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <ThemedButton onClick={prevSong}>
          <SkipBack />
        </ThemedButton>
        <ThemedButton onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause /> : <Play />}
        </ThemedButton>
        <ThemedButton onClick={nextSong}>
          <SkipForward />
        </ThemedButton>
      </div>

      {/* İlerleme çubuğu */}
      <div className="mb-4">
        <ThemedSlider
          value={progress}
          min={0}
          max={song.duration}
          step={1}
          onChange={(val) => handleSeek(val)}
        />
        <div className="flex justify-between text-xs opacity-70 mt-1">
          <span>{Math.floor(progress)}s</span>
          <span>{Math.floor(song.duration)}s</span>
        </div>
      </div>

      {/* Ses kontrolü */}
      <div className="flex items-center gap-2">
        <Volume2 className="w-4 h-4 opacity-70" />
        <ThemedSlider
          value={audioRef.current ? audioRef.current.volume * 100 : 70}
          min={0}
          max={100}
          step={1}
          onChange={(val) => {
            if (audioRef.current) audioRef.current.volume = val / 100;
          }}
        />
      </div>
    </ThemedCard>
  );
}
