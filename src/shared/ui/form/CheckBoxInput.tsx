'use client'

import { Checkbox } from '@/shared/ui/shadcn/checkbox'
import { useState } from 'react'

type CheckboxInputProps = {
  name: string
  label: string
  checked?: boolean
}

export default function CheckboxInput({
  name,
  label,
  checked = false,
}: CheckboxInputProps) {
  const [checkedValue, setCheckedValue] = useState(checked)

  const handleClick = () => {
    setCheckedValue((prev) => !prev)
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        name={name}
        onClick={handleClick}
        checked={checkedValue}
      />
      <label
        htmlFor={name}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {label}
      </label>
    </div>
  )
}
