import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const COUNT_OF_PARTICLES = 50;

const Flame = styled.div`
  width: 50px;
  height: 40px;
  font-size: 24px;
  position: relative;
  z-index: 20;

 span {
  position: absolute;
  width: 27px;
  height: 20px;
  background: radial-gradient(
      orangered 20%,
      rgba(255, 69, 0, 0) 70%
  );
  border-radius: 50%;
  bottom: 0;
  left: calc((var(--n) - 1) * 100px / var(--particles));
  mix-blend-mode: screen;
  animation: rise 1s ease-in infinite;
  animation-delay: calc(var(--rnd) * 1s);
}

@keyframes rise {
  from {
      transform: translateY(0) scale(1);
      filter: opacity(0);
  }

  25% {
      filter: opacity(1);
  }

  to {
      transform: translateY(-40px) scale(0);
      filter: opacity(0);
  }
}

`;
export const Fire = () => {
    const [sparks, setSparks] = useState([]);

    useEffect(() => {
        if (sparks.length === 0) {
            setSparks(
                Array(COUNT_OF_PARTICLES).fill("").map((particle, i) => {
                    return {n: i + 1, rnd: Math.random()};
                });
        }
    });

    return <Flame>
        {sparks.map((spark) => {
            return <span style={{"--n": spark.n, "--rnd": spark.rnd}}>
                </span>;
        })}
    </Flame>;

};
