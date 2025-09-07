import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

const Btn = styled.button`
  margin: 1rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: ${(props) => `calc(1rem * ${props.theme.fontScale})`};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.85;
  }
`;

function HomeButton() {
  const navigate = useNavigate();
  return <Btn onClick={() => navigate("/")}><FaHome /> Ana Ekran</Btn>;
}

export default HomeButton;
