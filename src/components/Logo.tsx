import React from 'react'

export default function Logo({ className }: { className?: string }) {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle gradient */}
      <circle cx="16" cy="16" r="16" fill="url(#bg_gradient)" />
      
      {/* Abstract overlapping N / leaf shapes */}
      <path 
        d="M21.5 9C21.5 9 17 8 13.5 11.5C10 15 11 20 11 20" 
        stroke="white" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10.5 23C10.5 23 15 24 18.5 20.5C22 17 21 12 21 12" 
        stroke="url(#accent_gradient)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Center connection dot */}
      <circle cx="16" cy="16" r="2.5" fill="white" />

      <defs>
        <linearGradient id="bg_gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="accent_gradient" x1="10.5" y1="23" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  )
}
