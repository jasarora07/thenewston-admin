useEffect(() => {
    setMounted(true)
    
    if (typeof window !== "undefined") {
      const userAgent = window.navigator?.userAgent?.toLowerCase() || ""
      const urlParams = new URLSearchParams(window.location.search)
      
      // Bypasses the banner if a bot signature is found OR if the bypass parameter is explicitly set
      const isBot = /googlebot|bingbot|yahoobot|duckduckbot|baiduspider|headless/i.test(userAgent)
      const hasBypassParam = urlParams.get('bypass') === 'true'

      if (!isBot && !hasBypassParam) {
        const consent = localStorage.getItem("newston_consent")
        if (!consent) {
          setIsVisible(true)
        }
      } else {
        setIsVisible(false)
      }
    }
  }, [])
