import React, { useState } from 'react';
import Web3 from 'web3';

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
const ABI = [ /* YOUR CONTRACT ABI HERE */ ];

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

function CoinFlipGame() {
    const [guess, setGuess] = useState(true);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const placeBet = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            await contract.methods.bet(amount, guess).send({ from: accounts[0] });
            
            setMessage("Bet placed!");
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Coin Flip Game</h1>
            <div>
                <label>
                    Bet amount:
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="ml-2 p-1"
                    />
                </label>
            </div>
            <div>
                <label>
                    Guess:
                    <select 
                        value={guess ? "true" : "false"}
                        onChange={(e) => setGuess(e.target.value === "true")}
                        className="ml-2 p-1"
                    >
                        <option value="true">Heads</option>
                        <option value="false">Tails</option>
                    </select>
                </label>
            </div>
            <button onClick={placeBet} className="mt-2 p-2 bg-blue-500 text-white">
                Place Bet
            </button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}

export default CoinFlipGame;
