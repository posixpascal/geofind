import React, {MouseEventHandler, ReactNode} from "react";

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
}

export const IconButton: React.FC<IconButtonProps> = ({
                                                          onClick,
                                                          children,
                                                          variant = "primary",
                                                          size = "md",
                                                          loading = false,
                                                      }) => {
    const variants: Record<ButtonVariant, string> = {
        negative: "hover:bg-red-300 bg-red-200 dark:bg-red-900 dark:text-red-200",
        positive: "hover:bg-green-300 bg-green-200 dark:bg-green-900 dark:text-green-200",
        primary: "hover:bg-orange-300 bg-orange-200 dark:bg-orange-900 dark:fill-orange-200 dark:text-orange-200",
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

    return (
        <button
            onClick={onClick}
            className={`flex items-center text-lg gap-2  rounded-xl font-bold cursor-pointer transition ${variantClasses} ${sizeClasses}`}
        >
            {children}
        </button>
    );
};
