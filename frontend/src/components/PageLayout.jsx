export default function PageLayout({ navbar, children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      {navbar}
      <div className='max-w-md mx-auto px-6 py-8 flex flex-col gap-6'>
        {children}
      </div>
    </div>
  )
}
