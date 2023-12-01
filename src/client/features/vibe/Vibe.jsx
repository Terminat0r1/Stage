import React, { useState } from "react";
import VibeUnit from "./VibeUnit";
import "./vibe.css";

const userMockData = [
  {
    id: 1,
    username: "Emmy",
    location: "Denver",
    post: "15",
    bookmark: "3",
    Following: "false",
  },
  {
    id: 2,
    username: "Noah",
    location: "Tampa",
    post: "95",
    bookmark: "76",
    Following: "false",
  },
  {
    id: 3,
    username: "Hanna",
    location: "New york",
    post: "58",
    bookmark: "26",
    Following: "false",
  },
  {
    id: 4,
    username: "Olivia",
    location: "New york",
    post: "58",
    bookmark: "26",
    Following: "false",
  },
  {
    id: 5,
    username: "Ella",
    location: "Los Angeles",
    post: "45",
    bookmark: "2",
    Following: "false",
  },
  {
    id: 6,
    username: "James",
    location: "Chicago",
    post: "68",
    bookmark: "71",
    Following: "false",
  },
  {
    id: 7,
    username: "Hazel",
    location: "Houston",
    post: "75",
    bookmark: "16",
    Following: "false",
  },
  {
    id: 8,
    username: "Riley",
    location: "Phoenix",
    post: "14",
    bookmark: "62",
    Following: "false",
  },
  {
    id: 9,
    username: "Isabella",
    location: "Houston",
    post: "35",
    bookmark: "75",
    Following: "false",
  },
  {
    id: 10,
    username: "Liam",
    location: "New york",
    post: "24",
    bookmark: "52",
    Following: "false",
  },
  {
    id: 11,
    username: "Bella",
    location: "Chicago",
    post: "18",
    bookmark: "36",
    Following: "false",
  },
  {
    id: 12,
    username: "Leo",
    location: "Los Angeles",
    post: "53",
    bookmark: "82",
    Following: "false",
  },
];
const Vibe = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleCityButtonClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSearchInputChange = (event) => {
    setSelectedLocation(null);
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Perform search logic here (for simplicity, using filter in this example)
    const result = userMockData.filter((user) =>
      user.username.includes(searchTerm)
    );

    setSearchResult(result);
  };
  console.log(searchResult);
  return (
    <>
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1>The Vibe</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <form className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">
                  Find user by Username
                </label>
                <br />
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="citysearch"
                  placeholder="Search by Username"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              <button type="submit" className="btn btn-dark mb-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleCityButtonClick("New york")}
        >
          New York City
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleCityButtonClick("Los Angeles")}
        >
          Los Angeles
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleCityButtonClick("Chicago")}
        >
          Chicago
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleCityButtonClick("Houston")}
        >
          Houston
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleCityButtonClick("Phoenix")}
        >
          Phoenix
        </button>
      </div>

      <div className="container py-5 px-3 w-100">
        {searchResult ? (
          <div className="container py-5 px-3 w-100">
            {userMockData
              .filter((user) => {
                const matchesLocation =
                  !selectedLocation || user.location === selectedLocation;
                const matchesSearch =
                  !searchTerm || user.username.includes(searchTerm);
                return matchesLocation && matchesSearch;
              })
              .map((user) => (
                <VibeUnit user={user} key={user.id} />
              ))}
          </div>
        ) : (
          <div className="container py-5 px-3 w-100">
            {searchResult.length > 0 ? (
              searchResult.map((user) => <VibeUnit user={user} key={user.id} />)
            ) : (
              <p>User not found in the system</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Vibe;
