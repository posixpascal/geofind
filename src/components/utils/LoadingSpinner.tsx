import { animated, useSpring } from "@react-spring/web";

export const LoadingSpinner: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { opacity } = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    reverse: !isLoading,
  });
  return (
    <animated.div
      style={{ opacity }}
      className={
        "absolute top-4 left-4 flex items-center justify-center pointer-events-none z-20"
      }
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-12 w-12 text-black dark:text-slate-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </animated.div>
  );
};
