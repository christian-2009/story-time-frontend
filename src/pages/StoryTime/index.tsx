import React, { useState } from 'react';
import Story from './Story/Story';
import Users from './Users';
import StoryContext from 'context/StoryContext';

export default function () {
    const [counter, setCounter] = useState<number>();

    const value = {};

    return (
        <StoryContext.Provider value={value}>
            <div className="container">
                <Users />
                <Story />
            </div>
        </StoryContext.Provider>
    );
}
