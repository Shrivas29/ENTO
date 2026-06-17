const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shrivas-vm-612540250/' },
  { label: 'Instagram', href: 'https://www.instagram.com/buildwithento/' },
]

export function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6"
      style={{ borderTop: '1px solid #181818' }}
    >
      <div className="flex items-center gap-6">
        <span className="font-display font-bold text-xs tracking-[0.18em] text-[#F0EDE8]/50">
          ENTØ
        </span>
        <span className="font-body text-[10px] text-[#F0EDE8]/20 tracking-[0.1em]">
          © 2025 ENTØ Studio. All rights reserved.
        </span>
      </div>

      <div className="flex items-center gap-8">
        {SOCIAL.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-[0.18em] text-[#F0EDE8]/50 hover:text-[#C8FF57] transition-colors duration-200 uppercase"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8FF57]" />
        <span className="font-body text-[10px] tracking-[0.16em] text-[#F0EDE8]/25 uppercase">
          Creative Intelligence Studio
        </span>
      </div>
    </footer>
  )
}
