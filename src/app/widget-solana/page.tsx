'use client'

import React, {FC} from 'react';
import MayanWidgetSolana from "@/comonents/MayanWidgetSolana";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    {ssr: false}
);
export default function WidgetSolanaExample() {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            minHeight: '100vh',
            width: '100%',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 100,
            paddingRight: 60,
            paddingLeft: 60,
        }}>
            <h1 style={{margin: 16}}>Mayan Solana Widget Example</h1>
            <span style={{maxWidth: 500, fontSize: 16, lineHeight: '22px', textAlign: 'center'}}>
                This widget can use the same wallet connection that your dApp uses.
                <br/>
Meaning users don't need to reconnect their solana wallet to use the widget.
            </span>
            <div style={{margin: 36}}>
                <WalletMultiButtonDynamic/>
            </div>
            <div style={{
                width: '100%',
                height: 1.5,
                backgroundColor: '#B5B5B5',
                marginTop: 20,
                marginBottom: 20,
            }}/>
            <MayanWidgetSolana/>
        </div>
    )
}
