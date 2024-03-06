export const styles = {
  coinContainer: {
    height: "300px",
    width: "300px",
    margin: "0 auto 60px",
    position: "relative",
    perspective: "900px",
  },
  coin: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    color: "black",
    borderRadius: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.2s",
    cursor: "pointer",
  },

  coinSide: {
    borderRadius: "100%",
    backgroundColor: "#E7D239",
    boxShadow: "black 0px 0px 3px 1px",
    boxSizing: "border-box",
    margin: 0,
    paddingTop: "125px",
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
    fontSize: "32px",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 700,
    letterSpacing: "1px",
    backfaceVisibility: "hidden",
  },

  tails: {
    transform: "rotateX(180deg)",
  },

  heads: {
    transform: "rotateX(0)",
  },

  isFlipping: {
    animation: "flipping 0.2s infinite",
    cursor: "wait",
  },

  "@keyframes flipping": {
    "0%": {
      transform: "rotateX(0)",
    },
    "100%": {
      transform: "rotateX(180deg)",
    },
  },
};
