import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { CustomThemeProvider } from "./context/ThemeContext";
import { PlayerProvider } from "./context/PlayerContext";

import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import RadioPage from "./pages/RadioPage";
import FilesPage from "./pages/FilesPage";
import SettingsPage from "./pages/SettingsPage";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

// Eğer SpotifyPage gibi başka kaynak sayfaları olacaksa buraya ekleyebiliriz
// import SpotifyPage from "./pages/SpotifyPage";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
  transition: background-color 0.4s ease, color 0.4s ease;
  padding-bottom: 80px; /* footer için boşluk */
`;

function App() {
  return (
    <CustomThemeProvider>
      <PlayerProvider>
        <Router>
          <Wrapper>
            {/* Her sayfada aynı header */}
            <HeaderBar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* <Route path="/spotify" element={<SpotifyPage />} /> */}
            </Routes>

            {/* Her sayfada aynı footer (ama PlayerContext'e göre akıllı davranır) */}
            <FooterBar />
          </Wrapper>
        </Router>
      </PlayerProvider>
    </CustomThemeProvider>
  );
}

export default App;
