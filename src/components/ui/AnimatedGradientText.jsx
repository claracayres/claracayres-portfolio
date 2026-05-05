function AnimatedGradientText({ children }) {
  return (
    <span className="animate-gradient bg-[linear-gradient(110deg,#a855f7,#ec4899,#22d3ee,#a3e635,#22d3ee,#a855f7)] bg-[length:300%_300%] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export default AnimatedGradientText;