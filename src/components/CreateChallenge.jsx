import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function CreateChallenge() {
    const IMAGE_API = process.env.REACT_APP_IMAGE_API;
    const navigate = useNavigate();

    const [challengeData, setChallengeData] = useState({
        challenge_name: '',
        start_date: '',
        end_date: '',
        description: '',
        file: null,
        level: ''
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
            const file = e.target.files ? e.target.files[0] : null;
            setChallengeData((prevState) => ({ ...prevState, file: file }));
        } else {
            setChallengeData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { challenge_name, start_date, end_date, description, file, level } = challengeData;
        if (!challenge_name || !start_date || !end_date || !description || !file || !level) {
            alert("Fill all the fields");
            return;
        }

        if (new Date(start_date) > new Date(end_date)) {
            alert("Invalid time duration");
            return;
        }

        setIsLoading(true);
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "kfgw6ech");
        try {
            const resCloudinary = await fetch(`${IMAGE_API}`, {
                method: "POST",
                body: form,
            });

            const dataCloudinary = await resCloudinary.json();
            if (dataCloudinary && dataCloudinary.url) {
                let listObj = [];
                let list = localStorage.getItem('challenge-list');
                if (list == null) listObj = [];
                else listObj = JSON.parse(list);
                listObj.push({ challenge_name, start_date, end_date, description, file: `${dataCloudinary.url}`, level });
                localStorage.setItem("challenge-list", JSON.stringify(listObj));

                setMessage("Successfully created");
                setTimeout(() => {
                    setMessage("");
                    navigate('/');
                }, 1000);

                setChallengeData({
                    challenge_name: '',
                    start_date: '',
                    end_date: '',
                    description: '',
                    file: null,
                    level: 'easy'
                });

                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className='relative'>
            {message && (
                <div className={`sticky top-0 z-50 w-full p-4 text-[16px] lg:text-[20px] text-black font-[500] ${message === "Successfully created" && "bg-green-300"}`}>
                    {message}
                </div>
            )}
            <div className='px-10 lg:px-20 py-3 lg:py-5 font-semibold text-[18px]'>
                <Link to="/">DPhi</Link>
            </div>
            <div className='px-14 py-3 lg:px-20 lg:py-9 font-semibold text-[16px] lg:text-[25px] bg-slate-100'>
                Challenge Details
            </div>
            <form className='px-7 py-6 lg:px-20 lg:py-10'>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:mb-8'>
                    <label htmlFor="challenge_name" className='block font-medium'>Challenge Name</label>
                    <input type="text" id="challenge_name" name="challenge_name" value={challengeData.challenge_name} onChange={handleOnChange} placeholder="Challenge Name" className='border-[1px] border-neutral-400 rounded-md w-[300px] lg:w-[500px] p-2 outline-0' />
                </div>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:my-8'>
                    <label htmlFor="start_date" className='block font-medium'>Start Date</label>
                    <input type="date" id="start_date" name="start_date" value={challengeData.start_date} onChange={handleOnChange} placeholder="Add start date" className='border-[1px] border-neutral-400 rounded-md w-[300px] lg:w-[500px] p-2 outline-0' />
                </div>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:my-8'>
                    <label htmlFor="end_date" className='block font-medium'>End Date</label>
                    <input type="date" id="end_date" name="end_date" value={challengeData.end_date} onChange={handleOnChange} placeholder="Add end date" className='border-[1px] border-neutral-400 rounded-md w-[300px] lg:w-[500px] p-2 outline-0' />
                </div>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:my-8'>
                    <label htmlFor="description" className='block font-medium'>Description</label>
                    <textarea id="description" name="description" value={challengeData.description} onChange={handleOnChange} className='resize-none border-[1px] border-neutral-400 rounded-md w-[300px] lg:w-[500px] h-[300px] p-2 outline-0'></textarea>
                </div>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:my-8'>
                    <label className='block font-medium'>Image</label>
                    <input type="file" id="file" name="file" onChange={handleOnChange} className='border-2' />
                </div>
                <div className='space-y-2 lg:space-y-4 text-[14px] lg:text-[17px] mb-5 lg:my-8'>
                    <label className='block font-medium'>Level Type</label>
                    <select id="level" name="level" className='p-2 bg-transparent border-[1px] border-neutral-400 rounded-md w-[200px] outline-0 cursor-pointer' onChange={handleOnChange}>
                        <option value="">Select level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <button className='bg-green-700 text-white text-[17px] font-semibold px-3 lg:px-5 py-2 lg:py-3 mt-6 lg:mt-10 rounded-md' onClick={handleOnSubmit}>
                    {isLoading && <AutorenewIcon className='animate-spin' />} Create Challenge
                </button>
            </form>
        </div>
    )
}

export default CreateChallenge;
