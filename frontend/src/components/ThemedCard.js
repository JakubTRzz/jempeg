import styled from "styled-components";

const ThemedCard = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
`;

export default ThemedCard;
