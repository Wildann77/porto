export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/45 bg-background/70 py-8 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 text-center md:flex-row md:items-center md:justify-between md:px-6 md:text-left">
        <div>
          <p className="font-sans text-sm font-bold">Wildan Haifan Jadid</p>
          <p className="mt-1 text-xs text-muted-foreground">Full Stack Software Engineer / Brebes, Indonesia</p>
        </div>
        <p className="text-xs text-muted-foreground">&copy; {currentYear} Wildan Haifan Jadid. All rights reserved.</p>
      </div>
    </footer>
  )
}
