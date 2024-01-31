import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { HeartType } from "../types";
import { useAtom } from "jotai";
import hoveringNoAtom from "../state";

const Heart = ({ heartType }: { heartType: HeartType }) => {
  const controls = useAnimation();

  const [hoveringNo] = useAtom(hoveringNoAtom);

  useEffect(() => {
    const randomBool = Math.random() < 0.5;

    controls.start({
      x: randomBool ? [-50, 50, -50] : [50, -50, 50],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
  }, [controls]);

  function getRandomInt(min: number, max: number) {
    // Create byte array and fill with 1 random number
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return getRandomInt(min, max);
    return min + (byteArray[0] % range);
  }

  const randomX = getRandomInt(20, 80);

  function getHeartUrl(heartType: HeartType) {
    if (heartType === HeartType.Purple) {
      return "https://twemoji.maxcdn.com/v/13.0.1/72x72/1f49c.png";
    } else if (heartType === HeartType.Red) {
      return "https://twemoji.maxcdn.com/v/13.0.1/72x72/2764.png";
    } else if (heartType === HeartType.Broken) {
      return "https://twemoji.maxcdn.com/v/13.0.1/72x72/1f494.png";
    }
  }

  function getOpacity() {
    if (hoveringNo) {
      if (heartType === HeartType.Purple) {
        return 0;
      } else return 100;
    }

    if (heartType !== HeartType.Broken) {
      return 100;
    }

    return 0;
  }

  return (
    <motion.div
      className={`fixed bottom-0 ${
        hoveringNo && heartType === HeartType.Purple
          ? "opacity-0"
          : "opacity-100"
      }`}
      style={{ left: `${randomX}%` }}
      initial={{ opacity: 1, scale: 0.25, y: 0, x: 0 }}
      animate={{ opacity: 0, scale: 1.5, y: -500 }}
      transition={{
        duration: 5,
        ease: "easeOut",
      }}>
      <motion.img
        className={`opacity-${getOpacity()}`}
        animate={controls}
        src={getHeartUrl(heartType)}
        alt="heart"
      />
    </motion.div>
  );
};

export default Heart;
