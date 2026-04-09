import React from "react";
import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant: "active" | "inactive";
  onClick: () => void;
};

export default function NavButton({
  variant,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={NavButtonVariants({ variant })}
    >
      {children}
    </button>
  );
}

const NavButtonVariants = cva("h-8 w-28 mr-0.5 rounded-t-lg text-xs", {
  variants: {
    variant: {
      active: "bg-sky-600/25 shadow font-bold",
      inactive: "bg-sky-600/10 text-black",
    },
  },
  defaultVariants: {
    variant: "inactive",
  },
});

/*



import React, { useState } from "react";
import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  initialVariant: "active" | "inactive";
  id: string; // Add an id prop
};

export default function NavButton({
  initialVariant,
  id,
  ...props
}: ButtonProps) {
  const [variant, setVariant] = useState<"active" | "inactive">(initialVariant);

  const handleClick = () => {
    console.log(`Button ${id} was clicked.`);
    // Add your logic here to decide whether to change the variant or not
    setVariant(variant === "active" ? "inactive" : "active"); // Toggle the variant
  };

  return (
    <button
      {...props}
      onClick={handleClick} // Add the onClick handler
      className={NavButtonVariants({ variant })}
    />
  );
}

const NavButtonVariants = cva(
  "h-8 w-28 mr-0.5 rounded-t-lg text-xs font-medium",
  {
    variants: {
      variant: {
        active: "bg-orange-200",
        inactive: "bg-sky-600/15",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  }
);


*/
