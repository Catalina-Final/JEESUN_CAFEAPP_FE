import React, { useEffect } from "react";
import ShopCard from "../../components/ShopCard";
import PaginationItem from "../../components/PaginationItem";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

const RankingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.shop.loading);
  const shops = useSelector((state) => state.shop.shops);

  useEffect(() => {
    dispatch(shopActions.shopsRequest(1));
  }, [dispatch]);

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };

  return (
    <div className="ranking-container">
      <div className="text-center">
        <p
          style={{
            fontSize: "23px",
            color: "black",
            fontFamily: "serif",
            marginTop: "5rem",
          }}
        >
          Are you a cafe owner? Add your cafe to the society.
        </p>

        <Button
          variant="dark"
          style={{
            fontSize: "17px",
            fontFamily: "monospace",
            marginBottom: "5rem",
          }}
          onClick={() => history.push("/shop/add")} /////// or <Link to={`/shop/add}`}>
        >
          Add
        </Button>
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

export default RankingPage;
