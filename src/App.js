import React, { useState } from "react";
import Bids from "./bids/Bids";
import Map from "./map/Map";

const App = () => {
  const [selectedBid, setSelectedBid] = useState(null);

  return <div className="main">
    <div className="cards"><Bids onClick={(bid) => setSelectedBid(bid)} /></div>
    <Map className="map" selectedBid={selectedBid} /></div>;
};

export default App;