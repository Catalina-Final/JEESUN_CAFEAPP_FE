import React, { useEffect, useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import ShopCard from "../../components/ShopCard";
import PaginationItem from "../../components/PaginationItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../redux/actions";

const SearchResultPage = () => {
  const loading = useSelector((state) => state.shop.loading);
  const shops = useSelector((state) => state.shop.shops);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shopActions.shopsRequest(1));
  }, [dispatch]);

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };

  const searchByKeyword = (keyword) => {
    dispatch(shopActions.shopsRequest(keyword));
    console.log("keyword :", keyword);
  };

  return (
    <div className="search-container d-flex align-content-center align-items-center">
      <div>
        <InputGroup
          className="inline"
          style={{
            width: "24rem",
          }}
        >
          <FormControl
            placeholder="Search Keyword "
            name="keyword"
            // value={keyword}
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-dark" onClick={() => searchByKeyword()}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {shops.length ? (
            <div>
              {shops.map((shop) => (
                <ShopCard
                  handleClick={handleClickOnShop}
                  shop={shop}
                  key={shop._id}
                />
              ))}
            </div>
          ) : (
            <p>There are no shops</p>
          )}
        </>
      )}

      <PaginationItem />
    </div>
  );
};

export default SearchResultPage;
