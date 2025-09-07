import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Button = styled.button`
  margin: 1rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: ${(props) => `calc(1rem * ${props.theme.fontScale})`};
`;

const Slider = styled.input`
  width: 200px;
  margin-top: 1rem;
`;

function SettingsPage() {
  const { toggleTheme, fontScale, updateFontScale } = useContext(ThemeContext);

  return (
    <Wrapper>
      <h2 style={{ fontSize: `calc(1.2rem * ${fontScale})` }}>Ayarlar ⚙️</h2>

      <Button onClick={toggleTheme}>Tema Değiştir</Button>

      <div>
        <p style={{ fontSize: `calc(1rem * ${fontScale})` }}>
          Font Boyutu: {fontScale.toFixed(1)}x
        </p>
        <Slider
          type="range"
          min="0.8"
          max="1.5"
          step="0.1"
          value={fontScale}
          onChange={(e) => updateFontScale(parseFloat(e.target.value))}
        />
      </div>
    </Wrapper>
  );
}

export default SettingsPage;
