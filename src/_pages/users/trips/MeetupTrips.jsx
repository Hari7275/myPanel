import React from "react";
import "../../../cssfolder/MeetupTrips.css";
import meetUpData from "./meetup.json";
import Select from "react-select";

const MeetupTrips = () => {
  const data = meetUpData.data;
  const options = data.map((item) => ({
    label: item.location_name,
    value: item.id,
    tripStartDate: item.createdAt,
  }));

  const defaultStartDate = data[0]?.createdAt.split("T")[0];

 

  return (
    <>
      <div className="meetupData-container sub-container">
        <div className="meetupData-card">
          <h3 className="meetupData-subheading">Meet Ups Trips</h3>

          <div className="row-inside">
            <div>
              <label className="meetup-label">Meetup Location</label>
              {/* <Select className="userProfile-input-field"> */}
              <Select
                className="userProfile-input-fiel"
                options={options}
                placeholder="Select Location"
              />
            </div>

            <div className="meetup-date">
              <div className="meetup-date-subdiv">
                <div className="meetup-date-subdiv1">
                  <label className="meetup-label">Trip Start Date</label>
                  <input
                    type="date"
                    className="userProfile-input-field"
                    defaultValue="2024-04-18"
                  />
                </div>

                <div className="meetup-date-subdiv2">
                  <label className="meetup-label">Trip End Date</label>
                  <input
                    type="date"
                    className="userProfile-input-field"
                    defaultValue="2024-04-18"
                  />
                </div>
              </div>

              <div className="meetup-date-subdiv">
                <div className="meetup-date-subdiv1">
                  <label className="meetup-label">
                    Trip Listing Start Date
                  </label>
                  <input
                    type="date"
                    className="userProfile-input-field"
                    defaultValue="2024-04-18"
                  />
                </div>

                <div className="meetup-date-subdiv2">
                  <label className="meetup-label">Trip Listing End Date</label>
                  <input
                    type="date"
                    className="userProfile-input-field"
                    defaultValue="2024-04-18"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="meetup-label">Trip Description</label>
              <textarea
                placeholder="Trip Dscription Here"
                className="userProfile-input-field"
                rows={3}
              />
            </div>

            <div className="dividerm"></div>

            <button className="fifthButton">Create Trip</button>
          </div>
        </div>

        {/* Whos up trip */}

        <div className="meetupData-card">
          <h3 className="meetupData-subheading">Meet Ups Whos Up</h3>

          <div className="row-inside">
            <div>
              <label className="meetup-label">Whosup Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="userProfile-input-field"
              />
            </div>

            <div className="whosup-date">
              <div className="meetup-date-subdiv">
                <div className="meetup-date-subdiv1">
                  <label className="meetup-label">Trip Start Date</label>
                  <select className="prompt-options">
                    <option>Coffee</option>
                    <option>Dinner</option>
                    <option>Drink</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="meetup-label">Whosup Description</label>
              <textarea
                placeholder="Trip Description Here"
                className="userProfile-input-field"
                rows={3}
              />
            </div>

            <div className="dividerm"></div>

            <button className="fifthButton">Create Whosup</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetupTrips;
