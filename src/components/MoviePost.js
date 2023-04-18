import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MoviePost.css";
import Title from "./Title";
import ReleaseDate from "./ReleaseDate";
import OpeningCrawl from "./OpeningCrawl";
import MoreInfo from "./MoreInfo";
import Loading from "./Loading";

const MoviePost = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/films`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  });
  return (
    <div>
      {loading && <Loading />}
      {error && <div>{`There is a problem fetching your data - ${error}`}</div>}
      <div className="movieCardContainer">
        {data &&
          data.results.map((item, index) => {
            const d = new Date(item.release_date);
            const releaseDate = d.toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            const openingCrawlParagraph =
              item.opening_crawl.length > 260
                ? `${item.opening_crawl.substring(0, 260)}...`
                : item.opening_crawl;

            return (
              <div key={item.episode_id} className="movieCard">
                <Title movieTitle={item.title} />
                <ReleaseDate date={releaseDate} />
                <OpeningCrawl openingCrawl={openingCrawlParagraph} />
                <MoreInfo />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MoviePost;
