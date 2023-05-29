import React, { MouseEventHandler, ReactNode, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "positive"
  | "negative"
  | "plain";
type ButtonSize = "sm" | "md" | "lg";

interface IconButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: MouseEventHandler;
  loading?: boolean;
  full?: boolean;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "md",
  disabled,
  full = false,
  loading = false,
    ...props
}) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const { scale } = useSpring({
    from: { scale: 1 },
    to: { scale: focus ? 0.95 : hover ? 1.05 : 1.0 },
    config: {
      duration: 300,
      mass: 0.1,
    },
  });

  const variants: Record<ButtonVariant, string> = {
    negative: "hover:bg-red-300 bg-red-200 dark:bg-red-900 dark:text-red-200",
    positive:
      "hover:bg-green-300 bg-green-200 dark:bg-green-900 dark:text-green-200",
    primary: "bg-tertiary text-headline fill-headline",
    secondary: "hover:bg-yellow-300 bg-yellow-200",
    plain: "",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "py-2 px-4",
    md: "py-3 px-6",
    lg: "text-2xl py-5 px-10",
  };

  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];

  let extraClasses = [];
  if (disabled) {
    extraClasses.push("opacity-50 grayscale bg-opacity-30 pointer-events-none");
  }

  return (
    <animated.button
      style={{ scale }}
      onClick={onClick}
      onMouseDown={() => setFocus(true)}
      onMouseUp={() => setFocus(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`theme-transition justify-center flex items-center text-lg gap-2 
            rounded-xl font-bold cursor-pointer ${variantClasses} ${sizeClasses} ${
        full ? "w-full text-center justify-center" : ""
      }
             ${extraClasses.join(" ")}
            `}
      {...props}
    >
      {children}
    </animated.button>
  );
};
