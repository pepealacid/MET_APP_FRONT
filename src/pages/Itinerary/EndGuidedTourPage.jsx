import { useState } from "react"
import EndQuestion from "../../components/Itinerary/guidedTour/EndQuestion" 
import Rating from "./Rating"
import { Navigate } from "react-router-dom"

function EndGuidedTourPage(){
    const [page, setPage] = useState(1)
    return(<>
        {page == 1 && <EndQuestion setPage={setPage} page={page}>
            Was the time of the tour accurate according to your preference and your estimated time? 
        </EndQuestion>}
        {page == 2 && <EndQuestion setPage={setPage} page={page}>
            Was the information of the Tour artworks useful for you?
        </EndQuestion>}
        {
            page == 3 && <Rating setPage={setPage} page={page}></Rating>
        }
        { page ==4 &&
        <Navigate to="/"></Navigate>
        }
    </>)
}

export default EndGuidedTourPage