const appActions = {
  setTheme(_: any, payload: any) {
    window.localStorage.setItem("theme", payload)
    document.body.setAttribute("data-theme", payload)
  },
}

export default appActions