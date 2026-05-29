import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const stats = [
    { value: '2,400+', label: 'Farmers registered' },
    { value: '₹1.2Cr+', label: 'Trade facilitated' },
    { value: '180+', label: 'Districts covered' },
    { value: '0', label: 'Middlemen involved' },
]

const steps = [
    {
        icon: '🌾',
        role: 'Farmer',
        title: 'Post your produce',
        desc: 'List your crop with quantity, price, and location. Takes 2 minutes.',
    },
    {
        icon: '🔍',
        role: 'Vendor',
        title: 'Browse and filter',
        desc: 'Search by crop or location. See real farmer profiles, not anonymous listings.',
    },
    {
        icon: '🤝',
        role: 'Both',
        title: 'Trade directly',
        desc: 'Place orders, accept or reject, coordinate directly. No commission cut.',
    },
]

const testimonials = [
    {
        name: 'Ravi Kumar',
        role: 'Wheat Farmer, Guntur',
        quote: 'Earlier I used to sell at mandi rates. Now I negotiate directly and earn 40% more on each sale.',
        initials: 'RK',
        color: '#e8f5ee',
        textColor: '#1a6b3c',
    },
    {
        name: 'Priya Mehta',
        role: 'Grocery Vendor, Hyderabad',
        quote: 'I source tomatoes directly from 3 farmers now. Fresher stock, lower prices, same-day confirmation.',
        initials: 'PM',
        color: '#fff8ec',
        textColor: '#c17c1a',
    },
    {
        name: 'Suresh Rao',
        role: 'Rice Farmer, Nellore',
        quote: 'The app is simple. I listed my paddy harvest and got 4 orders in 2 days. No agent, no cut.',
        initials: 'SR',
        color: '#e8f5ee',
        textColor: '#1a6b3c',
    },
]

function useIntersection(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])
    return [ref, visible]
}

