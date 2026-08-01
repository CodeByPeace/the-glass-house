window.CASE = {
    apps: ['chats', 'gallery', 'map', 'memos', 'vault'],
    freshApp: 'chats',
    chats: [
        { u: 'Mom', t: '14:20', msg: 'did u get the chicken out of the freezer??' },
        { u: 'SARAH', t: '14:22', msg: 'not yet omw home now' },
        { u: 'Mom', t: '14:25', msg: 'leo called he said he left his card with u. the gold one ending in 9902? let him know.' },
        { u: 'SARAH', t: '14:26', msg: 'ugh fine ill tell him' },
        { u: 'SARAH', t: '22:04', msg: 'im at the dock. he thinks im at the bar lol' },
        { u: 'Unknown Number', t: '22:05', msg: 'hes not at the bar sarah. look at the mirror in that pic u took.' },
        { u: 'SARAH', t: '22:06', msg: 'wait what? hes at the lake house with ashley' },
        { u: 'Unknown Number', t: '22:07', msg: 'ashleys phone is in the city. u r alone. get out.' }
    ],
    gallery: [
        {
            img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
            exif: { date: 'Jun 14, 2024 - 9:00 PM', loc: 'Lake House Hallway' },
            desc: "just a fit check... wait, is that his jacket in the background?"
        },
        {
            img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38',
            exif: { date: 'Jun 14, 2024 - 10:14 PM', loc: 'Lake House Kitchen' },
            desc: "screenshot of the ticket. card used: *9902. ashley was right."
        }
    ],
    map: [
        { t: '21:00', l: 'Main House', d: 'Stationary for 14m' },
        { t: '22:14', l: 'The Dock', d: 'Signal Lost. Last speed: 12mph' }
    ],
    memos: [{ filename: 'Voice 001', idle: '[Static]', reveal: 'SARAH: (whispering) i know u saw the alert leo. im not going back.' }],
    vault: {
        code: '2214',
        partial: "You found the ticket, but it's too late. She's gone.",
        full: "Sarah played them both. She used Leo's card to buy the ticket and used Ashley as a distraction. She left her phone on a boat at 22:14 and she's already at the airport. She won."
    }
};
