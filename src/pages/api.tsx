import Web3 from "web3"
import xMonadFaucetABI from '../../contracts/xMonadFaucetABI.json'

declare global {
    interface Window {
        ethereum?: any;
    }
}

const InitializeContract = () => {
    let result
    const web3 = new Web3(window.ethereum)
    if (web3 !== null) {
        const instance = new web3.eth.Contract(xMonadFaucetABI, process.env.NEXT_PUBLIC_FAUCET)
        result = instance
    }

    return result
}

const InitApp = (provider: any) => {
    if (provider !== window.ethereum) {
        return 'MetaMask not detected'
    }

    return provider
}

const ConnectWallet = async () => {
    let account
    await window.ethereum.request({
        method: 'eth_requestAccounts'
    })

    account = await window.ethereum.enable()

    return account[0]
}

const DisconnectWallet = async (account: string) => {
    await window.ethereum.request({
        method: 'wallet_revokePermissions',
        params: [
            {
                "eth_accounts": { account }
            }
        ]
    })
}

const CopyAddress = (address: string) => {
    const copied = address

    if (copied !== null) {
        navigator.clipboard.writeText(copied)
    }
}

export {
    InitializeContract,
    InitApp,
    ConnectWallet,
    DisconnectWallet,
    CopyAddress
}