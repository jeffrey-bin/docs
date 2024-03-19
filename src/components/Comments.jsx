// @ts-nocheck
import * as React from "react"
import Giscus from "@giscus/react"

const id = "inject-comments"

function getSavedTheme() {
  return window.localStorage.getItem("starlight-theme")
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const Comments = () => {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState(getSavedTheme() || getSystemTheme())

  React.useEffect(() => {
    // 监听主题变化
    const observer = new MutationObserver(() => {
      setTheme(getSavedTheme())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    // 取消监听
    return () => {
      observer.disconnect()
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div id={id} style={{ marginTop: "50px" }}>
      {mounted ? (
        <Giscus
          id={id}
          repo="jeffrey-bin/docs"
          repoId="R_kgDOLh2E_g"
          category="Announcements"
          categoryId="DIC_kwDOLh2E_s4CeDC3"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
          theme={theme}
        />
      ) : null}
    </div>
  )
}

export default Comments
