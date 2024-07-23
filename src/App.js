import "./App.css";
import axios from "axios";
import { useState, useRef } from "react";

function App() {
  // Get Data from Server
  const [balance, setBalance] = useState();
  const [value, setValue] = useState();
  const [miners, setMiners] = useState([]);
  axios
    .get("https://server.duinocoin.com/balances/JetDev22")
    .then((response) => {
      setBalance(response.data.result.balance);
    })
    .catch(() => {
      console.log("");
    });
  axios
    .get("https://server.duinocoin.com/v2/users/JetDev22")
    .then((response) => {
      setValue(response.data.result.exch_rates.max.price);
    })
    .catch(() => {
      console.log("");
    });
  axios
    .get("https://server.duinocoin.com/miners/JetDev22")
    .then((response) => {
      setMiners(response.data.result);
    })
    .catch(() => {
      console.log("");
    });

  // Create Miner Table
  const minerStats = miners.map((miner) => (
    <tr>
      <td className="tableLeft">{miner.identifier}</td>
      <td>{miner.accepted}</td>
      <td>{miner.rejected}</td>
      <td>{miner.pool}</td>
      <td className="tableRight">{miner.hashrate} H/s</td>
    </tr>
  ));

  // Calculate Portfolio Value
  let portfolio = (Number(value) * Number(balance)).toFixed(2);

  // Render Page
  return (
    <>
      <img
        className="logo"
        src="https://raw.githubusercontent.com/revoxhere/duino-coin/master/Resources/ducobanner.png"
        alt=""
      />
      <div className="Portfolio">
        <h1>
          Your balance: {balance}
          <img
            className="currency"
            src="https://raw.githubusercontent.com/revoxhere/duino-coin/master/Resources/duco.png"
            alt=""
          />
        </h1>
        <h3>Portfolio Value: {portfolio} €</h3>
      </div>
      <div className="Miner">
        <h1>
          Miner{" "}
          <img
            className="minerLogo"
            src="https://raw.githubusercontent.com/revoxhere/duino-coin/master/Resources/AVRMiner.png"
            alt=""
          />
        </h1>
        <table>
          <tr>
            <th>Miner</th>
            <th>Accepted Shares</th>
            <th>Rejected Shares</th>
            <th>Mining Pool</th>
            <th>Hashrate</th>
          </tr>
          {minerStats}
        </table>
      </div>
    </>
  );
}

export default App;
