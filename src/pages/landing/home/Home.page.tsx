import React, { useState } from "react";
import HomeBox from "./components/HomeBox.component";
import TempRepository from "../../../repositories/temp.repository";
import useEffectSkip from "../../../react/hooks/useEffectSkip";
import "./styles.scss";
import { Link } from "react-router-dom";

function HomePage() {
  const [id, setId] = useState(1);

  useEffectSkip(() => {
    const subscription = TempRepository.test().subscribe((data) => {
      console.log("[HomePage]", data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  const handleClick = () => {
    setId((id) => id + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex text-3xl items-center">
        <span>Home</span>
        <div className="pl-2">
          <HomeBox></HomeBox>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="mt-2 py-2 px-4 bg-gray-300 rounded text-gray-700"
      >
        Test RxJS
      </button>
      <Link to="/launcher/add">Go to Add</Link>
    </div>
  );
}

export default HomePage;
