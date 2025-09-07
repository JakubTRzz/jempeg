import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaWifi, FaBluetooth } from "react-icons/fa";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.6rem 1rem;
  font-size: clamp(1rem, 2.2vw, 1.3rem);
`;

const Left = styled.div`
  font-weight: 500;
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

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = dateTime.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = dateTime.toLocaleDateString("tr-TR", {
    weekday: "long", // artık TAM gün adı (örn. Pazar)
    day: "2-digit",
    month: "long",   // tam ay adı (örn. Eylül)
  });

  return (
    <Bar>
      <Left>24°C</Left>
      <Center>{date} | {time}</Center>
      <Right>
        <FaWifi />
        <FaBluetooth />
      </Right>
    </Bar>
  );
}

export default HeaderBar;
