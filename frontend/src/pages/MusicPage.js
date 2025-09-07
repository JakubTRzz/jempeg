import React, { useEffect } from "react";
import styled from "styled-components";
import { usePlayer } from "../context/PlayerContext";

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

function MusicPage() {
  const { setSource, setTrack } = usePlayer();

  // Sayfaya girildiğinde kaynağı "local" yap
  useEffect(() => {
    setSource("local");
    setTrack({
      title: "Highway to Hell",
      artist: "AC/DC",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/en/9/92/Acdc_Highway_to_Hell.png",
    });
  }, [setSource, setTrack]);

  return (
    <Wrapper>
      <h2>📂 Yerel Müzik Çalar</h2>
      <p>Bu sayfa cihazın dahili hafızasındaki müzikler için player placeholder'ı.</p>
      <p>Şu anda <b>local player</b> açık olduğu için alt bar gizlendi.</p>
    </Wrapper>
  );
}

export default MusicPage;
