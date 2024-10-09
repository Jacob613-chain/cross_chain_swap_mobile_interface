'use client'

import React, {useCallback, useEffect, useMemo} from 'react';
import {useWallet} from "@solana/wallet-adapter-react";
import Script from "next/script";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";

declare global {
    interface Window {
        MayanSwap: {
            init: (id: string, config: MayanWidgetConfigType) => void;
            updateSolanaWallet: (newData: SolanaWalletData) => void;
            updateConfig: (newConfig: MayanWidgetConfigType | MayanWidgetSolanaConfigType) => void;
        };
    }
}

const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

const widgetConfig: MayanWidgetConfigType = {
    appIdentity: {
        name: 'My Project',
        icon: './logo.png',
        uri: 'https://myproject.io',
    },
    tokens: {
        to: {
            solana: ['DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'],

        }
    },
    destinationChains: ['solana'],
    // please visit https://docs.mayan.finance/integration/swap-widget to see the full list of options
};
const MayanWidgetSolana = () => {
    const {publicKey, signTransaction, connect, disconnect, wallet, wallets, connected, select} = useWallet();
    const {setVisible, visible} = useWalletModal();

    const handleConnect = async () => {
        try {
            if (!wallet) {
                setVisible(!visible);
            } else {
                await connect();
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.MayanSwap !== 'undefined') {
            window.MayanSwap.updateSolanaWallet({
                signTransaction,
                publicKey: publicKey ? publicKey.toString() : null,
                onClickOnConnect: handleConnect,
                onClickOnDisconnect: disconnect,
            })
        }
    }, [publicKey, signTransaction, disconnect, setVisible, visible, wallet, connect]);

    const handleLoadMayanWidget = () => {
        const config = {
            ...widgetConfig,
            solanaWallet: {
                publicKey: publicKey ? publicKey.toString() : null,
                signTransaction,
                onClickOnConnect: handleConnect,
                onClickOnDisconnect: disconnect,
            }
        };
        window.MayanSwap.init('swap_widget', config);
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{margin: 32}}>
                <div id="swap_widget"/>
            </div>

            <Script
                src="https://cdn.mayan.finance/widget_solana-0-4-5.js"
                integrity="sha256-mTVQLKvE422WDwtZQUcz/9u5ZK3T1vMfSO0omQvla0E="
                crossOrigin="anonymous"
                onReady={handleLoadMayanWidget}
            />
        </div>
    );
}

export default MayanWidgetSolana;
