export const uniqueTitle = (title: string) => {
  let newTitle = title.trimStart().trimEnd()
  let num = parseInt(newTitle[newTitle.length - 2])

  console.log(newTitle[newTitle.length - 2]);
  let newTitleArr = newTitle.split("")

  if (newTitle[newTitle.length - 1] == ")" && newTitle[newTitle.length - 3] == "(" && Number.isInteger(num)) {
    newTitleArr[newTitle.length - 2] = String(num + 1)
  } else newTitleArr.push(" (1)")

  newTitle = newTitleArr.join("")
  return newTitle
}