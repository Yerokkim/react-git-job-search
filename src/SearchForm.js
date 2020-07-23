import React from "react";
import { Form, Col } from "react-bootstrap";

const SearchForm = ({ params, onParamChange }) => {
  return (
    <div>
      <Form className="mb-4">
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={onParamChange}
              value={params.description}
              name="description"
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={onParamChange}
              value={params.location}
              name="location"
              type="text"
            ></Form.Control>

            <Form.Group as={Col} xs="auto" className="ml-2">
              <Form.Check
                className="mb-2"
                onChange={onParamChange}
                value={params.full_time}
                name="full_time"
                id="full_time"
                label="only full time"
                type="checkbox"
              ></Form.Check>
            </Form.Group>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};

export default SearchForm;
