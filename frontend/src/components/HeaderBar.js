import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaWifi, FaBluetooth, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.6rem 1rem;
  font-size: ${(props) => `calc(1.1rem * ${props.theme.fontScale})`};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem; /* ikon ile sıcaklık arasında boşluk */
`;

const HomeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);  /* kalıcı gölge */
`;


const Center = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 600;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function HeaderBar() {
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = dateTime.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = dateTime.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const isHome = location.pathname === "/";

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
        {date} | {time}
      </Center>
      <Right>
        <FaWifi />
        <FaBluetooth />
      </Right>
    </Bar>
  );
}

export default HeaderBar;
