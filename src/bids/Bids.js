import React from "react";
import BidCard from "./BidCard";
import bids from "../assets/NeRelog_apps.json";
import clients from "../assets/NeRelog_clients.json";

const Bids = (props) => {
  return <div>
    {bids.map((bid) => {
      return < div key={bid.id}>
        <BidCard bid={bid} client={clients.find(client => bid.client_id === client.id)} onClick={() => props.onClick(bid)} />
      </div>
    })}
  </div >;
};

export default Bids;