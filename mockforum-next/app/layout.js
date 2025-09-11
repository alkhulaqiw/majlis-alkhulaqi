import './globals.css'
export const metadata = { title: 'مجلس الخلاقي — نسخة محاكية' }
export default function RootLayout({ children }){
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="site-header">
          <div className="container">
            <div className="brand"><div className="logo">خ</div>
              <div><h1>مجلس الخلاقي</h1><p className="muted">نسخة محاكية</p></div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
