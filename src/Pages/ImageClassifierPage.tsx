import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageClassifier } from "../Model/ImageClassifier";
import { TensorInformation } from "../Model/TensorInformation.types";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Form,
  Button,
  Image,
  Stack,
} from "react-bootstrap";

interface Props {}

const ImageClassifierPage = (props: Props) => {
  const [tensors, setTensors] = useState<TensorInformation[] | null>(null);
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ucPLLnB4Pu1kMEs2uRZISegG5W7Icsb7tq27blyry0gnYhVOfg"
  );
  const classifer: ImageClassifier = new ImageClassifier();
  const inputImage = useRef<HTMLImageElement>(null);

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTensors(null);
    setImageUrl(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    classify();
  };

  const classify = async () => {
    if (inputImage.current && !tensors) {
      const image = inputImage.current;
      const response = await classifer.Classify(image);
      if (response) {
        const responseToArray = Object.values(response);
        setTensors(responseToArray);
      }
    }
  };

  useEffect(() => {
    classify();
  }, []);

  return (
    <Stack gap={3}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} sm={9}>
            <Form.Label htmlFor="imageurl">Image URL</Form.Label>
            <Form.Control
              type="input"
              id="imageurl"
              aria-label="image url"
              value={imageUrl}
              onChange={handleImageUrlChange}
            />
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit">Scan Image</Button>
          </Col>
        </Row>
      </Form>

      <Image
        crossOrigin="anonymous"
        ref={inputImage}
        src={imageUrl}
        alt="input image"
        rounded
        style={{ maxWidth: "100%", maxHeight: "50vh", objectFit: "contain" }}
      />

      <Row>
        <Col>
          <ListGroup>
            {tensors ? (
              tensors.map((tensor) => (
                <ListGroup.Item key={tensor.className}>
                  <span className="font-weight-bold text-capitalize">
                    {tensor.className}
                  </span>{" "}
                  - {tensor.probability}
                </ListGroup.Item>
              ))
            ) : (
              <p>Scanning Image ...</p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Stack>
  );
};

export default ImageClassifierPage;
