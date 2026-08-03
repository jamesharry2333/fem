import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'

const statusClass = {
    Confirmed: 'badge--green',
    Pending: 'badge--amber',
    Processing: 'badge--amber',
    Completed: 'badge--muted',
    Cancelled: 'badge--muted',
}

// Shown on every "Processing" booking, with the price pulled from that booking's row.
function paymentDetails(appt) {
    const amount = appt.price != null ? `₦${Number(appt.price).toLocaleString()}` : 'the agreed amount'
    return `Please pay ${amount} to Acc 0123456789 (GTBank, Em Ink Tattoo Studio) to confirm your slot.`
}

export default function Dashboard() {
    const { user, profile } = useAuth()
    const location = useLocation()
    const successMessage = location.state?.message

    const [activeTab, setActiveTab] = useState('upcoming')
    const [appointments, setAppointments] = useState([])
    const [apptLoading, setApptLoading] = useState(true)
    const [apptError, setApptError] = useState('')
    const [cancellingId, setCancellingId] = useState(null)

    useEffect(() => {
        if (user) fetchAppointments()
    }, [user])

    async function fetchAppointments() {
        setApptLoading(true)
        setApptError('')
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: true })
            .order('time', { ascending: true })

        if (error) {
            setApptError('Could not load appointments. The "appointments" table may not exist yet — see the setup guide.')
        } else {
            setAppointments(data || [])
        }
        setApptLoading(false)
    }

    async function handleCancel(id) {
        setCancellingId(id)
        const { error } = await supabase
            .from('appointments')
            .update({ status: 'Cancelled' })
            .eq('id', id)
            .eq('user_id', user.id)

        if (!error) {
            setAppointments((prev) =>
                prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
            )
        }
        setCancellingId(null)
    }

    const upcoming = appointments.filter((a) => ['Pending', 'Processing', 'Confirmed'].includes(a.status))
    const past = appointments.filter((a) => ['Completed', 'Cancelled'].includes(a.status))

    const name = profile?.name || user?.user_metadata?.name || 'Member'
    const email = profile?.email || user?.email || ''
    const joinedAt = profile?.joined_at || profile?.created_at || user?.created_at || new Date().toISOString()

    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

    return (
        <section className="section container dashboard">
            <aside className="dash-sidebar">
                <div className="dash-avatar">{initials}</div>
                <h2 className="dash-name">{name}</h2>
                <p className="dash-email">{email}</p>
                <p className="dash-joined">
                    Member since{' '}
                    {new Date(joinedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </p>

                <nav className="dash-nav">
                    {['upcoming', 'history', 'profile'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`dash-nav__link ${activeTab === tab ? 'dash-nav__link--active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </aside>

            <div className="dash-main">
                {successMessage && <p className="form-success">{successMessage}</p>}

                {activeTab === 'upcoming' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Upcoming appointments</h2>
                            </div>
                            <Link to="/book" className="btn btn--primary">Book a session</Link>
                        </div>

                        {apptLoading ? (
                            <div className="dash-empty"><p style={{ margin: 0 }}>Loading appointments…</p></div>
                        ) : apptError ? (
                            <div className="dash-empty"><p style={{ margin: 0 }}>{apptError}</p></div>
                        ) : upcoming.length === 0 ? (
                            <div className="dash-empty">
                                <p>No upcoming appointments yet.</p>
                                <Link to="/book" className="btn btn--ghost" style={{ marginTop: '1rem' }}>
                                    Book your first session
                                </Link>
                            </div>
                        ) : (
                            <div className="appointment-list">
                                {upcoming.map((appt) => (
                                    <AppointmentCard
                                        key={appt.id}
                                        appt={appt}
                                        onCancel={handleCancel}
                                        cancelling={cancellingId === appt.id}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="dash-promo">
                            <img
                                src="https://picsum.photos/seed/em-ink-dash/900/300?grayscale"
                                alt="Studio interior"
                            />
                            <div className="dash-promo__overlay" />
                            <div className="dash-promo__content">
                                <p className="eyebrow eyebrow--light">Flash day</p>
                                <p>First Saturday of every month — walk in, walk out marked.</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Visit history</h2>
                            </div>
                        </div>

                        {apptLoading ? (
                            <div className="dash-empty"><p style={{ margin: 0 }}>Loading history…</p></div>
                        ) : past.length === 0 ? (
                            <div className="dash-empty"><p style={{ margin: 0 }}>No past visits recorded yet.</p></div>
                        ) : (
                            <div className="appointment-list">
                                {past.map((appt) => (
                                    <AppointmentCard key={appt.id} appt={appt} muted />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'profile' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Your profile</h2>
                            </div>
                        </div>

                        <div className="profile-grid">
                            <div className="profile-field">
                                <span className="profile-field__label">Name</span>
                                <span className="profile-field__value">{name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Email</span>
                                <span className="profile-field__value">{email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Member since</span>
                                <span className="profile-field__value">
                                    {new Date(joinedAt).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Total visits</span>
                                <span className="profile-field__value">{past.length} completed</span>
                            </div>
                        </div>

                        <div className="profile-note">
                            <p style={{ margin: 0 }}>Need to update your details or have a question about your account?</p>
                            <a href="mailto:hello@eminktattoo.com" className="btn btn--ghost" style={{ marginTop: '0.8rem' }}>
                                Contact the studio
                            </a>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

// Formats a 24-hour "HH:MM" time string (what <input type="time"> saves) as "2:30 PM".
function formatTime(time) {
    if (!time) return ''
    const [hourStr, minuteStr] = time.split(':')
    const hour = parseInt(hourStr, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return `${displayHour}:${minuteStr} ${period}`
}

function AppointmentCard({ appt, muted = false, onCancel, cancelling = false }) {
    // appt.date is stored as an ISO string (YYYY-MM-DD) from the booking form's
    // <input type="date">, so we parse it with Date rather than string-splitting.
    const dateObj = new Date(`${appt.date}T00:00:00`)
    const validDate = !isNaN(dateObj.getTime())
    const day = validDate ? dateObj.getDate() : appt.date
    const month = validDate ? dateObj.toLocaleDateString('en-GB', { month: 'short' }) : ''

    const canCancel = onCancel && ['Pending', 'Processing', 'Confirmed'].includes(appt.status)

    return (
        <div className={`appointment-card ${muted ? 'appointment-card--muted' : ''}`}>
            <div className="appointment-card__date-block">
                <span className="appointment-card__day">{day}</span>
                <span className="appointment-card__month">{month}</span>
            </div>
            <div className="appointment-card__body">
                <p className="appointment-card__type">{appt.type}</p>
                <p className="appointment-card__meta">{appt.artist} · {formatTime(appt.time)}</p>
                {appt.notes && <p className="appointment-card__notes">{appt.notes}</p>}
                {appt.status === 'Processing' && (
                    <div className="appointment-card__payment-note">
                        <p style={{ margin: 0 }}>{paymentDetails(appt)}</p>
                        {appt.admin_note && (
                            <p style={{ margin: '0.4rem 0 0' }}>{appt.admin_note}</p>
                        )}
                    </div>
                )}
            </div>
            <div className="appointment-card__actions">
                <span className={`badge ${statusClass[appt.status] || 'badge--muted'}`}>{appt.status}</span>
                {canCancel && (
                    <button
                        type="button"
                        className="btn btn--ghost appointment-card__cancel"
                        onClick={() => onCancel(appt.id)}
                        disabled={cancelling}
                    >
                        {cancelling ? 'Cancelling…' : 'Cancel'}
                    </button>
                )}
            </div>
        </div>
    )
}