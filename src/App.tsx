import { useEffect, useState } from "react";
import Heart from "./components/heart";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { HeartType } from "./types";
import { useAtom } from "jotai";
import hoveringNoAtom from "./state";

function App() {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);

  const [saidNo, setSaidNo] = useState(false);

  const [saidYes, setSaidYes] = useState(false);

  const [hoveringYes, setHoveringYes] = useState(false);

  const [hoveringNo, setHoveringNo] = useAtom(hoveringNoAtom);

  useEffect(() => {
    const id = setInterval(() => {
      addHeart(HeartType.Purple);
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, []);

  const addHeart = (heartType: HeartType) => {
    const id = uuidv4();

    setHearts((hearts) => [
      ...hearts,
      <Heart heartType={heartType} key={id} />,
    ]);

    setTimeout(() => {
      setHearts((hearts) => hearts.filter((heart) => heart.key !== id));
    }, 5000);
  };

  function getGifUrl() {
    if (hoveringNo) {
      return "/no.gif";
    }
    if (saidYes) {
      return "/yay.gif";
    }
    return "/pls.gif";
  }

  useEffect(() => {
    if (hoveringNo) {
      for (let i = 0; i < 10; i++) {
        addHeart(HeartType.Broken);
      }
    }
  }, [hoveringNo]);

  return (
    <>
      <div className=" select-none ">
        <AnimatePresence>
          {hearts.map((heart) => {
            return heart;
          })}
        </AnimatePresence>
      </div>
      <main
        className={`h-screen w-screen flex items-center select-none justify-center text-white flex-col gap-8 text-2xl ${
          hoveringNo ? "bg-black" : " bg-[#D6CA8D]"
        }`}>
        <img src={getGifUrl()} className="z-10 h-48" />
        {!saidYes ? (
          <h1 className={`text-4xl z-20 text-center`}>
            {hoveringNo ? "SKLONI MIŠ ODATLE" : "will you be my valentine 🥺"}
          </h1>
        ) : (
          <img src="/heart.png" className="z-20" />
        )}
        {!saidYes ? (
          <div
            className={`flex flex-row w-48 z-10 ${
              !saidNo ? " justify-between" : "justify-center"
            }`}>
            <button
              onMouseEnter={() => {
                setHoveringYes(true);
              }}
              onMouseLeave={() => {
                setHoveringYes(false);
              }}
              className={`rounded-lg shadow-md px-4 py-2 bg-[#8DA2D6] hover:bg-[#D68D8D] transition-colors ${
                hoveringNo ? "opacity-0" : "opacity-100"
              }`}
              onClick={() => {
                setSaidYes(true);
                for (let i = 0; i < 10; i++) {
                  addHeart(HeartType.Red);
                }
              }}>
              yes {hoveringYes ? "💜" : null}
            </button>
            {!saidNo ? (
              <motion.button
                key="no"
                className="rounded-lg group bg-[#8DA2D6] shadow-md px-4 py-2 hover:bg-[#D68D8D] transition-all"
                onMouseEnter={() => {
                  setHoveringNo(true);
                }}
                onMouseLeave={() => {
                  setHoveringNo(false);
                }}
                onMouseMove={() => {
                  addHeart(HeartType.Broken);
                }}
                onClick={() => {
                  setSaidNo(true);
                  setHoveringNo(false);
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 0.5,
                  },
                }}
                animate="show">
                no {hoveringNo ? "😡" : null}
              </motion.button>
            ) : null}
          </div>
        ) : null}
      </main>
    </>
  );
}

export default App;
