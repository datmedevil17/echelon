import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { WalletContext } from '../context/WalletContext';

const ConnectWallet = () => {
    const { connectWallet, account } = useContext(WalletContext);
    const navigate = useNavigate();

    const connect = async () => {
        await connectWallet();
        navigate('/home');
    };

    return (
        <div
            className="relative w-full h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-white">
                {account ? (
                    <p className="text-lg font-semibold">
                        Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </p>
                ) : (
                    <button
                        className="border border-white rounded-md cursor-pointer w-44 py-2 text-white bg-transparent hover:bg-white hover:text-black transition"
                        onClick={connect}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    );
};

export default ConnectWallet;
