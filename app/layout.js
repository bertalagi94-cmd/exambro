import './globals.css'

export const metadata = {
  title: 'Exambro Admin',
  description: 'Admin panel for Exambro exam barcodes'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}