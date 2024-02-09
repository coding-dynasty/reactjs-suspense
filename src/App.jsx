import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const api_url = "https://api.thecatapi.com/v1/images/search";

function App() {
  const [data, setData] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const abortSignal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await axios.get(api_url, { signal: abortSignal });

        const responseData = response.data[0];

        setData(responseData);
      } catch (error) {
        if (axios.isCancel(error)) {
          // Handle request cancellation
          console.log("Request canceled:", error.message);
        } else {
          // Handle other errors
          console.error("Error:", error.message);
        }
      }
    };

    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }

    return () => {
      controller.abort();
    };
  }, [shouldFetch]);

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

      <button onClick={() => setShouldFetch(true)}>Fetch Again!</button>
    </div>
  );
}

export default App;
