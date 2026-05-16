export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      {/* FIXED: Inlining background-color, min-height, and opacity parameters directly on the body tag
          ensures Googlebot paints a fully visible layout tree even if its network connection times out on external CSS. */}
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}
        style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', opacity: 1 }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col" style={{ opacity: 1 }}>
            <StructuredData /> 
            <TickerBar />
            <NewsHeader /> 
            
            <Suspense fallback={<div className="flex-1 bg-black" style={{ backgroundColor: '#000000' }} />}>
              <PageTransition>
                <ClientLayout>
                  {/* FIXED: Forcing the direct visibility state wrapper right here */}
                  <main className="flex-1" style={{ opacity: 1, display: 'block' }}>
                    {children}
                  </main>
                </ClientLayout>
              </PageTransition>
            </Suspense>

            <ComplianceBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
