import React, { useEffect, Children } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../redux/actions";
// import EventCard from "../../components/EventCard";
// import Moment from "react-moment";

const EventPage = () => {
  const loading = useSelector((state) => state.event.loading);
  let events = useSelector((state) => state.event.events);
  const history = useHistory();
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const CURRENT_DATE = moment().toDate();
  const currentUser = useSelector((state) => state.auth.user);
  console.log("user auth: ", currentUser);
  console.log("event list :", events[0]);

  useEffect(() => {
    dispatch(eventActions.eventRequest(1));
  }, [dispatch]);

  const handleClickOnEvent = (id) => {
    history.push(`/events/${id}`);
  };

  // const myEventsList = [
  //   {
  //     id: 1,
  //     title: "Luanching Party",
  //     owner: "Okkio",
  //     start: new Date(2020, 8, 13, 12, 0, 0, 0),
  //     end: new Date(2020, 8, 13, 13, 0, 0, 0),
  //   }
  // ];
  // window.xxx = myEventsList;

  // Converting the string data type from the backend
  // into a Date object for our react-bigcalendar library.
  // Also: we need to make sure "end" is set.
  events = events.map((e) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.start), // our test data didn't have end time set, so just setting it to same as start
  }));
  window.yyy = events;

  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        // backgroundColor: "#f7f8f9",
        // backgroundColor: value < CURRENT_DATE ? "lightgreen" : "lightblue",
      },
    });

  return (
    <div className="ranking-container">
      <div className="text-center">
        {currentUser?.role === "owner" || currentUser?.role === "admin" ? (
          <div>
            <p
              style={{
                fontSize: "23px",
                color: "black",
                fontFamily: "serif",
                marginTop: "5rem",
              }}
            >
              Do you have any upcoming events? Share with us.
            </p>
            <Button
              variant="dark"
              style={{
                fontSize: "17px",
                fontFamily: "monospace",
                marginBottom: "5rem",
              }}
              onClick={() => history.push("/event/add")} /////// or <Link to={`/event/add}`}>
            >
              Add
            </Button>
          </div>
        ) : (
          <p
            style={{
              fontSize: "23px",
              color: "black",
              fontFamily: "serif",
              marginTop: "3rem",
              marginBottom: "5rem",
            }}
          >
            Check out the upcoming events!
          </p>
        )}
      </div>

      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {events.length ? (
            <div>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event) => handleClickOnEvent(event._id)}
                components={{
                  // you have to pass your custom wrapper here
                  // so that it actually gets used
                  dateCellWrapper: ColoredDateCellWrapper,
                }}
                style={{ height: 500 }}
              />
            </div>
          ) : (
            <p>There are no events</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
