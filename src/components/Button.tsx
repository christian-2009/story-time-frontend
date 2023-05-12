import { ReactEventHandler } from 'react';

interface Props {
    text: string;
    optionalStyles?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => any;
    disabled?: boolean;
}

export default function Button({
    text,
    optionalStyles,
    type,
    onClick,
    disabled,
}: Props) {
    return (
        <button
            className="login-button"
            style={optionalStyles}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
}
