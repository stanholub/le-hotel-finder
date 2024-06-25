import { ReactNode } from "react"

type Props = {
    onClick: () => void
    children: ReactNode
}

export function Button({children, onClick}: Props) {
    return (
        <button onClick={onClick} className="px-2 py-1 rounded border bg-blue-100">{children}</button>
    )
}