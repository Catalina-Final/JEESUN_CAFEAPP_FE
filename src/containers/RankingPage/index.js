import React, { useEffect, useState } from "react";
import ShopCard from "../../components/ShopCard";
import PaginationItem from "../../components/PaginationItem";
import { Button, Container, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

const RankingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.shop.loading);
  const shops = useSelector((state) => state.shop.shops);
  const currentUser = useSelector((state) => state.auth.user);

  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.shop.totalPageNum);

  useEffect(() => {
    const sortBy = {
      key: "avgRatings",
      ascending: "-1",
    };
    dispatch(shopActions.shopsRequest(pageNum, null, null, sortBy));
  }, [dispatch, pageNum]);

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };
  const handleOnFavorite = (id) => {
    dispatch(shopActions.favoriteFromShopList(id));
  };

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = shops.sort((a, b) => a.avgRatings - b.avgRatings);
    } else {
      sortedList = shops.sort((a, b) => b.avgRatings - a.avgRatings);
    }
  };

  // console.log(currentUser);

  return (
    <div className="main-container">
      <Container>
        <div className="text-center">
          {currentUser?.role === "owner" || currentUser?.role === "admin" ? (
            <div>
              <p
                style={{
                  fontSize: "23px",
                  color: "#72684f",
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "3rem",
                }}
              >
                Haven't uploaded yet? Add your cafe to our society.
              </p>

              <Button
                variant="dark"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat, sansSerif",
                  marginBottom: "5rem",
                  backgroundColor: "#F57F5B",
                  border: "none",
                }}
                onClick={() => history.push(`/shop/add`)} /////// or <Link to={`/shop/add}`}>
              >
                Add
              </Button>
            </div>
          ) : (
            <div>
              <p
                style={{
                  fontSize: "23px",
                  color: "#72684f",
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "3rem",
                  marginBottom: "5rem",
                }}
              >
                Check out our cafes!
              </p>
            </div>
          )}
        </div>
        {loading ? (
          <ClipLoader color="#b7a986" size={150} loading={loading} />
        ) : (
          <>
            <Dropdown className="text-center">
              <Dropdown.Toggle
                variant="link"
                className="dropdown"
                id="dropdown-basic"
              >
                <p className="point">See by Rating</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => sortByRate("dsc")}
                >
                  Rating(high to low)
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => sortByRate("asc")}
                >
                  Rating(low to high)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {shops.length ? (
              <div>
                {shops.map((shop) => (
                  <ShopCard
                    handleClick={handleClickOnShop}
                    shop={shop}
                    key={shop._id}
                    color={
                      currentUser?.favorites
                        .map((item) => item._id)
                        .includes(shop._id)
                        ? "red"
                        : "black"
                    }
                    handleOnFavorite={handleOnFavorite}
                  />
                ))}
              </div>
            ) : (
              <p>There are no shops</p>
            )}
          </>
        )}
        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />{" "}
      </Container>
    </div>
  );
};

export default RankingPage;
