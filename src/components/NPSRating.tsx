interface NPSRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function NPSRating({ value, onChange }: NPSRatingProps) {
  const getButtonColor = (number: number) => {
    if (number <= 6) return 'bg-red-500 hover:bg-red-600'
    if (number <= 8) return 'bg-yellow-500 hover:bg-yellow-600'
    return 'bg-green-500 hover:bg-green-600'
  }

  return (
    <div className="flex justify-between gap-1 w-full">
      {[...Array(11)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`
            ${getButtonColor(i)}
            ${value === i ? 'ring-2 ring-offset-2 ring-primary' : ''}
            w-10 h-10 rounded-full text-white font-medium
            flex items-center justify-center
            transition-all duration-200
          `}
        >
          {i}
        </button>
      ))}
    </div>
  )
}

