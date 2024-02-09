import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const api_url = "https://api.thecatapi.com/v1/images/search";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_url);

        const responseData = response.data[0];

        setData(responseData);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      {data ? (
        <img
          src={data?.url}
          alt="cat"
          width={"300px"}
          height={"300px"}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      ) : (
        <p>{data === null ? "Loading..." : "Failed to fetch data."}</p>
      )}
    </div>
  );
}

export default App;
