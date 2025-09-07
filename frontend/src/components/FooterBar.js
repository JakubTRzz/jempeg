import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: 0.8rem;
  text-align: center;
  font-size: 0.9rem;
`;

function FooterBar() {
  return <Bar>🎶 Spotify - Çalan Şarkı: Imagine Dragons - Believer</Bar>;
}

export default FooterBar;
