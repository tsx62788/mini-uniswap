'use client'
import dynamic from 'next/dynamic'

const DynamicExchange = dynamic(() => import('./components/Exchange'), { ssr: false })
const HomePage: React.FC = () => {
  return (
    <>
      <div className='w-11/12 mt-8'>
        <DynamicExchange tokenList={[]} />
      </div>
    </>
  )
}

export default HomePage
