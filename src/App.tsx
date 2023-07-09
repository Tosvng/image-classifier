import { useState } from "react";
import "./App.css";
import ImageClassifierPage from "./Pages/ImageClassifierPage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <ImageClassifierPage />
      {/* <PoseClassifierPage /> */}
    </Container>
  );
}

export default App;
