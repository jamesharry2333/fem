import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'
import { artists, tattooStyles } from '../lib/artists.js'

const today = new Date().toISOString().split('T')[0]

export default function Booking() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        artist: artists[0].name,
        style: tattooStyles[0],
        date: '',
        time: '',
        notes: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (!form.date || !form.time) {
            setError('Please choose both a date and a time.')
            return
        }
        if (form.date < today) {
            setError('Please choose a date that is today or later.')
            return
        }

        setLoading(true)

        try {
            // Check the artist isn't already booked for that exact date/time.
            const { data: clashes, error: clashError } = await supabase
                .from('appointments')
                .select('id')
                .eq('artist', form.artist)
                .eq('date', form.date)
                .eq('time', form.time)
                .in('status', ['Pending', 'Confirmed'])

            if (clashError) throw clashError

            if (clashes && clashes.length > 0) {
                setError('That artist already has a booking at this exact date and time. Please pick another slot.')
                setLoading(false)
                return
            }

            const { error: insertError } = await supabase.from('appointments').insert({
                user_id: user.id,
                artist: form.artist,
                type: form.style,
                date: form.date,
                time: form.time,
                notes: form.notes.trim() || null,
                status: 'Pending',
            })

            if (insertError) throw insertError

            navigate('/dashboard', {
                replace: true,
                state: { message: 'Your booking request has been sent! We will confirm it shortly.' },
            })
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="section container">
            <p className="eyebrow">Book a session</p>
            <h1>Reserve your slot</h1>

            <div className="booking-grid">
                <form className="form booking-form card" onSubmit={handleSubmit}>
                    {error && <p className="form-error">{error}</p>}

                    <label>
                        Artist
                        <select name="artist" value={form.artist} onChange={handleChange} required>
                            {artists.map((a) => (
                                <option key={a.id} value={a.name}>{a.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Style
                        <select name="style" value={form.style} onChange={handleChange} required>
                            {tattooStyles.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </label>

                    <div className="booking-form__row">
                        <label>
                            Date
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={today}
                                required
                            />
                        </label>

                        <label>
                            Time
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <label>
                        Notes <span style={{ textTransform: 'none', opacity: 0.7 }}>(placement, size, reference — optional)</span>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={4}
                            placeholder="e.g. Small fine-line piece on the forearm, roughly 3 inches."
                        />
                    </label>

                    <button type="submit" className="btn btn--primary" disabled={loading}>
                        {loading ? 'Sending request…' : 'Request booking'}
                    </button>
                </form>

                <aside className="card booking-aside">
                    <h3>Good to know</h3>
                    <ul className="value-list">
                        <li>
                            <span className="value-mark">—</span>
                            <p style={{ margin: 0 }}>Bookings start as <strong>Pending</strong> until the studio confirms them — you will see the status update on your dashboard.</p>
                        </li>
                        <li>
                            <span className="value-mark">—</span>
                            <p style={{ margin: 0 }}>Each artist can only hold one appointment per exact date and time slot.</p>
                        </li>
                        <li>
                            <span className="value-mark">—</span>
                            <p style={{ margin: 0 }}>Need to cancel later? You can do that any time from your dashboard.</p>
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    )
}