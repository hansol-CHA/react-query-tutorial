import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export default function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  const moveToPreviousPage = () => {
    setPageNumber((page) => page - 1);
  };

  const moveToNextPage = () => {
    setPageNumber((page) => page + 1);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={moveToPreviousPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button onClick={moveToNextPage} disabled={pageNumber === 4}>
          Next
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
}
