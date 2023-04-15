import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPodcasts } from "../store/podcasts/podcasts.slice";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, []);
  return <h1>Hello World!</h1>;
}
