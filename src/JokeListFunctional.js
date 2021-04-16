import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import { useEffect, useState } from "react";

JokeListFunctional.defaultProps = {
  numJokesToGet: 5,
};

function JokeListFunctional({ numJokesToGet }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* retrieve jokes from API */
  async function getJokes() {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let jokesArr = [];
      let seenJokes = new Set();

      while (jokesArr.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokesArr.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes(jokesArr);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getJokes();
  }, []);

  /* empty joke list, set to loading state, and then call getJokes */

  function generateNewJokes() {
    setIsLoading(true);
    getJokes();
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes((jokes) =>
      jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }

  /* render: either loading spinner or list of sorted jokes. */
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  return isLoading ? (
    <div className="loading">
      <i className="fas fa-4x fa-spinner fa-spin" />
    </div>
  ) : (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {sortedJokes.map((j) => (
        <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
      ))}
    </div>
  );
}

export default JokeListFunctional;
