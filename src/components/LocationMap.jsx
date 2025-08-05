// components/AddressMap.jsx
import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { haversineDistance } from "../utils/Distance";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMap = ({ setDistance }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const storeLocation = { lat: 19.076, lng: 72.8777 }; // Example: Mumbai

  const handleSearch = async () => {
    if (!address) return;

    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: address,
          format: "json",
        },
      });

      if (res.data && res.data.length > 0) {
        const lat = parseFloat(res.data[0].lat);
        const lon = parseFloat(res.data[0].lon);
        const userCoords = { lat, lng: lon };

        setLocation(userCoords);

        const dist = haversineDistance(storeLocation, userCoords);
        setDistance(Number(dist.toFixed(2)));
      } else {
        alert("Location not found. Try a different address.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching location.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Find
          </button>
        </div>
      </div>

      {location && (
        <div className="h-60 w-full rounded overflow-hidden">
          <MapContainer center={location} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={location} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
