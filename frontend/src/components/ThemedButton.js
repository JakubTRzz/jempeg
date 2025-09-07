import styled from "styled-components";

const ThemedButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.components.button.borderRadius};
  padding: ${(props) => props.theme.components.button.padding};
  cursor: pointer;
  transition: ${(props) => props.theme.components.button.transition};

  &:hover {
    opacity: 0.8;
  }
`;

export default ThemedButton;
