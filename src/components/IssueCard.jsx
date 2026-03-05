function IssueCard({ issue }) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-move'>
      <div className='flex items-start gap-3 mb-3'>
        <img
          src={issue.authorAvatar}
          alt={issue.author}
          className='w-8 h-8 rounded-full'
        />
        <div className='flex-1'>
          <h3 className='font-semibold text-gray-800 mb-1 line-clamp-2'>
            {issue.title}
          </h3>
          <p className='text-xs text-gray-500'>
            #{issue.number} • {issue.repository}
          </p>
        </div>
      </div>

      {issue.labels && issue.labels.length > 0 && (
        <div className='flex flex-wrap gap-1 mb-3'>
          {issue.labels.slice(0, 3).map((label, index) => (
            <span
              key={index}
              className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'
            >
              {label}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className='text-xs text-gray-500'>
              +{issue.labels.length - 3}
            </span>
          )}
        </div>
      )}

      <div className='flex items-center justify-between text-xs text-gray-500'>
        <span>by @{issue.author}</span>
        <span>{issue.createdAt}</span>
      </div>

      <a
        href={issue.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-xs text-blue-500 hover:text-blue-700 mt-2 inline-block'
      >
        View on GitHub →
      </a>
    </div>
  );
}

export default IssueCard;
