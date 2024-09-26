import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChallengeCard from './ChallengeCard';

function ExploreChallenges() {
    const filterRef = useRef(null);

    const [isFilter, setIsFilter] = useState(false);
    const [challengeList, setChallengeList] = useState([]);
    const [filteredChallengeList, setFilteredChallengeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState([]);
    const [filterLevel, setFilterLevel] = useState([]);

    useEffect(() => {
        let listObj = [];
        let list = localStorage.getItem("challenge-list");
        if (list == null) setChallengeList(listObj);
        else {
            listObj = JSON.parse(list);
            setChallengeList(listObj);
            setFilteredChallengeList(listObj);
        }
    }, []);

    useEffect(() => {
        filterChallenges();
    }, [filterStatus, filterLevel, searchQuery, challengeList]);

    const handleFilterStatus = (event) => {
        const value = event.target.value;
        if (filterStatus.includes(value)) {
            setFilterStatus(filterStatus.filter(status => status !== value));
        } else {
            setFilterStatus([...filterStatus, value]);
        }
    };

    const handleFilterLevel = (event) => {
        const value = event.target.value;
        if (filterLevel.includes(value)) {
            setFilterLevel(filterLevel.filter(level => level !== value));
        } else {
            setFilterLevel([...filterLevel, value]);
        }
    };

    const filterChallenges = () => {
        let filteredList = challengeList;

        if (filterStatus.length > 0) {
            filteredList = filteredList.filter(challenge => filterStatus.includes(getChallengeStatus(challenge)));
        }

        if (filterLevel.length > 0) {
            filteredList = filteredList.filter(challenge => filterLevel.includes(challenge.level));
        }

        if (searchQuery) {
            filteredList = filteredList.filter(challenge => challenge.challenge_name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredChallengeList(filteredList);
    };

    const getChallengeStatus = (challenge) => {
        const now = new Date();
        const startDate = new Date(challenge.start_date);
        const endDate = new Date(challenge.end_date);

        if (now < startDate) return 'upcoming';
        if (now >= startDate && now <= endDate) return 'active';
        if (now > endDate) return 'past';

        return '';
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterRef]);

    return (
        <div>
            <div className='bg-[#002A3B] text-white py-8 xl:py-16 space-y-8 xl:space-y-16'>
                <div className='text-center text-[16px] xl:text-[30px] font-bold'>Explore Challenges</div>
                <div className='md:flex items-center justify-center space-y-5 md:space-y-0 md:space-x-5 xl:space-x-10 max-w-min m-auto'>
                    <div className='bg-white max-w-min m-auto flex items-center px-3 rounded-lg'>
                        <SearchIcon sx={{ color: 'gray' }} />
                        <input 
                            type="text" 
                            placeholder='Search' 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className='w-[300px] xl:w-[700px] outline-0 text-black bg-transparent px-3 py-[4px] xl:py-3 text-[16px] xl:text-[18px]' 
                        />
                    </div>

                    <div ref={filterRef} className='relative max-w-min m-auto'>
                        <div 
                            className='bg-white text-black w-[100px] m-auto xl:w-[180px] flex items-center justify-between px-3 py-1 xl:py-3 rounded-md cursor-pointer' 
                            onClick={() => setIsFilter(!isFilter)}
                        >
                            <span className='font-semibold'>Filter</span> 
                            {!isFilter ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                        </div>

                        {isFilter && (
                            <div className={`absolute z-50 -left-[40%] xl:left-0 xl:top-11 w-[180px] bg-white text-gray-700`}>
                                <div className='px-5 py-3 border-t-[1px] space-y-2'>
                                    <p className='text-[18px]'>Status</p>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="active" value="active" checked={filterStatus.includes('active')} onChange={handleFilterStatus} /> 
                                        <label htmlFor='active'>Active</label>
                                    </div>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="upcoming" value="upcoming" checked={filterStatus.includes('upcoming')} onChange={handleFilterStatus} /> 
                                        <label htmlFor='upcoming'>Upcoming</label>
                                    </div>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="past" value="past" checked={filterStatus.includes('past')} onChange={handleFilterStatus} /> 
                                        <label htmlFor='past'>Past</label>
                                    </div>
                                </div>
                                <div className='px-5 py-3 border-t-[1px] space-y-2'>
                                    <p className='text-[18px]'>Level</p>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="easy" value="Easy" checked={filterLevel.includes('Easy')} onChange={handleFilterLevel} /> 
                                        <label htmlFor='easy'>Easy</label>
                                    </div>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="medium" value="Medium" checked={filterLevel.includes('Medium')} onChange={handleFilterLevel} /> 
                                        <label htmlFor='medium'>Medium</label>
                                    </div>
                                    <div className='space-x-2'>
                                        <input type="checkbox" id="hard" value="Hard" checked={filterLevel.includes('Hard')} onChange={handleFilterLevel} /> 
                                        <label htmlFor='hard'>Hard</label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='bg-[#003145] text-white py-8 xl:py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center xl:w-[1172px] m-auto gap-y-10 xl:gap-y-20 xl:gap-x-10'>
                    {filteredChallengeList.map((challenge, index) => (
                        <ChallengeCard key={index} challenge={challenge} idx={index} />
                    ))}

                </div>
                {filteredChallengeList.length === 0 && (
                    <div className='text-center text-[20px] font-bold'>
                        No challenge found
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExploreChallenges;
