/* eslint-disable react-hooks/exhaustive-deps */
import ABI from "./abi.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);
  const [settingCount, setSettingCount] = useState(0);

  const contractAddress = "0x42058d06bE3a8A03bd4f5CBD0172060813BCCF14";

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const connectAccount = async () => {
    getWallet();
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({
      method: "eth_requestAccounts",
    });
    handleAccount(accounts);

    getCountFromContract();
  };

  const getCountFromContract = async () => {
    const provider = new ethers.BrowserProvider(ethWallet);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      setIsLoading(true);
      const tx = await contract.getData();
      setCount(Number(tx));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCountToContract = async () => {
    const provider = new ethers.BrowserProvider(ethWallet);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      setIsLoading(true);
      const tx = await contract.setData(settingCount);

      setCount(Number(tx));
      getCountFromContract();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const doubleCountAtContract = async () => {
    const provider = new ethers.BrowserProvider(ethWallet);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      setIsLoading(true);
      const tx = await contract.doubleData();

      setCount(Number(tx));
      getCountFromContract();
      setSettingCount(0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 py-4">
        {account ? (
          <>
            <span className="w-3 h-3 bg-green-700 rounded-full" />
            <p>Connected</p>
          </>
        ) : (
          <>
            <span className="w-3 h-3 bg-red-700 rounded-full" />
            <p>Not Connected</p>
          </>
        )}
      </div>
      {!account ? (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
          onClick={connectAccount}>
          Connect Account
        </button>
      ) : (
        <div>
          <div>Your address is: {account}</div>
          <button
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
            onClick={getCountFromContract}>
            {isLoading ? "Please wait..." : "Get Number"}
          </button>

          <div className="flex items-center gap-4 my-8">
            <input
              type="number"
              className="py-2 px-4 border rounded-md"
              value={settingCount}
              onChange={(e) => setSettingCount(e.target.value)}
            />
            <button
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
              onClick={setCountToContract}>
              {isLoading ? "Please wait..." : "Set Number"}
            </button>
          </div>

          <div className="">
            {count ? (
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <p>Contract number is: {count}</p>
                </div>

                <button
                  disabled={isLoading}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
                  onClick={doubleCountAtContract}>
                  {isLoading ? "Please wait..." : "Double Count"}
                </button>
              </div>
            ) : (
              <p>No count</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
