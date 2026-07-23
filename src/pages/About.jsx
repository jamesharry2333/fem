import { Link } from 'react-router-dom'

const artists = [
    {
        name: 'Emeka "Em" Okoye',
        role: 'Founder · Traditional & Blackwork',
        img: 'https://picsum.photos/seed/em-ink-artist-1/300/300',
    },
    {
        name: 'Ada Chukwu',
        role: 'Fine Line & Botanical',
        img: 'https://picsum.photos/seed/em-ink-artist-2/300/300',
    },
    {
        name: 'Tunde Bello',
        role: 'Custom Script & Portraiture',
        img: 'https://picsum.photos/seed/em-ink-artist-3/300/300',
    },
]

const values = [
    {
        title: 'Sterility isn\u2019t optional',
        desc: 'Every needle is single-use and opened in front of you. Stations are broken down and rebarriered between every client.',
    },
    {
        title: 'We design for your skin, not a photo',
        desc: 'Reference images inspire the piece; the final stencil is drawn for your exact size, placement, and movement.',
    },
    {
        title: 'Honesty over a quick yes',
        desc: 'If an idea won\u2019t age well or isn\u2019t right for the placement you want, we\u2019ll say so before you sit down.',
    },
]

export default function About() {
    return (
        <>
            <section className="section container">
                <p className="eyebrow">The studio</p>
                <h1>Six years, one chair philosophy</h1>
                <p style={{ maxWidth: '62ch', fontSize: '1.08rem' }}>
                    Em Ink started in 2019 as a single-artist studio above a record shop in Lagos. The idea
                    was simple: fewer clients per week, more time per design, and total transparency about
                    hygiene. That hasn't changed as the studio grew to three artists.
                </p>
            </section>

            <section className="section container">
                <p className="eyebrow">The artists</p>
                <h2>Who's holding the machine</h2>
                <div className="grid grid--3" style={{ marginTop: '2rem' }}>
                    {artists.map((a) => (
                        <div className="card artist-card" key={a.name}>
                            <div className="artist-card__img">
                                <img src={a.img} alt={a.name} />
                            </div>
                            <h3>{a.name}</h3>
                            <p className="artist-card__role">{a.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider" />

            <section className="section container">
                <p className="eyebrow">What we stand on</p>
                <h2>The studio's non-negotiables</h2>
                <ul className="value-list" style={{ marginTop: '1.5rem', maxWidth: '70ch' }}>
                    {values.map((v) => (
                        <li key={v.title}>
                            <span className="value-mark">—</span>
                            <div>
                                <h3 style={{ marginBottom: '0.25rem' }}>{v.title}</h3>
                                <p style={{ margin: 0 }}>{v.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="section container">
                <div className="cta-band">
                    <div>
                        <h2>Come see the space</h2>
                        <p>Register for an account and we'll confirm your first consultation slot.</p>
                    </div>
                    <Link to="/register" className="btn btn--primary">Register now</Link>
                </div>
            </section>
        </>
    )
}