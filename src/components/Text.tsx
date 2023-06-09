import React, { ReactNode } from 'react';

interface TitleProps {
    optionalPosition?: 'absolute' | 'relative';
}

interface Props {
    children: string;
    optionalStyles?: React.CSSProperties;
}

const Title = ({ optionalPosition }: TitleProps) => {
    return (
        <div
            style={{
                position: optionalPosition ? optionalPosition : undefined,
            }}>
            <h1 className="title">STORY TIME</h1>
        </div>
    );
};

const Subtitle = ({ children, optionalStyles }: Props) => {
    return (
        <div>
            <h1 className="subtitle" style={optionalStyles}>
                {children}
            </h1>
        </div>
    );
};

const Body = ({ children, optionalStyles }: Props) => {
    return (
        <h1 className="body" style={optionalStyles}>
            {children}
        </h1>
    );
};

const BodyLarge = ({ children, optionalStyles }: Props) => {
    return (
        <h1 className="body-large" style={optionalStyles}>
            {children}
        </h1>
    );
};

const SmallText = ({ children, optionalStyles }: Props) => {
    return (
        <h1 className="small" style={optionalStyles}>
            {children}
        </h1>
    );
};

const ErrorText = ({ children, optionalStyles }: Props) => {
    return (
        <p className="error-text" style={optionalStyles}>
            {children}
        </p>
    );
};

const SansSerif = ({ children, optionalStyles }: Props) => {
    return (
        <p className="subtitle sans-serif" style={optionalStyles}>
            {children}
        </p>
    );
};

const Text = {
    Title,
    Subtitle,
    Body,
    BodyLarge,
    SmallText,
    ErrorText,
    SansSerif,
};

export default Text;
