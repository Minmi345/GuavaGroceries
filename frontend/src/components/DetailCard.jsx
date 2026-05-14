export default function DetailCard({ label, value }) {
	return (
		<div className='bg-white border border-gray-200 rounded-lg px-4 py-3'>
			<p className='text-xs text-gray-400 mb-1'>{label}</p>
			<p className='text-sm font-medium text-gray-900'>{value}</p>
		</div>
	)
}
