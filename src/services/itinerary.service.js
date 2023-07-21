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
    removeItinerary(userId, data) {
        return this.api.put(`/user/itineraries/remove/${userId}`, data)
    }
    getUserItineraries(userId){
        return this.api.get(`/user/itineraries/${userId}`)
    }
    getItineraryById(id){
        return this.api.get(`/itinerary/${id}`)
    }
    getAll(){
        return this.api.get("/itinerary/")
    }
}

const itineraryService = new ItineraryService();

export default itineraryService;

