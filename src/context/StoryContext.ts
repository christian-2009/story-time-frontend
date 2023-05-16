import React, { useContext } from 'react';
import { StoryContextType } from 'interfaces';

const StoryContext = React.createContext<StoryContextType>(
    {} as StoryContextType,
);

export default StoryContext;
