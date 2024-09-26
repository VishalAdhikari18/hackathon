import { useState } from 'react'; 
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ChallengeDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dataObj = Object.fromEntries(queryParams.entries());
    
    const params = useParams();
    const navigate = useNavigate();

    const [challenge, setChallenge] = useState(dataObj);

    const start_date = new Date(challenge.start_date);
    const end_date = new Date(challenge.end_date);

    const getEventStatus = (start_date, end_date) => {
        const currentDate = new Date();

        if (currentDate < start_date) {
            return "Upcoming";
        } else if (currentDate >= start_date && currentDate <= end_date) {
            return "Active";
        } else {
            return "Past";
        }
    };

    const eventStatus = getEventStatus(start_date, end_date);

    const formatDate = (date) => {
        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const handleOnEdit = () => {
        const queryParams = new URLSearchParams(dataObj).toString();
        navigate(`/edit-challenge/${parseInt(params.idx || '0', 10)}?${queryParams}`);
    }

    const handleOnDelete = () => {
        let listObj = [];
        let list = localStorage.getItem('challenge-list');
        if (list == null) listObj = [];
        else {
            listObj = JSON.parse(list);
            const updatedList = listObj.filter((_, index) => index !== parseInt(params.idx || '0', 10));
            localStorage.setItem('challenge-list', JSON.stringify(updatedList));
        }
        navigate('/');
    };

    return (
        <div>
            <div className='px-10 lg:px-20 py-3 lg:py-5 font-semibold text-[18px]'>
                <Link to="/">DPhi</Link>
            </div>

            <div className="p-14 lg:p-32 bg-[#003145] text-white space-y-6 cursor-default">
                <div className='px-3 py-2 bg-yellow-300 text-black lg:w-[550px] text-[13px] lg:text-[16px] rounded-md font-semibold flex items-center space-x-2'>
                    <AccessTimeIcon sx={{ fontSize: "18px" }} />
                    <span>
                        {eventStatus === "Upcoming" && `Starts on ${formatDate(start_date)} (Indian Standard Time)`}

                        {eventStatus === "Active" && `Ongoing - Started on ${formatDate(start_date)} (Indian Standard Time)`}

                        {eventStatus === "Past" && `Ended on ${formatDate(end_date)} (Indian Standard Time)`}
                    </span>
                </div>

                <div className='text-[20px] lg:text-[42px] font-bold'>
                    <p>{challenge.challenge_name}</p>
                </div>
                <div className='text-[14px] lg:text-[20px]'>
                    <p>Identify the class to which each butterfly belongs to</p>
                </div>
                <div className='bg-white text-[#003145] font-bold flex items-center justify-center py-1 lg:py-2 space-x-3 w-[110px] rounded-md'>
                    <img src="/assets/icons/carbon_skill-level-basic.svg" alt="" />
                    <div>{challenge.level}</div>
                </div>
            </div>

            <div className='flex items-center justify-between px-7 lg:px-32 shadow-xl'>
                <div className='pb-3 pt-5 lg:pt-8 px-2 lg:px-4 text-[14px] lg:text-[22px] font-bold border-b-[3px] lg:border-b-[4px] border-b-green-600'>Overview</div>
                <div className='space-x-4 lg:space-x-7'>
                    <button className='font-bold bg-green-700 border-2 border-green-700 text-white text-[14px] lg:text-[16px] py-[3px] lg:py-[5px] w-[60px] lg:w-[90px] rounded-lg' onClick={handleOnEdit}>Edit</button>
                    <button className='font-bold border-2 border-red-600 text-red-600 text-[14px] lg:text-[16px] py-[3px] lg:py-[5px] w-[60px] lg:w-[90px] rounded-lg' onClick={handleOnDelete}>Delete</button>
                </div>
            </div>

            <div className='px-7 lg:px-20 xl:px-32 py-7 lg:py-20'>
                <p className='whitespace-pre-wrap xl:w-[956px] font-semibold text-[14px] lg:text-[18px] text-[#64607D] leading-7 lg:leading-10'>{challenge.description}</p>
            </div>
        </div>
    );
}

export default ChallengeDetails;
