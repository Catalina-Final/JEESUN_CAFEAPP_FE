import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Markdown from "react-markdown";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { shopActions, authActions } from "../../redux/actions";
import { Row, Col } from "react-bootstrap";

const ShopDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.shop.loading);
  const shop = useSelector((state) => state.shop.selectedShop);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  console.log(shop);
  useEffect(() => {
    if (params?.id) {
      dispatch(shopActions.getSingleShop(params.id));
    }
    // dispatch(authActions.getCurrentUser());
  }, []);

  console.log(currentUser);
  return (
    <div className="shop-detail-container">
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {shop && (
            <div className="mb-5">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <h1>{shop.name}</h1>
                  {currentUser?.role === "owner" ? (
                    <Link to={`/shop/edit/${shop._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  ) : (
                    <span className="text-muted">
                      edited <Moment fromNow>{shop.createdAt}</Moment>
                    </span>
                  )}
                  <hr />
                  <p>{shop.name}</p>
                  <p>{shop.tags} </p>

                  {shop.tags &&
                    shop.tags.map((e) => <Link to={`/tags?q=${e}`}> {e}</Link>)}

                  <p>{shop.address} </p>
                  <p>{shop.phone}</p>
                  <p>
                    {" "}
                    from {shop.openHour} to {shop.closeHour}
                  </p>
                  <p>{shop.event}</p>
                  <hr />
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopDetailPage;