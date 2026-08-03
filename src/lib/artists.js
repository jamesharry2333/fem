// Single source of truth for the studio's artists.
// Used by both the About page and the Booking form so they never drift apart.
export const artists = [
    {
        id: 'True-Mark',
        name: 'True Mark',
        role: 'Founder · Traditional & Blackwork',
        img: '/image/fit4.jpg',
    },
    {
        id: 'D Ink Theory',
        name: 'D Ink Theory',
        role: 'Fine Line & Botanical',
        img: '/image/fit5.jpeg',
    },
    {
        id: 'tt ink',
        name: 'TT ink',
        role: 'Custom Script & Portraiture',
        img: '/image/image6.jpeg',
    },
]

// Tattoo styles offered — reused in the booking form's dropdown.
export const tattooStyles = [
    'Traditional / Flash',
    'Fine Line',
    'Blackwork',
    'Custom / Other',
]