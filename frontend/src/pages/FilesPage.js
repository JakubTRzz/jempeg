import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

function FilesPage() {
  return (
    <Wrapper>
      <h2>Dosyalar 📂</h2>
      <p>Burada USB / SD kart dosyaları gösterilecek.</p>
    </Wrapper>
  );
}

export default FilesPage;
