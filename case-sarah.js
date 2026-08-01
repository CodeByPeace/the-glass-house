window.CASE = {
    apps: ['chats', 'gallery', 'map', 'memos', 'notes', 'vault'],
    freshApp: 'chats',
    chats: [
        { u: 'Mom', t: '09:14', msg: 'did u take the chicken out' },
        { u: 'SARAH', t: '09:45', msg: 'omg ok taking it out now' },
        { u: 'Jake (Work)', t: '11:02', msg: "hey can u cover my closing shift thurs" },
        { u: 'Mom', t: '14:20', msg: 'did u get the chicken out of the freezer??' },
        { u: 'SARAH', t: '14:22', msg: 'not yet omw home now' },
        { u: 'Mom', t: '14:25', msg: 'leo called he said he left his card with u. the gold one ending in 9902? let him know.' },
        { u: 'SARAH', t: '14:26', msg: 'ugh fine ill tell him' },
        { u: 'Jake (Work)', t: '18:11', msg: "locked myself out again lol can u bring it thurs" },
        { u: 'SARAH', t: '22:04', msg: 'im at the dock. he thinks im at the bar lol' },
        { u: 'Unknown Number', t: '22:05', msg: 'hes not at the bar sarah. look at the mirror in that pic u took.' },
        { u: 'SARAH', t: '22:06', msg: 'wait what? hes at the lake house with ashley' },
        { u: 'Unknown Number', t: '22:07', msg: 'ashleys phone is in the city. u r alone. get out.' }
    ],
    gallery: [
        {
            img: window.ASSETS.coffee_photo,
            exif: { date: 'Jun 12, 2024 - 8:14 AM', loc: 'Starbucks' },
            desc: "iced coffee, oat milk"
        },
        {
            img: window.ASSETS.spotify_photo,
            exif: { date: 'Jun 10, 2024 - 6:32 PM', loc: 'Screenshot' },
            desc: "screenshot of a playlist"
        },
        {
            img: window.ASSETS.rain_photo,
            exif: { date: 'Jun 9, 2024 - 4:50 PM', loc: 'Lake House Porch' },
            desc: "rain on the window"
        },
        {
            img: window.ASSETS.mirror_photo,
            exif: { date: 'Jun 14, 2024 - 9:00 PM', loc: 'Lake House Hallway' },
            desc: "mirror selfie. reflection shows a jacket on the coat hook behind her."
        },
        {
            img: window.ASSETS.dock_photo,
            exif: { date: 'Jun 14, 2024 - 9:52 PM', loc: 'The Dock' },
            desc: "taken from the water. timestamp is 22 minutes before her last text."
        },
        {
            img: window.ASSETS.ticket_photo,
            exif: { date: 'Jun 14, 2024 - 10:14 PM', loc: 'Screenshot' },
            desc: "plane ticket confirmation. departure time is legible, destination isnt."
        }
    ],
    map: [
        { t: '21:00', l: 'Main House', d: 'Stationary for 14m' },
        { t: '22:14', l: 'The Dock', d: 'Signal Lost. Last speed: 12mph' }
    ],
    memos: [
        { filename: 'Voice 001', audioSrc: window.ASSETS.sarah_dock, idle: '[Tap to play]', reveal: "SARAH: (whispering) hey... don't call me back. just... check the folder. the timestamp on the dock photo, that's the key. i gotta go." },
        { filename: 'Voice 002', audioSrc: window.ASSETS.sarah_backroad, idle: '[Tap to play]', reveal: "SARAH: he thinks i'm still in the house. i'm taking the back road... if i don't message you by two, just delete the backup." },
        { filename: 'Voice 003', audioSrc: window.ASSETS.sarah_forensic, idle: '[Tap to play]', reveal: "SARAH: if you're listening to this... i didn't make it to the boat. look at the file details, not the picture." },
        { filename: 'Voice 004', audioSrc: window.ASSETS.ashley_door, idle: '[Tap to play]', reveal: "ASHLEY: did you leave the back door unlocked? just checking" },
        { filename: 'Voice 005', audioSrc: window.ASSETS.ashley_car, idle: '[Tap to play]', reveal: "ASHLEY: i saw that car outside again. thought it was you for a second. text me when you're back." },
        { filename: 'Voice 006', audioSrc: window.ASSETS.ashley_counter, idle: '[Tap to play]', reveal: "ASHLEY: left your stuff by the counter. call me later." },
        { filename: 'Voice 007', audioSrc: window.ASSETS.ashley_missing, idle: '[Tap to play]', reveal: "ASHLEY: hey... you haven't picked up all day. is everything okay?" },
        { filename: 'Voice 008', audioSrc: window.ASSETS.ashley_heading_over, idle: '[Tap to play]', reveal: "ASHLEY: i'm heading over now. don't go anywhere." }
    ],
    notes: [
        {
            title: "grocery / door stuff",
            date: "Edited 2d ago",
            body: "eggs\noat milk\nthe good bread not the cheap one\nfront door code is still 0417 til landlord changes it"
        },
        {
            title: "",
            date: "Edited 6h ago",
            body: "leo i dont even know how to say this without it sounding\n\nok starting over\n\nmarcus if ur reading this instead i need you to und"
        },
        {
            title: "wifi / random",
            date: "Edited 1w ago",
            body: "lake house wifi: SunsetDock22\n\nwhy do i always forget this"
        }
    ],
    hintText: 'check the timestamp on the dock photo against her last text',
    vault: {
        code: '2214',
        partial: "You found the ticket, but it's too late. She's gone.",
        full: "Sarah played them both. She used Leo's card to buy the ticket and used Ashley as a distraction. She left her phone on a boat at 22:14 and she's already at the airport. She won."
    }
};
