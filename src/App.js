import Axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  const [prices, setPrices] = useState({ USD: {}, GBP: {}, EUR: {} });
  const [currency, setCurrency] = useState("USD");
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    Axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then(
      (res) => {
        // console.log(res.data.bpi);
        setPrices(res.data.bpi);
      }
    );
    Axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&start=2021-01-01&end=2021-03-30`
    ).then((res) => {
      console.log(res.data.bpi);
      setChartData(res.data.bpi);
    });
  }, []);

  const onChangeHandler = (e) => {
    setCurrency(e.target.value);
    Axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${e.target.value}&start=2021-01-01&end=2021-03-30`
    ).then((res) => {
      // console.log(res);
      setChartData(res.data.bpi);
    });
  };
  return (
    <div className="App">
      <div className="Container1">
        <h2>1 Bitcoin Equals</h2>
        <select onChange={onChangeHandler}>
          <option value="USD">United State Dollars</option>
          <option value="GBP">British Pound Sterling</option>
          <option value="EUR">Euro</option>
        </select>
        <h1>
          {prices[currency].rate} {prices[currency].description}
        </h1>
      </div>
      <div className="Container2">
        <Line
          data={{
            labels: Object.keys(chartData),
            datasets: [
              {
                label: "Last 60 days trend",
                data: Object.values(chartData),
                lineTension: 0,
                backgroundColor: "#93e493",
                borderColor: "#018d01",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default App;
