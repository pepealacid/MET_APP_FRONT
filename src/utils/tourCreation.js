import apiMET from "../services/apiMET.service"


function getRandomElement(arr) {
    if (arr.length === 0) {
        return undefined; // Return undefined if the array is empty
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export function decideArtpiecesAmount (timeArray){
    const totalMinutes = Number(timeArray[0] * 60) + Number(timeArray[1])
    return Math.round(totalMinutes/9)
}

export async function decideTourArtpieces (number, departments){
    // get all departments
    const allArt = await apiMET.getAllDepartmentPieces(departments)
    console.log(allArt)
    const selectedPieces = []
    const galleries = []
    const piecesData = []

    while(selectedPieces.length < number){

        //seleccionar elemento random y ver si tiene gallery number y si no está repetido 
        const randomId = getRandomElement(allArt.data.objectIDs)
        const object = await apiMET.getObject(randomId)

        const isInTheMuseum = object.data.GalleryNumber
        const hasPicture = object.data.primaryImage
        const isNotDuplicated = !selectedPieces.includes(randomId)
        
        if ( isInTheMuseum && hasPicture && isNotDuplicated){
            console.log(randomId)
            selectedPieces.push(randomId)
            galleries.push(object.data.GalleryNumber)
            piecesData.push(object.data)
        }else{
            console.log("Doest have")

        }
        
    }
    return {selectedPieces, galleries, piecesData}
}



