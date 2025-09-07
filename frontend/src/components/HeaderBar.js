import React from "react";
import styled from "styled-components";
import { FaHome, FaWifi, FaBluetooth } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 48px;
  max-height: 64px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* sol - orta - sağ */
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  font-weight: bold;

  @media (max-width: 600px) {
    min-height: 44px;
    max-height: 54px;
    font-size: 0.9rem;
  }

  @media (min-width: 1200px) {
    min-height: 56px;
    max-height: 72px;
    font-size: 1.2rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: flex-start;
`;

const Center = styled.div`
  text-align: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: flex-end;
`;

const HomeButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;

  &:active {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(0.95);
  }
`;

function HeaderBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const now = new Date();
  const dateStr = now.toLocaleDateString("tr-TR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const timeStr = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Bar>
      <Left>
        {!isHome && (
          <HomeButton onClick={() => navigate("/")}>
            <FaHome />
          </HomeButton>
        )}
        <span>24°C</span>
      </Left>

      <Center>
        {dateStr} | {timeStr}
      </Center>

      <Right>
        <FaWifi />
        <FaBluetooth />
      </Right>
    </Bar>
  );
}

export default HeaderBar;
