import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import ReactMardown from "react-markdown";

//props대신 {job}이렇게 사용할수도 있음
const Job = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (id) => {
    setIsOpen(!isOpen);
  };
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title}-
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="primary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMardown source={job.how_to_apply}></ReactMardown>
            </div>
          </div>

          <img
            className="d-flex justify-content-between"
            height="50"
            src={job.company_logo}
            alt={job.company}
          />
        </div>
        <Card.Text>
          <Button id="button" onClick={toggle} variant="primary">
            {!isOpen ? "View Detail" : "Hide Detail"}
          </Button>
        </Card.Text>
        {isOpen && (
          <div className="mt-4">
            <ReactMardown source={job.description} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Job;
