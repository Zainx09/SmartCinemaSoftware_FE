import React, { useState, useEffect } from "react";
import { Calendar, Button, notification, Modal } from "antd";
import moment from "moment";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { getShowsDetails, bookSeats } from "../fetch/agent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate 
} from "react-router-dom";
import { useUser } from "../ContextApi/UserContext";

const TicketBooking = ({ movieID }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch show details by movie ID
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        if(!user){
          notification.error({
            message: "Can't Book Tickets!",
            description:"Please Login to Book your Tickets",
          });
          return
        }
        setIsLoading(true);
        // const response = await getShowsDetails(movieID)
        // alert(JSON.stringify(response))
        // if (response.data.status) {
        //   setShows(response.data.data.shows);
        // }
        await getShowsDetails(movieID)
          .then((response) => setShows(response?.data?.shows || []))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieID) {
      fetchShowDetails();
    }
  }, [movieID]);

  // Function to handle date change on calendar
  const onDateChange = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setSelectedShow(null);
    setSelectedSeats([]);
  };

  // Function to handle show selection
  const onShowSelect = (show) => {
    if(!user){
      notification.error({
        message: "Can't Book Tickets!",
        description:"Please Login to Book your Tickets",
      });
      return
    }
    setSelectedShow(show);
    setSelectedSeats([]);
    setTimeout(() => {
      window.scrollBy({ top: 500, behavior: "smooth" });
    }, 200);
  };

  // Handle seat selection toggle
  const toggleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Confirm order
  const confirmOrder = async () => {
    // alert(JSON.stringify(selectedSeats));
    // return
    try {
      if(movieID && selectedShow){
        await bookSeats(
          {
            id : movieID,
            show_datetime : selectedShow.datetime,
            booked_seats: selectedSeats
          }
        );
        setIsModalVisible(true);
      }
      
      // alert(
      //   JSON.stringify({
      //     movie_id: movieID,
      //     show_datetime: selectedShow.datetime,
      //     booked_seats: selectedSeats,
      //   })
      // );
      // return;
      // await axios.post("/bookSeats", {
      //   movie_id: movieID,
      //   show_datetime: selectedShow.datetime,
      //   booked_seats: selectedSeats,
      // });

      // notification.success({
      //   message: "Order Processed",
      //   description:
      //     "Successfully processed your order. Please collect your receipt.",
      // });
      
    } catch (error) {
      notification.error({
        message: "Booking Failed",
        description: error.message,
      });
    }
  };

  // Calendar date disabling
  // const disablePreviousDates = (date) => date && date < moment().startOf("day");
  // Function to disable dates not in eventDates or before today
  // Parse all datetime values into moment objects
  const eventDates = shows?.map((show) => moment(show.datetime));
  const disablePreviousDates = (current) => {
    // Disable if the date is before today or not in the event dates
    return (
      current.isBefore(moment(), "day") ||
      !eventDates?.some((date) => current.isSame(date, "day"))
    );
  };

  const availableShows = shows.filter((show) =>
    show.datetime.startsWith(selectedDate)
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* {JSON.stringify(shows)} */}
      {/* <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cinema Ticket Booking
      </h1>

      <div style={{ maxWidth: "300px", margin: "0 auto 20px auto" }}>
        <Calendar
          fullscreen={false}
          onSelect={onDateChange}
          disabledDate={disablePreviousDates}
        />
      </div>

      {selectedDate && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Available Shows on {selectedDate}</h2>
          {availableShows.length > 0 ? (
            availableShows.map((show, index) => (
              <Button
                key={index}
                onClick={() => onShowSelect(show)}
                disabled={show.remaining_seats === 0}
                style={{
                  backgroundColor: selectedShow === show ? "#40a9ff" : "#fff",
                  color: selectedShow === show ? "#fff" : "#000",
                }}
              >
                {moment(show.datetime).format("hh:mm A")} (
                {show.remaining_seats} seats left)
              </Button>
            ))
          ) : (
            <p>No show available</p>
          )}
        </div>
      )} */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Ticket Booking
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "80px",
          border: "0px solid",
          marginBottom: 60,
        }}
      >
        {/* Calendar Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Select a Date
          </h2>
          <div
            style={{
              maxWidth: "600px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#f7f9fc",
            }}
          >
            <Calendar
              fullscreen={false}
              onSelect={onDateChange}
              disabledDate={disablePreviousDates}
              style={{
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                overflow: "hidden",
              }}
            />
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            height: "100%",
            borderLeft: "2px solid #d9d9d9",
            margin: "40px 50px 0px 50px",
            minHeight: "300px",
          }}
        ></div>

        {/* Shows Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Available Shows
          </h2>
          {selectedDate ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#f7f9fc",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "500px",
              }}
            >
              {availableShows.length > 0 ? (
                availableShows.map((show, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onShowSelect(show);
                      
                    }}
                    disabled={show.remaining_seats === 0}
                    style={{
                      backgroundColor:
                        selectedShow === show ? "#40a9ff" : "#fff",
                      color: selectedShow === show ? "#fff" : "#000",
                      border: "1px solid #40a9ff",
                      borderRadius: "5px",
                      padding: "20px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor:
                        show.remaining_seats === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {moment(show.datetime).format("hh:mm A")} (
                    {show.remaining_seats} seats left)
                  </Button>
                ))
              ) : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#888",
                  }}
                >
                  No show available
                </p>
              )}
            </div>
          ) : (
            <p style={{ fontSize: "16px", color: "#888", fontWeight: "bold" }}>
              Select a date to see available shows
            </p>
          )}
        </div>
      </div>

      {selectedShow && (
        <div
          style={{
            textAlign: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
            padding: "20px 0px",
            backgroundColor: "#1b1b1b",
            color: "white",
            borderRadius: 30,
          }}
        >
          <h1>Select Your Seats</h1>
          {/* <div style={{ marginBottom: 30, marginTop: 30, border: "1px solid" }}>
            <text
              style={{ fontSize: 18, fontWeight: "bold", padding: "5px 30px" }}
            >
              . . . . . . . . . . . . . . . . . . . Screen . . . . . . . . . . .
              . . . . . . . . .
            </text>
          </div> */}
          <div
            style={{
              marginBottom: 60,
              marginTop: 30,
              width: "40%",
              height: "35px", // Increase height for a larger curve
              backgroundColor: "#d9d9d9",
              borderRadius: "0% 0% 100% 100%", // Bottom rounded corners for the trajectory effect
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 110px 120px lightgray",
              opacity: 1,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                paddingTop: "0px",
                marginTop: -7,
              }}
            >
              . . . . . . . . . . . . . . . . . . Screen . . . . . . . . . . . .
              . . . . . .
            </span>
          </div>

          <div
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {[
              8, // Front row
              11, // Second row
              14, // Third row
              17, // Fourth row
              20, // Fifth row
              23, // Sixth row
              26, // Seventh row
              26, // Eighth row
              // 26, // Ninth row
              // 15, // Tenth row
              // 15, // Back row
            ].map((seatsInRow, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${seatsInRow}, 1fr)`,
                  gap: "10px",
                }}
              >
                {Array.from({ length: seatsInRow }, (_, seatIndex) => {
                  const seatNumber = rowIndex * 15 + seatIndex + 1;
                  const isBooked =
                    selectedShow.booked_seats?.includes(seatNumber);
                  const isSelected = selectedSeats.includes(seatNumber);

                  return (
                    <div
                      key={seatNumber}
                      onClick={() =>
                        !isBooked && toggleSeatSelection(seatNumber)
                      }
                      style={{
                        width: "55px",
                        height: "55px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: isBooked ? "not-allowed" : "pointer",
                        backgroundColor: isBooked
                          ? "red"
                          : isSelected
                          ? "yellow"
                          : "green",
                        color: isSelected ? "gray" : "white",
                        borderRadius: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <FaRegUser style={{ fontSize: 16 }} />
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {selectedSeats.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={confirmOrder}>
                Confirm Order
              </Button>
            </div>
          )}
        </div>
      )}

      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <h2>Order Confirmed</h2>
        <p>Your ticket has been booked!</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {/* <Button onClick={() => setIsModalVisible(false)}>
            Continue Shopping
          </Button> */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            {/* <FaHome style={{ marginRight: "8px", marginBottom:-2}} />  */}
            <strong>Continue Shopping</strong>
          </Link>
          <Button onClick={() => {setIsModalVisible(false); setUser(null); navigate('/');}}>Finish</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TicketBooking;