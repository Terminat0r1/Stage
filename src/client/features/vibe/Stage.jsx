import React, { useState } from "react";
import VibeUnit from "./StageUnit";
import "./vibe.css";
import { useGetPostPittsQuery, useGetPostByLocationQuery } from "./stageSlice";

const userMockData = [
  {
    id: 1,
    username: "emmy",
    location: "Denver",
    post: "15",
    bookmark: "3",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/36YnV9STBqc?si=N6-YwhwHuy35PaFm"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    ),
    username: "noah",
    location: "Tampa",
    post: "95",
    bookmark: "76",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/XeE4EJ6XRGU?si=2dPp7rtVOtBLIodC"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 3,
    username: "hanna",
    location: "New york",
    post: "58",
    bookmark: "26",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/36YnV9STBqc?si=N6-YwhwHuy35PaFm"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    ),
  },
  {
    id: 4,
    username: "olivia",
    location: "New york",
    post: "58",
    bookmark: "26",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/uIFNY2T_XJc?si=-IYxFJ8iWWJNkJhl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 5,
    username: "ella",
    location: "Los Angeles",
    post: "45",
    bookmark: "2",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/HQtFR3mhzOY?si=Ord8YOd7kU-BQn1x"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 6,
    username: "james",
    location: "Chicago",
    post: "68",
    bookmark: "71",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/XeE4EJ6XRGU?si=2dPp7rtVOtBLIodC"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 7,
    username: "hazel",
    location: "Houston",
    post: "75",
    bookmark: "16",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/sgEJ4sOwboM?si=iqFlSIh6q9n0QZhj"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 8,
    username: "riley",
    location: "Phoenix",
    post: "14",
    bookmark: "62",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yqrnhrkA7ik?si=QbURsIMtsUVa_tdR"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 9,
    username: "isabella",
    location: "Houston",
    post: "35",
    bookmark: "75",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/C9qudJOsgnE?si=nM1n-ClVGFtqeqKA"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 10,
    username: "liam",
    location: "New york",
    post: "24",
    bookmark: "52",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/qXESA3vqHQw?si=eeinwCHBeiL9MK8Z"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 11,
    username: "bella",
    location: "Chicago",
    post: "18",
    bookmark: "36",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/WsDyRAPFBC8?si=0R8mKvvMkkGd7-du"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    ),
  },
  {
    id: 12,
    username: "leo",
    location: "Los Angeles",
    post: "53",
    bookmark: "82",
    Following: "false",
    embed: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/36YnV9STBqc?si=N6-YwhwHuy35PaFm"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    ),
  },
];
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
