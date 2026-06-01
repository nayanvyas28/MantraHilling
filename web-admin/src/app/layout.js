import "./globals.css";

export const metadata = {
  title: "MantraHilling Admin Portal",
  description: "Administrative console for managing sounds, conditions, and users",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
