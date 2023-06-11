import Wrapper from './components/Wrapper'
import './globals.css'
import { Nunito } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'
import dynamic from 'next/dynamic'

const nunito = Nunito({ subsets: ['latin'] })
const DynamicNavBarPage = dynamic(() => import('./components/navBar/NavBar'), { ssr: false })

export const metadata = {
  title: 'Fake Uniswap',
  description: 'My uniswap for learning',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <Wrapper>
          <DynamicNavBarPage />
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
