import React from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import IconButton from "../components/IconButton";
import { FaMusic, FaBroadcastTower, FaBluetooth, FaCog, FaFolder } from "react-icons/fa";

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
  return (
    <>
      <HeaderBar />
      <Grid>
        <IconButton icon={<FaMusic />} label="Müzik" onClick={() => {}} />
        <IconButton icon={<FaBluetooth />} label="Bluetooth" onClick={() => {}} />
        <IconButton icon={<FaCog />} label="Ayarlar" onClick={() => {}} />
        <IconButton icon={<FaFolder />} label="Dosyalar" onClick={() => {}} />
        <IconButton icon={<FaBroadcastTower />} label="Radyo" onClick={() => {}} />
      </Grid>
      <FooterBar />
    </>
  );
}

export default HomePage;
