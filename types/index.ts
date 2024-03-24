export interface ProviderProps {
    children: string | React.ReactNode | React.JSX.Element| React.JSX.Element[]
}

export interface ButtonProps {
    style: string
    title: string
    type: 'submit' | 'button'
    onClick?: () => void
}

export interface NavBarProps {
    handleAccount: (i: any) => void
    account: string
}

export interface FaucetProps {
    contractInstance: any
    account: string
}

export interface NotificationProps {
    type: 'error' | 'success' | string
    message: string
}

export interface CountDownProps {
    seconds: number
}