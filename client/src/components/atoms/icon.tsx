import React, { ReactNode } from 'react'
import { Tooltip } from "radix-ui";

interface Props {
    children?:ReactNode,
    title:string
}

const Icon: React.FC<Props> = ({ title, children}) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                   <p>{title}</p>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                    {children}
                   
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export default Icon
