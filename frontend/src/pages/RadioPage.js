import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

function RadioPage() {
  return (
    <Wrapper>
      <h2>Radyo 📡</h2>
      <p>Burada radyo istasyonları listelenecek.</p>
    </Wrapper>
  );
}

export default RadioPage;
