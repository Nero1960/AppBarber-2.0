import React from "react"

const MessageError = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="text-sm text-red-400 w-full pt-2">
        {children}
    </div>
  )
}

export default MessageError