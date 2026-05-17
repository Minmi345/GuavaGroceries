import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()

  // go back to wherever the user came from — works from both
  // the HomePage and any logged-in page
  const handleBack = () => navigate(-1)

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* top bar with back button */}
      <div className='border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            src='/logo.png'
            alt='GuavaGroceries logo'
            className='w-8 h-8 object-contain'
          />
          <span className='text-lg font-bold text-gray-900'>
						GuavaGroceries
          </span>
        </div>
        <button
          onClick={handleBack}
          className='border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100'>
					Back
        </button>
      </div>

      {/* main content */}
      <div className='max-w-md mx-auto px-6 py-10 flex flex-col gap-8'>
        {/* hero */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-gray-900'>
						About GuavaGroceries
          </h1>
          <p className='text-sm text-gray-500'>
						Making grocery spending simple, shared, and stress-free.
          </p>
        </div>

        {/* what it is */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-base font-semibold text-gray-900'>
						What is GuavaGroceries?
          </h2>
          <p className='text-sm text-gray-600 leading-relaxed'>
						GuavaGroceries is an app for tracking grocery receipts, alone or
						with others. Upload your receipts, organise them into groups, and
						get a clear picture of where your money is going.
          </p>
        </div>

        {/* features */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-base font-semibold text-gray-900'>
						What you can do
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='bg-gray-50 rounded-lg px-4 py-3'>
              <p className='text-sm font-medium text-gray-900'>
								Upload receipts
              </p>
              <p className='text-sm text-gray-500 mt-0.5'>
								Snap or upload a receipt and it's stored instantly.
              </p>
            </div>

            <div className='bg-gray-50 rounded-lg px-4 py-3'>
              <p className='text-sm font-medium text-gray-900'>
								Track spending
              </p>
              <p className='text-sm text-gray-500 mt-0.5'>
								See breakdowns of what you're spending and where.
              </p>
            </div>

            <div className='bg-gray-50 rounded-lg px-4 py-3'>
              <p className='text-sm font-medium text-gray-900'>
								Share with a group
              </p>
              <p className='text-sm text-gray-500 mt-0.5'>
								Create a group with friends or family and see each other's
								receipts in one place.
              </p>
            </div>
          </div>
        </div>

        {/* team section */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-base font-semibold text-gray-900'>The team</h2>
          <div className='flex flex-col gap-2'>
            {[
              { initials: 'VA', name: 'Varvara Aladyina', role: 'Backend' },
              { initials: 'RB', name: 'Rebecca Blixt', role: 'Frontend' },
              { initials: 'DD', name: 'Dechen Dolkar', role: 'Frontend' },
              {
                initials: 'MS',
                name: 'Max Sellick',
                role: 'Backend',
              },
              {
                initials: 'HW',
                name: 'Hmon Wutt',
                role: 'Database',
              },
            ].map((member) => (
              <div
                key={member.name}
                className='flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3'>
                <div className='w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700 shrink-0'>
                  {member.initials}
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {member.name}
                  </p>
                  <p className='text-xs text-gray-500'>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
