import React, { useState } from "react";
import useFetchApi from "./useFetchApi";
import { Container } from "react-bootstrap";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import Job from "./Job";

function App() {
  const [params, setPrams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchApi(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setPrams((prevPrams) => {
      return { ...prevPrams, [param]: value };
    });
  }

  return (
    <Container>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>loading...</h1>}
      {error && <h1>error</h1>}
      {jobs.map((x) => {
        return <Job key={x.id} job={x} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
