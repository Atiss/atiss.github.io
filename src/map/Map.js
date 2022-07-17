import React, { useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import bids from "../assets/NeRelog_apps.json";
import clients from "../assets/NeRelog_clients.json";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerClusterGroup from 'react-leaflet-cluster';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})
const center = [43.238949, 76.889709];

function SetViewOnClick({ animateRef, bid }) {
  const map = useMap();
  if (bid) {
    map.setView([bid?.coords.lat, bid?.coords.long], 18, {
      animate: animateRef.current || false,
    })
  }
  return null
}

const Map = (props) => {
  const animateRef = useRef(false)

  return <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <SetViewOnClick animateRef={animateRef} bid={props.selectedBid} />
    <MarkerClusterGroup
      chunkedLoading
    >
      {bids.map((bid) => {
        return <Marker position={[bid.coords.lat, bid.coords.long]} key={bid.id}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
          }}>
          <Popup className={`tooltip ${bid.type === "delivery" ? "tooltip-delivery" : "tooltip-pickup"}`}>
            <div>
              <span>№ </span><strong>{bid.id}</strong>
            </div>
            <div>
              <strong>{clients.find(client => client.id === bid.client_id).name}</strong>
            </div>
            <div>
              <span>Цена </span><strong>{bid.price}</strong>
            </div>
          </Popup>
        </Marker>
      })}
    </MarkerClusterGroup>
  </MapContainer>
}

export default Map;