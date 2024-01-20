import React, { useState } from "react";
import "./PathfindingVisualizer.css";
import Grid from "../components/Grid/Grid";
import Navbar from "../components/Nav_bar/Navbar";
import Footer from "../components/footer/Footer";
import { Context } from "../components/Contex/Context";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


export default function PathfindingVisualizer() {
  const [Algorithm, setAlgorithm] = useState(null);
  const [Visualize, setVisualize] = useState(false);
  const [clear, setClear] = useState(false);
  const [cursor, setCursor] = useState("Cursor");
  const [isTourOpen, setIsTourOpen] = useState(true);
  const accentColor = "#5cb7b7";
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

   const closeTour = () => {
     setIsTourOpen(false);
   };

  const tourConfig = [
    {
      selector: ".node-Start",
      content:
        "Welcome to the tour! This is where our journey begins. Click on the Icon and Place at any other node to set a new starting point.",
    },
    {
      selector: ".node-Finish",
      content:
        "Here's our final destination, marking the end of our tour. You can click on the Icon and Place at any other node to choose a different finishing point.",
    },
    {
      selector: ".Algorithm",
      content: "Select different algorithms to guide our tour.",
    },
    // {
    //   selector: ".Maze",
    //   content: "Explore various maze types during our tour.",
    // },
    {
      selector: ".weightIcon",
      content:
        "Adjust weights between nodes using these icons. The default weight between nodes is 1 km. Click on the Icon and Place at any other node to modify its weight.",
    },
    {
      selector: ".go",
      content:
        "Initiate the tour and navigate through the tour points by clicking here.",
    },
    {
      selector: ".stop",
      content:
        "If you wish to halt the current tour and start a new one, use this button.",
    },
    {
      selector: ".wall",
      content:
        "Walls act as barriers obstructing our path during the tour. You can create walls by dragging across nodes.",
    },
    {
      selector: ".unvisited",
      content:
        "Unvisited nodes are unexplored points that won't be considered for finding the shortest path.",
    },
    {
      selector: ".visited",
      content:
        "Visited nodes are places our algorithm has explored. They are significant for our journey, though not necessarily part of the shortest path.",
    },
    {
      selector: ".path",
      content:
        "Once the tour concludes, the highlighted path represents the route we followed.",
    },
  ];



  return (
    <>
      <Context.Provider
        value={[
          Algorithm,
          setAlgorithm,
          Visualize,
          setVisualize,
          clear,
          setClear,
          cursor,
          setCursor,
        ]}
      >
        <Navbar></Navbar>
        <Grid></Grid>
        <Footer></Footer>
      </Context.Provider>
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="instruction"
        rounded={5}
        accentColor={accentColor}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
      />
    </>
  );
}
const steps = [
  {
    selector: '.grid',
    content: 'This is my first Step',
  },
]
