import React from "react";
import styled from "styled-components";
import IconButton from "../components/IconButton";
import { FaMusic, FaBroadcastTower, FaBluetooth, FaCog, FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <Grid>
      <IconButton icon={<FaMusic />} label="Müzik" onClick={() => navigate("/music")} />
      <IconButton icon={<FaBluetooth />} label="Bluetooth" onClick={() => navigate("/bluetooth")} />
      <IconButton icon={<FaCog />} label="Ayarlar" onClick={() => navigate("/settings")} />
      <IconButton icon={<FaFolder />} label="Dosyalar" onClick={() => navigate("/files")} />
      <IconButton icon={<FaBroadcastTower />} label="Radyo" onClick={() => navigate("/radio")} />
    </Grid>
  );
}

export default HomePage;
