import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>
        Sample Home Page
      </h1>
      <div style={{ margin: 32 }}>
        <Link href="/onboarding">
          <span style={{ fontWeight: 'bold', color: 'teal' }} >Go to Onboarding Page</span>
        </Link>
      </div>
        <div>
            <Link href="/widget-solana">
                <span style={{ fontWeight: 'bold', color: 'teal' }} >Do you have dApp? click me</span>
            </Link>
        </div>
    </main>
  )
}
