import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function ChallengeCard({ challenge, idx }) {

    const navigate = useNavigate();

    const [eventTime, setEventTime] = useState('');
    const [timer, setTimer] = useState('');

    useEffect(() => {
        const now = new Date();
        const startDate = new Date(challenge.start_date);
        const endDate = new Date(challenge.end_date);

        if (now > endDate) {
            setEventTime('Past');
        } else if (now < startDate) {
            setEventTime('Upcoming');
            updateTimer(startDate);
        } else {
            setEventTime('Active');
            updateTimer(endDate);
        }
    }, [challenge.start_date, challenge.end_date]);

    useEffect(() => {
        let interval = null;

        if (eventTime === 'Upcoming' || eventTime === 'Active') {
            interval = setInterval(() => {
                const targetDate = eventTime === 'Upcoming' ? new Date(challenge.start_date) : new Date(challenge.end_date);
                updateTimer(targetDate);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [eventTime, challenge.start_date, challenge.end_date]);

    function updateTimer(targetDate) {
        const now = new Date();
        const timeRemaining = targetDate.getTime() - now.getTime();

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
            setTimer('00d 00h 00m 00s');
        }
    };

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
    
        const parts = formatter.formatToParts(date);
        const day = parts.find(part => part.type === 'day')?.value;
        const month = parts.find(part => part.type === 'month')?.value;
        const year = parts.find(part => part.type === 'year')?.value;

        const dayWithSuffix = addOrdinalSuffix(day);
    
        return `${dayWithSuffix} ${month}'${year}`;
    };
    
    function addOrdinalSuffix(day) {
        if (!day) return '';
        const dayNumber = parseInt(day, 10);
        if (dayNumber > 3 && dayNumber < 21) return `${day}th`;
        switch (dayNumber % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    const handleToShow = () => {
        const queryParams = new URLSearchParams(challenge).toString();
        navigate(`/challenge-detail/${idx}?${queryParams}`);
    };

  return (
    <div className="w-[340px] overflow-hidden lg:w-[354px] h-[450px] bg-white text-black rounded-xl">
        <div className="h-[176px] overflow-hidden">
            <img src={challenge.file} alt="" />
        </div>
        <div className="text-center py-7 space-y-4">
            <p className={`px-7 py-[1px] ${eventTime === 'Past' && 'bg-[#FF3C00]'} ${eventTime === 'Upcoming' && 'bg-yellow-400'} ${eventTime === 'Active' && 'bg-green-400'} bg-opacity-20 max-w-min m-auto rounded-sm text-[14px]`}>
                {eventTime}
            </p>
            <div className="font-bold w-[244px] h-[55px] overflow-y-hidden m-auto text-[16px]">
                {challenge.challenge_name}
            </div>
            {eventTime === 'Past' && (
                <>
                    <p>Ended on</p>
                    <p className="text-[18px] font-bold text-gray-600">
                        {formatDate(challenge.end_date)}
                    </p>
                </>
            )}
            {eventTime === 'Active' && (
                <>
                    <p>Ends in</p>
                    <p className="text-[18px] font-bold text-gray-600">
                        {timer}
                    </p>
                </>
            )}
            {eventTime === 'Upcoming' && (
                <>
                    <p>Starts on</p>
                    <p className="text-[18px] font-bold text-gray-600">
                        {timer}
                    </p>
                </>
            )}
            <button className="bg-green-700 text-white text-[16px] font-semibold px-5 py-2 rounded-md space-x-4" onClick={handleToShow}>
                <TaskAltIcon sx={{ fontSize: "18px" }} />
                <span>Participate Now</span>
            </button>
        </div>
    </div>
  );
}

export default ChallengeCard;
