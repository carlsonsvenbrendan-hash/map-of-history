'use client'

type Props = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export default function TimelineSlider({ min, max, value, onChange }: Props) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-[min(640px,calc(100vw-2rem))] bg-zinc-900/90 backdrop-blur-md rounded-2xl px-6 pt-4 pb-5 border border-zinc-700/60 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{min}</span>
        <span className="text-sm font-semibold text-white tabular-nums">{value}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{max}</span>
      </div>

      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-zinc-700" />

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="
            relative w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-track]:bg-transparent
          "
        />
      </div>
    </div>
  )
}
