import { useState } from "react"

import { Input, Text, Button } from "@chakra-ui/react"

function SetItineraryTime({ setItineraryData, setPage, handleDataChange }) {
    const [allowSend, setAllowSend] = useState({
        hour: false, 
        minute: false
    })
    const [hourMessage, setHourMessage] = useState(null)
    const [minuteMessage, setMinuteMessage] = useState(null)
    const [nextMessage, setNextMessage] = useState(null)

    const [timeValue, setTimeValue] = useState(
        {
            hour: 0, 
            minutes: 0
        }
    )

    const handleHourChange = (event) => {
        if (event.target.value < 1) {
            setHourMessage("You need at least one hour for your visit")
            setAllowSend(prevState => ({
                ...prevState,
                hour: false
            }));
        } else if (event.target.value > 5) {
            setHourMessage("You cannot exceed 5 hours of tour")
            setAllowSend(prevState => ({
                ...prevState,
                hour: false
            }));

        } else {
            setHourMessage(null)
            setAllowSend(prevState => ({
                ...prevState,
                hour: true 
            }));
            setTimeValue(prevState => ({
                ...prevState,
                hour: event.target.value
            }));


        }
    }

    const handleMinuteChange = event => {
        if (event.target.value < 0) {
            setMinuteMessage("You cannot have negative minutes")
            setAllowSend(prevState =>({
                ...prevState,
                minute: false 
            }))
        } else if (event.target.value > 59) {
            setMinuteMessage("You cannot have more than 59 minutes")
            setAllowSend(prevState => ({
                ...prevState,
                minute: false
            }))
        } else {
            setMinuteMessage(null)
            setAllowSend(prevState => ({
                ...prevState,
                minute: true
            }))
            setTimeValue(prevState => ({
                ...prevState,
                minutes: event.target.value
            }));
        }
    }
    const handleClick = event =>{
        if(allowSend.hour && allowSend.minute){
            setItineraryData(prevState => ({
                ...prevState,
                estimatedTime: [ timeValue.hour, timeValue.minutes]
            }));
            setPage("TagSelection")
            handleDataChange("desiredTime", [timeValue.hour, timeValue.minutes])
        }else{
            setNextMessage("You need to properly fill all the fields")
        }

    }
    return (
        <form>
            <Text>
                How long do you have for your visit?
            </Text>
            <Input type="number" onChange={handleHourChange} placeholder={"hours"}  />
            :
            <Input type="number" onChange={handleMinuteChange} placeholder={"minutes"}  />
            {nextMessage}  <br />
            {hourMessage}  <br />
            {minuteMessage} <br />

            <Button onClick={handleClick}>→</Button>
        </form>
        )

}

export default SetItineraryTime