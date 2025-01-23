import React, { useState,useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { WalletContext } from '../context/WalletContext';
import Navbar from "./Navbar";


const Launchpad = () => {
        const { state } = useContext(WalletContext);
        const {contract}=state

    const [brandName, setBrandName] = useState("");
    const [brandDesc, setBrandDesc] = useState("");
    const [cover, setCover] = useState("");
    const [fdesc,setFDesc]=useState("")
    const [loading, setLoading] = useState(false);

    const uploadImageToIpfs = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("file", file);

                const res = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "e60646f12a7432947aba",
                        pinata_secret_api_key: "ab9c5261483015dea804b3cd4b32068fccf431a92020b238f8d681301d62512b",
                    },
                });

                setCover(`https://ipfs.io/ipfs/${res.data.IpfsHash}`);
            } catch (error) {
                console.error("Error uploading cover to IPFS:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!brandName || !brandDesc || !cover) {
            alert("Please fill in all fields and upload an image!");
            return;
        }

        try {
            setLoading(true);
            const metadata = {
                description: brandDesc,
                image: cover,
            };

            const res = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: metadata,
                headers: {
                    pinata_api_key: "e60646f12a7432947aba",
                    pinata_secret_api_key: "ab9c5261483015dea804b3cd4b32068fccf431a92020b238f8d681301d62512b",
                    "Content-Type": "application/json",
                },
            });

            setFDesc(`https://ipfs.io/ipfs/${res.data.IpfsHash}`);
            const tx = await contract.registerBrand(brandName,fdesc)
            await tx.wait()
            console.log("successful")
        } catch (error) {
            console.error("Error uploading metadata to IPFS:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <Navbar/>
            <h2 className="text-2xl font-bold mb-4">Register Your Brand</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Brand Name</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Brand Description</label>
                    <textarea
                        value={brandDesc}
                        onChange={(e) => setBrandDesc(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Upload Brand Image</label>
                    <input type="file" accept="image/*" onChange={uploadImageToIpfs} className="w-full" />
                    {cover && <img src={cover} alt="Brand Cover" className="mt-2 w-full h-40 object-cover rounded-md" />}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Register Brand"}
                </button>
            </form>
        </div>
    );
};

export default Launchpad;
