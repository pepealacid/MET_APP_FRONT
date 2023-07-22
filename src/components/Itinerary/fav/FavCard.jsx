import { Grid, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FavCard.css";

function FavCard({ tour }) {
  const tourId = tour._id;
  const navigate = useNavigate();

  const goToDetailsPage = () => {
    navigate(`/itinerary/${tourId}`);
  };
  return (
    <>
      <div className="little-artwork-card" onClick={goToDetailsPage}>
        <div className="top">
          <div className="img-container">
            <img className="main-img" src={tour.picture} alt="artwork" />
          </div>
        </div>
        <div className="foot">
          <Heading as="h6" size="xs">
            {tour.name}
          </Heading>
        </div>
      </div>
    </>
  );
}

export default FavCard;
