import React from "react";
import { Pagination } from "react-bootstrap";

const JobsPagination = (props) => {
  function adJustPage(amount) {
    props.setPage((prevPage) => prevPage + amount);
  }
  return (
    <div>
      <Pagination>
        {props.page !== 1 && <Pagination.Prev onClick={() => adJustPage(-1)} />}
        {props.page !== 1 && (
          <Pagination.Item onClick={() => props.setPage(1)}>1</Pagination.Item>
        )}
        {props.page > 2 && <Pagination.Ellipsis />}
        {props.page > 2 && (
          <Pagination.Item onClick={() => adJustPage(-1)}>
            {props.page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{props.page}</Pagination.Item>
        {props.hasNextPage && (
          <Pagination.Item onClick={() => adJustPage(1)}>
            {props.page + 1}
          </Pagination.Item>
        )}
        {props.hasNextPage && <Pagination.Next onClick={() => adJustPage(1)} />}
      </Pagination>
    </div>
  );
};

export default JobsPagination;
