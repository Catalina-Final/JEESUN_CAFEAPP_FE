import React, { useState, useEffect } from "react";
import { shopActions } from "../../redux/actions";
import { Row, Card, Container } from "react-bootstrap";
import ShopCard from "../../components/ShopCard";
// import EventPage from "../../containers/EventPage";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";

const DashboardPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const shops = useSelector((state) => state.shop.selectedShop);
  const events = useSelector((state) => state.event.selectedEvent);
  const loading = useSelector((state) => state.shop.loading);
  const user = useSelector((state) => state.auth.user);
  const totalPageNum = useSelector((state) => state.shop.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const currentUser = useSelector((state) => state.auth.user);

  const handleOnFavorite = (id) => {
    dispatch(shopActions.favoriteFromShopList(id));
  };

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };

  const handleClickOnEvent = (id) => {
    history.push(`/events/${id}`);
  };

  useEffect(() => {
    dispatch(shopActions.getUserFavoriteShops(currentUser.id, pageNum));
  }, [dispatch, pageNum]);

  return (
    <div className="main-container montserrat label">
      <Container>
        <Row
          className="body text-center justify-content-center dashboard"
          style={{ marginTop: "15px" }}
        >
          <div className="col-3  profile">
            <h2 className="point">My Profile</h2>
            <Card style={{ width: "100%", marginTop: "15%" }}>
              <Card.Body className="text-center">
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Card.Text>{user.role}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-5 ">
            <h2 className="point">Favorite Cafe List</h2>
            <Container style={{ marginTop: "15%" }}>
              <PaginationItem
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
                loading={loading}
              />
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
                          color={
                            currentUser?.favorites.includes(shop._id)
                              ? "red"
                              : "black"
                          }
                          handleOnFavorite={handleOnFavorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>There are no shops in your list.</p>
                  )}
                </>
              )}
            </Container>
          </div>
          <div className="col-4 ">
            <h2 className="point">Interested Events List</h2>
            <Container style={{ marginTop: "15%" }}>
              {loading ? (
                <ClipLoader color="#f86c6b" size={150} loading={loading} />
              ) : (
                <>
                  {events.length ? (
                    <Card>
                      {shops.map((event) => (
                        <ShopCard
                          shop={event}
                          key={event._id}
                          handleClick={handleClickOnEvent}
                        />
                      ))}
                    </Card>
                  ) : (
                    <p>There are no shops in your list.</p>
                  )}
                </>
              )}
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
