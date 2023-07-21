import { useContext, useState } from "react";
import EndQuestion from "../../components/Itinerary/guidedTour/EndQuestion";
import Rating from "./Rating";
import { Navigate } from "react-router-dom";
import { LanguageContext } from "../../context/language.context";

function EndGuidedTourPage() {
  const [page, setPage] = useState(1);
  const { t } = useContext(LanguageContext);

  return (
    t?.tours && (
      <>
        {page == 1 && (
          <EndQuestion setPage={setPage} page={page}>
            {t?.tours.time ||
              "Was the time of the tour accurate according to your preference and your estimated time?"}
          </EndQuestion>
        )}
        {page == 2 && (
          <EndQuestion setPage={setPage} page={page}>
            {t?.tours.info ||
              "Was the information of the Tour artworks useful for you?"}
          </EndQuestion>
        )}
        {page == 3 && <Rating setPage={setPage} page={page}></Rating>}
        {page == 4 && <Navigate to="/home/tours"></Navigate>}
      </>
    )
  );
}

export default EndGuidedTourPage;
