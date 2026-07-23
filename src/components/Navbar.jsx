import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    async function handleLogout() {
        await logout()
        setOpen(false)
        navigate('/')
    }

    function closeMenu() {
        setOpen(false)
    }

    return (
        <header className="nav">
            <div className="nav__inner container">
                <NavLink to="/" className="nav__brand" onClick={closeMenu}>
                    <span className="nav__brand-mark">EI</span>
                    <span className="nav__brand-name">Em Ink</span>
                </NavLink>

                <button
                    type="button"
                    className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
                    <NavLink to="/" className="nav__link" onClick={closeMenu} end>
                        Home
                    </NavLink>
                    <NavLink to="/about" className="nav__link" onClick={closeMenu}>
                        About
                    </NavLink>

                    {user ? (
                        <>
                            <NavLink to="/dashboard" className="nav__link" onClick={closeMenu}>
                                Dashboard
                            </NavLink>
                            <button type="button" className="btn btn--primary nav__cta" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav__link" onClick={closeMenu}>
                                Log in
                            </NavLink>
                            <NavLink to="/register" className="btn btn--primary nav__cta" onClick={closeMenu}>
                                Book a slot
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}