export default function LandingPage() {
    const navigate = useNavigate()
    const [heroRef, heroVisible] = useIntersection(0.1)
    const [statsRef, statsVisible] = useIntersection(0.2)
    const [stepsRef, stepsVisible] = useIntersection(0.1)
    const [testRef, testVisible] = useIntersection(0.1)

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#1a1f1c', overflowX: 'hidden' }}>

            {/* ── Navbar ── */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #e4e7e1',
                padding: '0 5vw',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: 60,
            }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, color: '#1a6b3c', letterSpacing: '-0.3px' }}>
                    🌾 KisanKart
                </span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button onClick={() => navigate('/login')} style={{
                        background: 'transparent', border: '1.5px solid #1a6b3c',
                        color: '#1a6b3c', borderRadius: 8, padding: '7px 18px',
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, cursor: 'pointer',
                    }}>
                        Login
                    </button>
                    <button onClick={() => navigate('/register')} style={{
                        background: '#1a6b3c', border: 'none',
                        color: '#fff', borderRadius: 8, padding: '8px 20px',
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, cursor: 'pointer',
                    }}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                style={{
                    background: 'linear-gradient(135deg, #0f4526 0%, #1a6b3c 60%, #22853f 100%)',
                    minHeight: '88vh',
                    display: 'flex', alignItems: 'center',
                    padding: '80px 5vw 80px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* background texture circles */}
                <div style={{
                    position: 'absolute', top: -80, right: -80,
                    width: 420, height: 420, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: -120, left: '30%',
                    width: 300, height: 300, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
                }} />

                <div
                    style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >

                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(245,166,35,0.18)',
                        border: '1px solid rgba(245,166,35,0.35)',
                        color: '#f5c87a',
                        borderRadius: 20, padding: '5px 14px',
                        fontSize: 13, fontWeight: 500,
                        marginBottom: 28,
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
                        transition: 'all 0.5s ease',
                    }}>
                        🇮🇳 Built for Indian agriculture
                    </div>

                    <h1 style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 'clamp(36px, 6vw, 62px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.1,
                        letterSpacing: '-1.5px',
                        marginBottom: 24,
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease 0.1s',
                    }}>
                        Direct from farm.<br />
                        <span style={{ color: '#f5a623' }}>Fair for everyone.</span>
                    </h1>

                    <p style={{
                        fontSize: 18,
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.7,
                        maxWidth: 650,
                        margin: '0 auto 40px',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease 0.2s',
                    }}>
                        KisanKart connects farmers directly with vendors across India —
                        no mandis, no middlemen, no commission cuts. Just honest trade.
                    </p>

                    <div style={{
                        display: 'flex', gap: 14, flexWrap: 'wrap',
                        justifyContent: 'center',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease 0.3s',
                    }}>
                        <button
                            onClick={() => navigate('/register')}
                            style={{
                                background: '#f5a623', color: '#1a1f1c',
                                border: 'none', borderRadius: 10,
                                padding: '14px 28px', fontSize: 16, fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                boxShadow: '0 4px 20px rgba(245,166,35,0.4)',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                            }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(245,166,35,0.45)' }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(245,166,35,0.4)' }}
                        >
                            I'm a Farmer →
                        </button>
                        <button
                            onClick={() => navigate('/register?role=vendor')}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                border: '1.5px solid rgba(255,255,255,0.3)',
                                borderRadius: 10,
                                padding: '14px 28px', fontSize: 16, fontWeight: 500,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                backdropFilter: 'blur(8px)',
                                transition: 'background 0.2s ease',
                            }}
                            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            I'm a Vendor →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section
                ref={statsRef}
                style={{
                    background: '#f0f7f2',
                    borderBottom: 'none',
                    padding: '36px 5vw',
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: 24, maxWidth: 900, margin: '0 auto', textAlign: 'center',
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            opacity: statsVisible ? 1 : 0,
                            transform: statsVisible ? 'translateY(0)' : 'translateY(16px)',
                            transition: `all 0.5s ease ${i * 0.1}s`,
                        }}>
                            <div style={{
                                fontFamily: "'Sora', sans-serif", fontSize: 32,
                                fontWeight: 700, color: '#1a6b3c', letterSpacing: '-1px',
                            }}>{s.value}</div>
                            <div style={{ fontSize: 14, color: '#6b7a72', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ── */}
            <section
                ref={stepsRef}
                style={{ background: '#f7f8f6', padding: '80px 5vw' }}
            >
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <p style={{
                        fontSize: 13, fontWeight: 600, letterSpacing: '1.5px',
                        color: '#1a6b3c', textTransform: 'uppercase', textAlign: 'center',
                        marginBottom: 12,
                        opacity: stepsVisible ? 1 : 0, transition: 'opacity 0.5s ease',
                    }}>
                        How it works
                    </p>
                    <h2 style={{
                        fontFamily: "'Sora', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)',
                        fontWeight: 700, textAlign: 'center', color: '#1a1f1c',
                        letterSpacing: '-0.8px', marginBottom: 56,
                        opacity: stepsVisible ? 1 : 0,
                        transform: stepsVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'all 0.5s ease 0.1s',
                    }}>
                        Trade in three simple steps
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 24,
                    }}>
                        {steps.map((step, i) => (
                            <div key={i} style={{
                                background: '#fff',
                                border: '1px solid #e4e7e1',
                                borderRadius: 16,
                                padding: '32px 28px',
                                opacity: stepsVisible ? 1 : 0,
                                transform: stepsVisible ? 'translateY(0)' : 'translateY(24px)',
                                transition: `all 0.55s ease ${0.15 + i * 0.12}s`,
                            }}>
                                <div style={{
                                    fontSize: 36, marginBottom: 16,
                                    width: 60, height: 60,
                                    background: '#e8f5ee', borderRadius: 14,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {step.icon}
                                </div>
                                <span style={{
                                    fontSize: 11, fontWeight: 600, letterSpacing: '1px',
                                    textTransform: 'uppercase', color: '#1a6b3c',
                                }}>
                                    {step.role}
                                </span>
                                <h3 style={{
                                    fontFamily: "'Sora', sans-serif",
                                    fontSize: 19, fontWeight: 600,
                                    color: '#1a1f1c', margin: '8px 0 10px',
                                    letterSpacing: '-0.3px',
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: 14, color: '#6b7a72', lineHeight: 1.65, margin: 0 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section
                ref={testRef}
                style={{ background: '#fff', padding: '80px 5vw' }}
            >
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 'clamp(24px, 4vw, 36px)',
                        fontWeight: 700, textAlign: 'center',
                        color: '#1a1f1c', letterSpacing: '-0.8px', marginBottom: 48,
                        opacity: testVisible ? 1 : 0,
                        transform: testVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'all 0.5s ease',
                    }}>
                        Farmers and vendors love it
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 20,
                    }}>
                        {testimonials.map((t, i) => (
                            <div key={i} style={{
                                border: '1px solid #e4e7e1', borderRadius: 16,
                                padding: '28px 24px',
                                opacity: testVisible ? 1 : 0,
                                transform: testVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.55s ease ${i * 0.12}s`,
                            }}>
                                <p style={{
                                    fontSize: 15, color: '#3a3f3c', lineHeight: 1.7,
                                    marginBottom: 24, fontStyle: 'italic',
                                }}>
                                    "{t.quote}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: '50%',
                                        background: t.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 600, fontSize: 13, color: t.textColor,
                                        flexShrink: 0,
                                    }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1f1c' }}>{t.name}</div>
                                        <div style={{ fontSize: 12, color: '#6b7a72' }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section style={{
                background: 'linear-gradient(135deg, #0f4526 0%, #1a6b3c 100%)',
                padding: '72px 5vw',
                textAlign: 'center',
            }}>
                <h2 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 'clamp(26px, 4vw, 42px)',
                    fontWeight: 700, color: '#fff',
                    letterSpacing: '-1px', marginBottom: 16,
                }}>
                    Ready to trade without middlemen?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, marginBottom: 36 }}>
                    Join thousands of farmers and vendors already on KisanKart.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            background: '#f5a623', color: '#1a1f1c',
                            border: 'none', borderRadius: 10,
                            padding: '14px 32px', fontSize: 16, fontWeight: 600,
                            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Register as Farmer
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            border: '1.5px solid rgba(255,255,255,0.3)',
                            borderRadius: 10,
                            padding: '14px 32px', fontSize: 16, fontWeight: 500,
                            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Register as Vendor
                    </button>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer style={{
                background: '#0f1a13',
                padding: '32px 5vw',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 12,
            }}>
                <span style={{
                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                    fontSize: 16, color: '#fff',
                }}>
                    🌾 KisanKart
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    © 2025 KisanKart. Eliminating middlemen, one trade at a time.
                </span>
            </footer>

        </div>
    )
}