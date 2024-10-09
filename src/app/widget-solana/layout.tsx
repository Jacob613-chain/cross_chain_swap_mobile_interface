'use client'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    BackpackWalletAdapter,
    ExodusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import React, {useMemo} from 'react';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');

export default function WidgetSolanaLayout({
                                               children,
                                           }: {
    children: React.ReactNode
}) {

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
            new ExodusWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint="https://solana-mainnet.g.alchemy.com/v2/rf7bnvVXFbGP8PdcNrDX6r0-yhCxp6JH">
            <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
