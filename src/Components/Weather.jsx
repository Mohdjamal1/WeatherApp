import { useEffect, useState } from "react";

const Weather = () => {
  const [text, setText] = useState("");
  const [query, setquery] = useState("New Delhi");
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const API_Key = "497804cdbf8340d580f55427242805";
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${query}`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.error){
          setError(true);
        }else{
          setError(false);
          setData(result);
        }
      }).catch((err) => {
      console.log(err);
      setError(true);
    });
  }, [query]);

  const search = () => {
    if (text.trim()) setquery(text);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="top-bar">
        <input
          className="cityInput"
          placeholder="New Delhi"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="searchbtn" onClick={search}>
          Search
        </button>
      </div>
      <hr />
      {!error ? (
        <>
          <div className="weather-image">
            <img src={data && data.current.condition.icon} />
          </div>
          <div className="weather-temp">
            Temp: {data && data.current.temp_c}&deg; C
          </div>
          <div className="weather-city">
            City: {data && data.location.name} , {data && data.location.country}
          </div>
          <div className="data-container">
            <div className="element">
              <div className="data">
                Humidity: {data && data.current.humidity}%
              </div>
              <div className="data">
                Wind Speed: {data && data.current.wind_dir}{" "}
                {data && data.current.wind_kph} Km/h
              </div>
              <div className="data">Cloud: {data && data.current.cloud}%</div>
            </div>
            <div className="element">
              <div className="data">
                Feels like: {data && data.current.feelslike_c}&deg; C
              </div>
              <div className="data">
                Heat Index: {data && data.current.heatindex_c}&deg; C
              </div>
              <div className="data">
                Weather Condition: {data && data.current.condition.text}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="data">No matching location found</div>
        </>
      )}
    </div>
  );
};
export default Weather;
