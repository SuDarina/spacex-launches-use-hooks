import React, {useEffect, useState} from "react";
import "./App.css"

function Timer(props){

    const[new_date, setDate] = useState(null)
    const[new_hours, setHours] = useState(null)
    const[new_minutes, setMinutes] = useState(null)
    const[flag, setFlag] = useState(null)

    function getCountDownDate(){
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName =  monthNames[props.months - 1];
        return new Date(monthName + ' ' + props.date + ' ' + props.years + ' ' + props.hours + ':' + props.minutes + ':00')
    }

    function tick() {
        let now = new Date().getTime();
        const countDownDate = getCountDownDate().getTime();
        const flag = countDownDate - now > 0 ? 1:-1;
        const distance = Math.abs(countDownDate - now);
        const days = Math.floor((distance / (1000 * 60 * 60 * 24)));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)));

        setDate(days)
        setHours(hours)
        setMinutes(minutes)
        setFlag(flag)


    }

    function printDate() {
        let day = props.date
        if(String(day).length === 1) day = '0' + String(day)
        let month = props.months
        if(String(month).length === 1) month = '0' + String(month)
        let year = props.years
        let quarter = props.quarter

        let hour = props.hours
        if(String(hour).length === 1) hour = '0' + String(hour)
        let minute = props.minutes
        if(String(minute).length === 1) minute = '0' + String(minute)

        if (day === null) day = '??'
        if (month === null) month = '??'
        if (year === null) year = '????'
        if (hour === null) hour = '??'
        if (minute === null) minute = '??'
        if (quarter === null) quarter = '?'

        return day + '.' + month + '.' + year +' (' + quarter + ' quarter), ' + hour + ':' + minute
    }

    function modifyOutput() {
        if (!isNaN(new_date) && !isNaN(new_hours) && !isNaN(new_minutes)){
            let prefix = flag === 1 ? "Left: " : "Passed: "
            return <section> {prefix} <div className="timer"> {new_date} <small> days </small>{new_hours} <small>hours</small>  {new_minutes} <small>minutes</small></div></section>

        } else {
            return 'Exact launch time unknown'
        }
    }
    useEffect(() =>{
        tick()
        const timerID = setInterval(
            () => tick(),
            1000
        );
        return () => {
            clearInterval(timerID);
        }
    });

        return (
            <div>
                <h3>{printDate()}</h3>
                {modifyOutput()}
            </div>
        );
}

export default Timer;