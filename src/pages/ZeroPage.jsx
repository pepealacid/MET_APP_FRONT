import ZeroZero from "../components/Zero/ZeroZero";
import ZeroOne from "../components/Zero/ZeroOne";
import ZeroTwo from "../components/Zero/ZeroTwo";
import ZeroThree from "../components/Zero/ZeroThree";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ZeroPage = () => {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 4) {
      navigate("/login");
    }
  }, [counter, navigate]);

  return (
    <div>
      {counter === 0 && <ZeroZero setCounter={setCounter} />}
      {counter === 1 && <ZeroOne setCounter={setCounter} />}
      {counter === 2 && <ZeroTwo setCounter={setCounter} />}
      {counter === 3 && <ZeroThree setCounter={setCounter} />}
    </div>
  );
};

export default ZeroPage;
