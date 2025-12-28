import { memo, useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

const ProgressBar = ({ progressIndecator }) => {
    const [progress, setProgress] = useState(3)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(progressIndecator), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Progress
            value={progress}
            className="
          w-[80%]
          h-4
          bg-[#F8F8FF]
          rounded-md
          [&>div]:bg-[#895DF3]
          [&>div]:transition-transform
          [&>div]:rounded-md
          [&>div]:duration-300
          [&>div]:ease-out
        "
        />
    )
}

export default memo(ProgressBar)
