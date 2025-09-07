import React, { useContext } from "react";
import { ThemeContext, CustomThemeProvider } from "./context/ThemeContext";
import styled from "styled-components";
import HomePage from "./pages/HomePage";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
  transition: background-color 0.4s ease, color 0.4s ease;
`;

function Content() {
  return (
    <Wrapper>
      <HomePage />
    </Wrapper>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <Content />
    </CustomThemeProvider>
  );
}

export default App;
