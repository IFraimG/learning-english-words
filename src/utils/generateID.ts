export default (list: { id: string }[] | any | null): string => {
  if (list == null) return "foo"

  const words = "abcdefghijklmnopqrstuvwxyz"
  for (;;) {
    let id: string | null = ""
    const randomIterative: number = Math.floor(Math.random() * (20 - 6)) + 6

    for (let i = 0; i <= randomIterative; i++) {
      id += words.charAt(Math.floor(Math.random() * words.length))
    }

    let isTask = false
    if (Array.isArray(list))
      list.map(item => {
        if (item.id == id) isTask = true
      })

    if (!isTask) return id
  }
}
