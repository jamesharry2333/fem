import { Link } from 'react-router-dom'

const styles = [
    {
        name: 'Traditional / Flash',
        desc: 'Bold linework, saturated color, classic imagery built to age well over decades.',
        img: '/image/sample1.jpg',
    },
    {
        name: 'Fine Line',
        desc: 'Delicate single-needle work — botanicals, script, and minimal portraiture.',
        img: '/image/image2.jpeg',
    },
    {
        name: 'Blackwork',
        desc: 'Heavy saturation, geometric patterning, and large-scale ornamental pieces.',
        img: '/image/image3.jpg',
    },
]

const process = [
    {
        num: '01',
        title: 'Consultation',
        desc: 'Tell us the idea, placement, and size. We talk references, healing time, and budget honestly.',
    },
    {
        num: '02',
        title: 'Custom Design',
        desc: 'Your artist drafts a stencil sized to your body. Revisions happen before the machine ever turns on.',
    },
    {
        num: '03',
        title: 'The Session',
        desc: 'Sterile single-use needles, hospital-grade barriers, and a playlist of your choosing.',
    },
    {
        num: '04',
        title: 'Aftercare',
        desc: 'We walk you through healing day by day and stay reachable for the whole four weeks.',
    },
]

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container hero__inner">
                    <div className="hero__copy">
                        <p className="eyebrow">USA . 2019</p>
                        <h1>Ink that's earned, not rushed.</h1>
                        <p>
                            Em Ink is a private-studio tattoo practice built around custom design, sterile
                            process, and artists who'll tell you the truth about what will actually age well
                            on your skin.
                        </p>
                        <div className="hero__actions">
                            <Link to="/book" className="btn btn--primary">Book a consultation</Link>
                            <Link to="/about" className="btn btn--ghost">Meet the studio</Link>
                        </div>
                        <div className="hero__stats">
                            <div>
                                <span className="hero__stat-num">6yrs</span>
                                <span className="hero__stat-label">In this location</span>
                            </div>
                            <div>
                                <span className="hero__stat-num">1200+</span>
                                <span className="hero__stat-label">Pieces tattooed</span>
                            </div>
                            <div>
                                <span className="hero__stat-num">100%</span>
                                <span className="hero__stat-label">Single-use needles</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero__art" aria-hidden="true">
                        <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="180" cy="180" r="178" stroke="var(--line-strong)" strokeDasharray="3 6" />
                            <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M110 250 L150 210" />
                                <rect x="140" y="150" width="100" height="46" rx="6" transform="rotate(-45 140 150)" />
                                <path d="M205 130 L245 90" />
                                <circle cx="255" cy="80" r="14" />
                                <path d="M225 150 L205 170" strokeWidth="1.5" />
                            </g>
                            <g stroke="var(--flash-red)" strokeWidth="2" fill="none">
                                <path d="M90 270 q20 20 40 0" />
                                <path d="M100 280 q20 20 40 0" />
                            </g>
                            <g stroke="var(--flash-teal)" strokeWidth="1.5" fill="none" opacity="0.8">
                                <path d="M270 200 q15 30 -10 46" />
                                <path d="M285 210 q15 30 -10 46" />
                            </g>
                        </svg>
                    </div>
                </div>
            </section>

            <section className="section container">
                <p className="eyebrow">What we tattoo</p>
                <h2>Three disciplines, one standard</h2>
                <div className="grid grid--3" style={{ marginTop: '2rem' }}>
                    {styles.map((s) => (
                        <div className="style-card" key={s.name}>
                            <div className="style-card__img">
                                <img src={s.img} alt={`${s.name} tattoo example`} />
                            </div>
                            <div className="style-card__body">
                                <h3>{s.name}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider" />

            <section className="section container">
                <p className="eyebrow">How a session works</p>
                <h2>From idea to healed skin</h2>
                <div style={{ marginTop: '1.5rem' }}>
                    {process.map((step) => (
                        <div className="process-step" key={step.num}>
                            <span className="process-step__num">{step.num}</span>
                            <div className="process-step__body">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section container">
                <div className="cta-band">
                    <div>
                        <h2>Ready to start the design?</h2>
                        <p>Create a free account to book a consultation and track your appointments.</p>
                    </div>
                    <Link to="/register" className="btn btn--primary">Create an account</Link>
                </div>
            </section>
        </>
    )
}