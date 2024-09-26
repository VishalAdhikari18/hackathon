import React from 'react'; 
import { Link } from 'react-router-dom';
import ExploreChallenges from './ExploreChallenges';

function ChallengesList() {

    const reasons = [{
        imagePath:'assets/icons/carbon_notebook-reference.svg',
        title:'Prove your skills',
        description:'Gain substantial experience by solving real-world problems and pit against others to come with innovative solutions.',
    },{
        imagePath:'assets/icons/Vector.svg',
        title:'Learn from community',
        description:'One can look and analyze the solutions submitted by the other Data scientists in the community and learn from them.',
    },{
        imagePath:'/assets/icons/Robot.svg',
        title:'Challenge yourself',
        description:'There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.',
    },{
        imagePath:'/assets/icons/IdentificationCard.svg',
        title:'Earn recognition',
        description:'You will stand out of the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.',
    }];

    return (
        <div>
            <div className='px-10 lg:px-20 py-3 lg:py-5 font-semibold text-[18px]'>
                <Link to="/">DPhi</Link>
            </div>

            <div className='p-10 lg:p-32 bg-[#003145] text-white lg:flex justify-evenly'>
                <div className='w-[500px xl:w-[705px]'>
                    <h1 className='pl-8 xl:pl-16 border-l-[5px] lg:border-l-[10px] border-yellow-500 box-border lg:text-[52px] font-bold'>Accelerate Innovation with Global AI Challenges</h1>
                    <p className='xl:px-16 py-10 text-[14px] xl:text-[20px]'>
                        AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to faster learning through competitions.
                    </p>
                    <Link to="/create-challenge" className='xl:ml-16 px-3 xl:px-5 py-2 text-[16px] xl:text-[20px] font-semibold rounded-md bg-white text-[#003145]'>Create Challenge</Link>
                </div>

                <div className='hidden xl:block'>
                    <img src= "/assets/icons/PicsArt_04-14-04.42 1.svg" alt="My Icon" />
                </div>
            </div>

            <div className='bg-[#002A3B] text-white py-3 xl:py-16 flex items-center justify-center'>
                <div className='flex items-center justify-between space-x-2 xl:space-x-5 px-5 xl:px-32'>
                    <div>
                        <img src="/assets/icons/Group 1000002515.svg" alt="" />
                    </div>
                    <div>
                        <h2 className='font-bold text-[14px] xl:text-[25px]'>100K+</h2>
                        <p className='text-[8px] xl:text-[17px]'>AI model submissions</p>
                    </div>
                </div>
                <hr className='border-[1px] border-gray-300 h-[50px]'/>
                <div className='flex items-center justify-between space-x-2 xl:space-x-5 px-5 xl:px-32'>
                    <div>
                        <img src="/assets/icons/Group 1000002516.svg" alt="" />
                    </div>
                    <div>
                        <h2 className='font-bold text-[14px] xl:text-[25px]'>50K+</h2>
                        <p className='text-[8px] xl:text-[17px]'>Data Scientists</p>
                    </div>
                </div>
                <hr className='border-[1px] border-gray-300 h-[50px]'/>
                <div className='flex items-center justify-between space-x-2 xl:space-x-5 px-5 xl:px-32'>
                    <div>
                        <img src="/assets/icons/Group 1000002518.svg" alt="" />
                    </div>
                    <div>
                        <h2 className='font-bold text-[14px] xl:text-[25px]'>100+</h2>
                        <p className='text-[8px] xl:text-[17px]'>AI Challenges hosted</p>
                    </div>
                </div>
            </div>

            <div className='px-10 xl:px-20 py-8 xl:py-16'>
                <div className='text-center text-[20px] xl:text-[35px] font-bold mb-8 xl:mb-14'>
                    Why Participate in <span className='text-green-600'>AI Challenges?</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center xl:w-[1119px] m-auto'>
                    {
                        reasons.map((reason, index) => (
                            <div key={index} className='py-5 xl:py-14 px-5 xl:px-10 bg-gray-100/70 rounded-lg w-[330px] xl:w-[530px] md:h-[250px] xl:h-[276px] space-y-5'>
                                <div>
                                    <img src={reason.imagePath} alt="" />
                                </div>
                                <div className='font-bold text-[16px] xl:text-[25px]'>{reason.title}</div>
                                <p className='text-[14px] xl:text-[16px] text-gray-600'>{reason.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ExploreChallenges />
        </div>
    );
}

export default ChallengesList;
