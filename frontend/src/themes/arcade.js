import React from "react";

export const arcadeTheme = {
  name: "Arcade",
  colors: {
    background: "#000",
    text: "#0f0",
    primary: "#f0f",
    secondary: "#111"
  },
  fonts: {
    base: "'Press Start 2P', cursive",
    heading: "'Orbitron', sans-serif"
  },
  components: {
    button: {
      borderRadius: "0px",
      padding: "12px 24px",
      transition: "all 0.3s ease"
    }
  },
  overrides: {
    HomePage: () => (
      <div style={{ fontFamily: "'Press Start 2P', cursive", color: "#0f0" }}>
        <h1>WELCOME PLAYER 🚀</h1>
        <p>Insert Coin to Start</p>
      </div>
    )
  }
};
