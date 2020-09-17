import React, { useEffect } from "react";
import ShopCard from "../../components/ShopCard";
import PaginationItem from "../../components/PaginationItem";
import { Jumbotron, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

const RankingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.shop.loading);
  const shops = useSelector((state) => state.shop.shops);

  useEffect(() => {
    dispatch(shopActions.shopsRequest());
  }, [dispatch]);

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };

  return (
    <div className="ranking-container">
      <Jumbotron className="text-center">
        <p style={{ fontSize: "23px", color: "white", fontFamily: "serif" }}>
          Upload your cafe
        </p>

        <Button
          variant="dark"
          style={{ fontSize: "17px", fontFamily: "monospace" }}
          onClick={() => history.push("/shop/add")} /////// or <Link to={`/shop/add}`}>
        >
          Add
        </Button>
      </Jumbotron>
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

export default RankingPage;
