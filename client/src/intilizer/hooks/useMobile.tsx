import  {useState, useEffect} from "react"

const MOBILE_BREAKPOINT = 768

export const useIsMobile =() : boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

useEffect(() => {
    const  mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT-1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mediaQuery.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
