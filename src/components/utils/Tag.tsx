import React from "react";

type TagVariant = "blue" | "purple" | "green" | "orange" | "red" | "gray";

interface TagProps {
  variant: TagVariant;
  title: string;
}

export const Tag: React.FC<TagProps> = ({ title, variant }) => {
  const variants: Record<TagVariant, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${variants[variant]}`}
    >
      {title}
    </span>
  );
};
