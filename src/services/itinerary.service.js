import apiInstance from "./apiInstance.js"

class ItineraryService {
    constructor() {
        this.api = apiInstance
    }
    create(data) {
        return this.api.post("/itinerary", data);
    }
    addItinerary(userId, data){
        return this.api.put(`/user/itineraries/${userId}`, data)
    }
}

const itineraryService = new ItineraryService();

export default itineraryService;