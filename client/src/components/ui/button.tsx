// import { ReactNode } from "react";
import classNames from 'classnames';
import React from 'react';
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // children: ReactNode;
    variant?: 'primary' | 'outline' | 'red' ;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    to?: string;
    href?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React.ReactNode;
}
// Build Component

function Button({ 
    variant = 'primary',
    size = 'medium',
    disabled = false,
    to,
    href,
    className,
    icon,
    iconPosition = 'left',
    onClick,
    children,
    ...passProps
} : ButtonProps) {

    // Logic chọn thẻ
        let Comp: React.ElementType = 'button';
        const props = { onClick, ...passProps } as React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>;

    if (to){
        props.to = to;
        Comp = Link;
    } else if (href){
        props.href = href;
        Comp = 'a';
    }

    const classes = classNames(
        // Button
        'items-center justify-center rounded-lg font-semibold cursor-pointer',
        // Cursor
        {
            'cursor-pointer': !disabled,
            'cursor-not-allowed': disabled,
        },
        // Size
        {
            'px-2 py-2 text-sm': size === 'small',
            'px-4 py-2 text-base': size === 'medium',
            'px-6 py-2 text-lg': size === 'large',
        },
        // Variant and State
        {
            'bg-[var(--primary-btn)] text-[var(--white)] hover:bg-[var(--primary-btn-hover)] focus:ring-primary-btn': variant === 'primary' && !disabled,
            'bg-[var(--error)] text-[var(--white)] hover:bg-[var(--error)] hover:opacity-90 focus:ring-primary-btn': variant === 'red' && !disabled,
            'bg-[var(--secondary-btn)] text-[var(--primary-btn)] border border-[var(--primary-btn)] hover:bg-[var(--border)]': variant === 'outline' && !disabled,
            'bg-[var(--description)] text-[var(--white)] cursor-not-allowed': disabled,
        },
        className
  );

    return (  
        <Comp className={classes} disabled={disabled} {...props}>
            {icon && iconPosition === 'left' && (
                <span className="mr-1">{icon}</span>
            )}
            {/* <span className="whitespace-nowrap">{title}</span> */}
            {children}
            {icon && iconPosition === 'right' && (
                <span className="ml-2">{icon}</span>
            )}
        </Comp>
    );
}

export default Button;