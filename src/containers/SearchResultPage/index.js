import React, { useEffect, useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Form,
} from "react-bootstrap";
import ShopCard from "../../components/ShopCard";
import PaginationItem from "../../components/PaginationItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../redux/actions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const SearchResultPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const loading = useSelector((state) => state.shop.loading);
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.shop.totalPageNum);

  const shops = useSelector((state) => state.shop.shops);
  const history = useHistory();
  const query = useQuery();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [district, setDistrict] = useState("");
  const [tags, setTags] = useState("");

  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (query.get("q")) {
      console.log(query.get("q"));
      searchHihi(query.get("q"), "name");
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     // console.log("useEffect okay?");
  //     dispatch(shopActions.shopsRequest(pageNum, searchTerm, "name"));
  //   } else if (district) {
  //     // console.log("useEffect for district okay");
  //     dispatch(shopActions.shopsRequest(pageNum, district, "district"));
  //   } else if (tags) {
  //     dispatch(shopActions.shopsRequest(pageNum, tags, "tags"));
  //   }
  // }, [dispatch, pageNum, searchTerm, district, tags]);

  const handleClickOnShop = (id) => {
    history.push(`/shops/${id}`);
  };

  const handleOnFavorite = (id) => {
    dispatch(shopActions.favoriteFromShopList(id));
  };

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   history.push(`/search?q=${district}`);
  // };

  const searchByKeyword = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.keyword.value);
    // let filteredList = shops;
    // let keyword = e.tareget.value;
    // if (e) {
    //   console.log("keyword", keyword);
    //   history.push(`/search?q=${keyword}`);
    // }
    // if (keyword) {
    //   filteredList = shops.filter((shop) =>
    //     shop.name.toLowerCase().includes(keyword.toLowerCase())
    //   );
    // }
  };

  const onError = (err) => {
    alert(err.message);
  };
  const searchHihi = (term, option) => {
    if (option === "distance") {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          console.log(
            "pos.coords.latitude",
            pos.coords.latitude,
            "pos.coords.long",
            pos.coords.longitude
          );
          dispatch(
            shopActions.shopsRequest(
              1,
              term,
              option,
              null,
              pos.coords.latitude,
              pos.coords.longitude
            )
          );
        },
        onError,
        options
      );
    } else {
      dispatch(shopActions.shopsRequest(1, term, option));
    }
  };

  return (
    <div className="main-container montserrat">
      <Container>
        <div className="d-flex align-content-center flex-column align-items-center pb-5">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setDistrict("");
              setTags("");
              searchHihi(e.target.keyword.value, "name");
            }}
          >
            <InputGroup
              className="inline"
              style={{
                width: "24rem",
              }}
            >
              <FormControl
                placeholder="Search Keyword"
                name="keyword"
                value={keyword}
                aria-describedby="basic-addon2"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-dark"
                  type="submit"
                  style={{ color: "#72684f", border: "none" }}
                >
                  <i class="fas fa-search" style={{ color: "#72684f" }}></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

          {/* ------------- search by Distance------------ */}
          <div className="d-flex" style={{ marginTop: "2rem" }}>
            <Form style={{ marginRight: "1rem", width: "20rem" }}>
              <Form.Label
                className="label text-center mr-3"
                style={{
                  border: "none",
                  backgroundColor: "#b7a986",
                  borderRadius: "5px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                  color: "white",
                }}
              >
                Search by Distance
              </Form.Label>

              <Form.Control
                as="select"
                required
                className="mr-sm-2 "
                id="inlineFormCustomSelect"
                custom
                name="distance"
                value={distance}
                onChange={(e) => {
                  setKeyword("");
                  setTags("");
                  searchHihi(e.target.value, "distance");
                }}
              >
                {console.log("e.target.value: ", distance)}
                <option value="0">Choose Distance</option>
                <option value="1">Within 1km</option>
                <option value="2">Within 2km</option>
                <option value="3">Within 3km</option>
                <option value="4">Within 4km</option>
                <option value="5">Within 5km</option>
              </Form.Control>
            </Form>

            {/* ------------- search by district ------------ */}
            <Form style={{ marginRight: "1rem", width: "20rem" }}>
              <Form.Label
                className="label text-center mr-3"
                style={{
                  border: "none",
                  backgroundColor: "#b7a986",
                  borderRadius: "5px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                  color: "white",
                }}
              >
                Search by District
              </Form.Label>

              <Form.Control
                as="select"
                required
                className="mr-sm-2 "
                id="inlineFormCustomSelect"
                custom
                name="district"
                value={district}
                onChange={(e) => {
                  setKeyword("");
                  setTags("");
                  searchHihi(e.target.value, "district");
                }}
              >
                {console.log("e.target.value: ", district)}
                <option value="0">Choose District</option>
                <option value="1">Disctrict 1</option>
                <option value="2">Disctrict 2</option>
                <option value="3">Disctrict 3</option>
                <option value="4">Disctrict 4</option>
                <option value="5">Disctrict 5</option>
                <option value="6">Disctrict 6</option>
                <option value="7">Disctrict 7</option>
                <option value="9">Disctrict 9</option>
                <option value="10">Disctrict 10</option>
                <option value="11">Disctrict 11</option>
                <option value="binhThanh">Bình Thạnh District</option>
                <option value="goVap">Gò Vấp District</option>
                <option value="phuNhuan">Phú Nhuận District</option>
                <option value="tanBinh">Tân Bình District</option>
                <option value="tanPhu">Tân Phú District</option>
                <option value="etc">etc</option>
              </Form.Control>
            </Form>

            {/* ------------- search by tag ------------ */}
            <Form
              style={{ width: "20rem" }}
              // onSubmit={handleSubmitSearch}
            >
              <Form.Label
                className="label text-center mr-3"
                style={{
                  border: "none",
                  backgroundColor: "#f57f5b",
                  borderRadius: "5px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                  color: "white",
                }}
              >
                Search by tags
              </Form.Label>

              <Form.Control
                as="select"
                required
                className="mr-sm-2 "
                id="inlineFormCustomSelect"
                custom
                name="tags"
                value={tags}
                defaultValue={tags}
                onChange={(e) => {
                  setKeyword("");
                  setDistrict("");
                  searchHihi(e.target.value, "tags");
                }}
              >
                <option value="0">Choose a Tag</option>
                <option value="modern">modern</option>
                <option value="traditional">traditional</option>
                <option value="specialty">specialty</option>
                <option value="dessert">dessert</option>
                <option value="brunch">brunch</option>
              </Form.Control>
            </Form>
          </div>
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
              <p>There are no shops</p>
            )}
          </>
        )}
        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default SearchResultPage;
