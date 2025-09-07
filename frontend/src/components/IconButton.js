import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 16px;
  padding: 2rem;
  color: white;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  svg {
    font-size: clamp(1.5rem, 5vw, 3rem);
    margin-bottom: 0.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.2rem;
    border-radius: 12px;
  }
`;

function IconButton({ icon, label, onClick }) {
  return (
    <Btn onClick={onClick}>
      {icon}
      <span>{label}</span>
    </Btn>
  );
}

export default IconButton;
