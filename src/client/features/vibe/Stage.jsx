import React, { useState } from "react";
import StageUnit from "./StageUnit";
import "./vibe.css";
import { useGetPostStageQuery } from "../stage/postSlice";

const Stage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchUsername, setSearchUsername] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data, error, isLoading, refetch } = useGetPostStageQuery();

  // const handleCityButtonClick = (location) => {
  //   setSelectedLocation(location);
  // };

  function handleRefetchOne() {
    // force re-fetches the data
    refetch();
  }

  const handleSearchInputChange = (event) => {
    setSelectedLocation(null);
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Perform search logic here
    const result = data.filter((post) => {
      const matchesLocation = post.author.location.includes(searchTerm);
      const matchesUsername = post.author.username.includes(searchTerm);

      // Include a post in the result if it matches either location or username
      return matchesLocation || matchesUsername;
    });

    setSearchResult(result);
  };

  console.log(searchTerm);
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
        <div className="title">
          <h1>The Stage</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <form className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" type="text" >
                Explore Other Users
                </label>
                <br />
                <input
                  type="text"
                  className="inputBox"
                  id="citysearch"
                  placeholder="Search by Location or Username"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              
              <button type="submit" className="btn btn-dark mb-2 searchBtn">
              {/* btn btn-dark mb-2 */}
                Search
              </button>
             
            </form>
          </div>
        </div>
      </div>

      <div className="container py-5 px-3 w-100">
        <div className="container py-5 px-3 w-100">
          {data
            .filter((post) => {
              const matchesSearch =
                !searchTerm ||
                post.author.location.includes(searchTerm) ||
                post.author.username.includes(searchTerm);
              return matchesSearch;
            })
            .map((post) => (
              <StageUnit post={post} key={post.id} refetch={handleRefetchOne} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Stage;
