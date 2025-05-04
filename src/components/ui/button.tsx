
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variantStyles = {
      primary: "bg-[#4E52F5] text-white hover:bg-[#3F42C4]",
      secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600",
      outline: "border border-gray-600 bg-transparent hover:bg-gray-800 hover:text-gray-100",
      ghost: "hover:bg-gray-700 hover:text-gray-100",
    };

    const sizeStyles = {
      sm: "h-9 px-3",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8",
    };

    return (
      <button
        className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };