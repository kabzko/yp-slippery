import { useState } from "react"

export default function useTagRestday(input: string, setInput: any, arr: string[] = []) {
  const [tagsRestday, setTagsRestday] = useState(arr)

  const handleKeyDownRestDay = (event: any) => {
    if (event.key === "Enter" || event.key === "Tab" || event.key === ",") {
      event.preventDefault()
      const newTagRestday = input.trim()
      if (
        newTagRestday !== "" &&
        !tagsRestday.some((tagsRestday) => tagsRestday.toLowerCase() === newTagRestday.toLowerCase())
      ) {
        setTagsRestday([...tagsRestday, newTagRestday])
        setInput("")
      }
    }
  }

  const handleRemoveTagRestday = (tagRestday: string) => {
    setTagsRestday(tagsRestday.filter((t) => t !== tagRestday))
  }

  return { tagsRestday, setTagsRestday, handleKeyDownRestDay, handleRemoveTagRestday }
}
