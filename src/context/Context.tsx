import React from 'react'
import { ContextType } from "./InterfacesTypes";

const Context = React.createContext<ContextType | null>(null)

export default Context;
