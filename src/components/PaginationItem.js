import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaginationItem = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [pageNum, setPageNum] = useState();

  const handleClickOnFirst = () => {
    if (!loading) {
      setPageNum(1);
    }
  };

  const handleClickOnPrev = () => {
    if (!loading && pageNum > 1) {
      setPageNum((pageNum = pageNum + 1));
    }
  };

  return (
    <Pagination className="justify-content-center" disabled={loading}>
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />

      <Pagination.Item>{1}</Pagination.Item>

      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>

      <Pagination.Ellipsis />

      <Pagination.Item>{20}</Pagination.Item>

      <Pagination.Next />

      <Pagination.Last />
    </Pagination>
  );
};

export default PaginationItem;
