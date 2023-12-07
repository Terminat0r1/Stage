import React, { useState } from "react";
import VibeUnit from "./StageUnit";
import "./vibe.css";
import { useGetPostPittsQuery, useGetPostByLocationQuery } from "./stageSlice";

const Stage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data, error, isLoading } = useGetPostPittsQuery();

  // const handleCityButtonClick = (location) => {
  //   setSelectedLocation(location);
  // };

  const handleSearchInputChange = (event) => {
    setSelectedLocation(null);
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Perform search logic here (for simplicity, using filter in this example)
    const result = data.filter((post) =>
      post.author.location.includes(searchTerm)
    );

    setSearchResult(result);
  };

  console.log(data);
  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">Error fetching data: {error.message}</div>
    );
  }
  return (
    <>
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1>The Stage Page</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <form className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">
                  Find user by Location
                </label>
                <br />
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="citysearch"
                  placeholder="Search by Location"
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

      <div className="container py-5 px-3 w-100">
        {searchResult ? (
          <div className="container py-5 px-3 w-100">
            {data
              .filter((post) => {
                const matchesSearch =
                  !searchTerm || post.author.location.includes(searchTerm);
                return matchesSearch;
              })
              .map((post) => (
                <VibeUnit post={post} key={post.id} />
              ))}
          </div>
        ) : (
          <div className="container py-5 px-3 w-100">
            {searchResult.map((post) => (
              <VibeUnit post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Stage;
