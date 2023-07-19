import ArtworkCard from "./artworkCard"

function TourCard({currentGallery}){
    

    return (<>
        
        {
            currentGallery?.artwork ?
                <ArtworkCard artpiece={currentGallery.artwork} gallery={currentGallery.gallery}/>

            :
                `This next gallery you have to go is ${currentGallery && currentGallery?.gallery}`
                 


        }
        {
           
        }
        </>)

}

export default TourCard