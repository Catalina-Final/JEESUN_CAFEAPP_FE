import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationItem = ({ pageNum, setPageNum, totalPageNum, loading }) => {
  const handleClick = (page) => {
    if (!loading) {
      setPageNum(parseInt(page));
    }
  };

  const handleClickOnFirst = () => {
    if (!loading) {
      setPageNum(1);
    }
  };

  const handleClickOnLast = () => {
    if (!loading) {
      setPageNum(totalPageNum);
    }
  };
  const handleClickOnNext = () => {
    if (pageNum < totalPageNum && !loading) {
      setPageNum((num) => num + 1);
    }
  };
  const handleClickOnPrev = () => {
    if (pageNum > 1 && !loading) {
      setPageNum((num) => num - 1);
    }
  };

  return (
    <Pagination className="justify-content-center" disabled={loading}>
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
        {1}
      </Pagination.Item>

      {pageNum - 1 > 1 && <Pagination.Ellipsis />}
      {pageNum > 1 && pageNum < totalPageNum && (
        <Pagination.Item active>{pageNum}</Pagination.Item>
      )}
      {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}

      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClick(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      )}

      <Pagination.Next
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnNext}
      />
      <Pagination.Last
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnLast}
      />
    </Pagination>
  );
};

export default PaginationItem;

// import React from "react";
// import { Pagination } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { shopActions } from "../redux/actions";

// const pageLimit = 10;
// const PaginationItem = ({ pageNum, setPageNum }) => {
//   const pageNum = useSelector((state) => state.shop.pageNum);
//   const totalPageNum = useSelector((state) => state.shop.totalPageNum);
//   // const totalResults = useSelector((state) => state.shop.totalResults);
//   // let totalPageNum = 0;
//   // if (totalResults % pageLimit > 0)
//   //   totalPageNum = Math.floor(totalResults / pageLimit) + 1;
//   // else totalPageNum = Math.floor(totalResults / pageLimit);

//   const dispatch = useDispatch();

//   const handleClick = (pageNum) => {
//     dispatch(shopActions.shopsRequest(pageNum));
//   };
//   const handleClickOnFirst = () => {
//     dispatch(shopActions.shopsRequest(1));
//   };
//   const handleClickOnPrev = () => {
//     dispatch(shopActions.shopsRequest(pageNum - 1));
//   };
//   const handleClickOnNext = () => {
//     dispatch(shopActions.shopsRequest(pageNum + 1));
//   };
//   const handleClickOnLast = () => {
//     dispatch(shopActions.shopsRequest(totalPageNum));
//   };

//   return (
//     <>
//       <Pagination size="lg" className="justify-content-center pagination">
//         <Pagination.First
//           disabled={pageNum === 1}
//           onClick={handleClickOnFirst}
//         />
//         <Pagination.Prev
//           disabled={pageNum === 1}
//           onClick={() => handleClickOnPrev()}
//         />
//         <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
//           {1}
//         </Pagination.Item>

//         {/* {pageNum - 1 > 1 && <Pagination.Ellipsis />} */}
//         {pageNum > 1 && pageNum < totalPageNum && (
//           <Pagination.Item active>{pageNum}</Pagination.Item>
//         )}
//         {/* {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />} */}

//         {totalPageNum > 1 && (
//           <Pagination.Item
//             active={pageNum === totalPageNum}
//             onClick={() => handleClick(totalPageNum)}
//           >
//             {totalPageNum}
//           </Pagination.Item>
//         )}

//         {pageNum > 1 && pageNum < totalPageNum && (
//           <Pagination.Item active>{pageNum}</Pagination.Item>
//         )}

//         <Pagination.Next
//           disabled={pageNum === totalPageNum}
//           onClick={() => handleClickOnNext()}
//         />
//         <Pagination.Last
//           disabled={pageNum === totalPageNum}
//           onClick={() => handleClickOnLast()}
//         />
//       </Pagination>
//     </>
//   );
// };

// export default PaginationItem;
