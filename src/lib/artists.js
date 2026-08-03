// Single source of truth for the studio's artists.
// Used by both the About page and the Booking form so they never drift apart.
export const artists = [
    {
        id: 'em-okoye',
        name: 'Emeka "Em" Okoye',
        role: 'Founder · Traditional & Blackwork',
        img: '/image/fit1.jpg',
    },
    {
        id: 'ada-chukwu',
        name: 'Ada Chukwu',
        role: 'Fine Line & Botanical',
        img: '/image/image5.jpeg',
    },
    {
        id: 'tunde-bello',
        name: 'Tunde Bello',
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