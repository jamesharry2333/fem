// Single source of truth for the studio's artists.
// Used by both the About page and the Booking form so they never drift apart.
export const artists = [
    {
        id: 'em-okoye',
        name: 'Emeka "Em" Okoye',
        role: 'Founder · Traditional & Blackwork',
        img: 'https://picsum.photos/seed/em-ink-artist-1/300/300',
    },
    {
        id: 'ada-chukwu',
        name: 'Ada Chukwu',
        role: 'Fine Line & Botanical',
        img: 'https://picsum.photos/seed/em-ink-artist-2/300/300',
    },
    {
        id: 'tunde-bello',
        name: 'Tunde Bello',
        role: 'Custom Script & Portraiture',
        img: 'https://picsum.photos/seed/em-ink-artist-3/300/300',
    },
]

// Tattoo styles offered — reused in the booking form's dropdown.
export const tattooStyles = [
    'Traditional / Flash',
    'Fine Line',
    'Blackwork',
    'Custom / Other',
]