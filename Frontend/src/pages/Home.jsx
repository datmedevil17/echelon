import React from 'react';
import { useNavigate } from 'react-router';
const Home = () => {
    const navigate = useNavigate();
    const connectWallet = async () => {
        navigate('/about')
    }
    return (
        <>
           <div className='justify-center items-center flex flex-col'>
                <button className='border rounded-md cursor-pointer w-44' onClick={connectWallet}>Connect Wallet</button>
            </div>
        </>
    );
}

export default Home;
