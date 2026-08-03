export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <span className="nav__brand-mark">EI</span>
                    <span className="nav__brand-name">Great Ink</span>
                </div>
                <p className="footer__meta">© {new Date().getFullYear()} Great Ink Tattoo Studio. All skin is sacred.</p>
            </div>
        </footer>
    )
}