window.CASE = {
    apps: ['chats', 'gallery', 'map', 'memos', 'notes', 'phone'],
    freshApp: 'chats',

    threads: [
        {
            id: 'mom',
            name: 'Mom',
            avatar: 'M',
            lastTime: '14:25',
            preview: 'leo called he said he left his card with u...',
            messages: [
                { u: 'Mom', t: '09:14', msg: 'did u take the chicken out' },
                { u: 'SARAH', t: '09:45', msg: 'omg ok taking it out now', self: true, kind: 'imsg' },
                { u: 'Mom', t: '14:20', msg: 'did u get the chicken out of the freezer??' },
                { u: 'SARAH', t: '14:22', msg: 'not yet omw home now', self: true, kind: 'imsg' },
                { u: 'Mom', t: '14:25', msg: 'leo called he said he left his card with u. the gold one ending in 9902? let him know.' },
                { u: 'SARAH', t: '14:26', msg: 'ugh fine ill tell him', self: true, kind: 'imsg' },
                { u: 'Mom', t: '21:40', msg: 'you still at the lake house? call me when u see this' },
                { u: 'Mom', t: '23:58', msg: 'sarah its almost midnight please call me back' }
            ]
        },
        {
            id: 'jake',
            name: 'Jake (Work)',
            avatar: 'J',
            lastTime: '18:11',
            preview: 'locked myself out again lol can u bring it thurs',
            messages: [
                { u: 'Jake (Work)', t: '11:02', msg: "hey can u cover my closing shift thurs" },
                { u: 'SARAH', t: '11:15', msg: 'yeah should be fine', self: true, kind: 'sms' },
                { u: 'Jake (Work)', t: '18:11', msg: "locked myself out again lol can u bring it thurs" },
                { u: 'SARAH', t: '18:20', msg: 'bring what', self: true, kind: 'sms' },
                { u: 'Jake (Work)', t: '18:22', msg: "the spare key u have from when i watched ur cat lol" }
            ]
        },
        {
            id: 'lakehouse',
            name: 'the lake house 🏡',
            avatar: '🏡',
            lastTime: '20:02',
            preview: 'Ashley: did anyone else hear that',
            messages: [
                { u: 'Ashley', t: '19:40', msg: 'did you leave the back door unlocked? just checking' },
                { u: 'Priya', t: '19:44', msg: 'lmaooo sarah probably forgot again' },
                { u: 'SARAH', t: '19:50', msg: 'i did not!! it was like that when i got here', self: true, kind: 'sms' },
                { u: 'Ashley', t: '20:02', msg: 'did anyone else hear that' },
                { u: 'Priya', t: '20:03', msg: 'hear what' },
                { u: 'Ashley', t: '20:03', msg: 'nvm probably just the dock' }
            ]
        },
        {
            id: 'unknown',
            name: 'Unknown Number',
            avatar: '?',
            lastTime: '22:07',
            preview: "ashleys phone is in the city. u r alone. get out.",
            messages: [
                { u: 'Unknown Number', t: '22:05', msg: 'hes not at the bar sarah. look at the mirror in that pic u took.' },
                { u: 'SARAH', t: '22:06', msg: 'wait what? hes at the lake house with ashley', self: true, kind: 'sms' },
                { u: 'Unknown Number', t: '22:07', msg: 'ashleys phone is in the city. u r alone. get out.' },
                { u: 'SARAH', t: '22:07', msg: 'who is this', self: true, kind: 'sms' },
                { u: 'Unknown Number', t: '22:09', msg: 'check the boarding pass screenshot. departure time. thats not a coincidence.' }
            ]
        }
    ],

    calls: [
        { name: 'Ashley', t: '19:58 PM', missed: false },
        { name: 'Leo', t: '21:12 PM', missed: true },
        { name: 'Leo', t: '21:14 PM', missed: true },
        { name: 'Unknown Number', t: '21:47 PM', missed: true },
        { name: 'Leo', t: '22:03 PM', missed: true }
    ],

    gallery: [
        {
            img: window.ASSETS.coffee_photo,
            exif: { device: 'iPhone 14', date: 'Jun 12, 2026, 8:14 AM', iso: 'ISO 100', shutter: '1/120s', dims: '4032×3024', coords: '40.7128° N, 74.0060° W' }
        },
        {
            img: window.ASSETS.spotify_photo,
            exif: { device: 'iPhone 14 (Screenshot)', date: 'Jun 10, 2026, 6:32 PM', iso: 'N/A', shutter: 'N/A', dims: '1170×2532', coords: 'N/A' }
        },
        {
            img: window.ASSETS.rain_photo,
            exif: { device: 'iPhone 14', date: 'Jun 9, 2026, 4:50 PM', iso: 'ISO 400', shutter: '1/60s', dims: '4032×3024', coords: '43.9891° N, 74.5762° W' }
        },
        {
            img: window.ASSETS.mirror_photo,
            exif: { device: 'iPhone 14', date: 'Jun 14, 2026, 9:00 PM', iso: 'ISO 800', shutter: '1/30s', dims: '3024×4032', coords: '43.9902° N, 74.5771° W' }
        },
        {
            img: window.ASSETS.dock_photo,
            exif: { device: 'iPhone 14', date: 'Jun 14, 2026, 9:52 PM', iso: 'ISO 1600', shutter: '1/15s', dims: '4032×3024', coords: '43.9915° N, 74.5788° W' }
        },
        {
            img: window.ASSETS.ticket_photo,
            exif: { device: 'iPhone 14 (Screenshot)', date: 'Jun 14, 2026, 10:14 PM', iso: 'N/A', shutter: 'N/A', dims: '1170×2532', coords: 'N/A' }
        }
    ],

    map: [
        { t: '21:00', l: 'Main House', d: 'Stationary for 14m', coords: '43.9891° N, 74.5762° W' },
        { t: '22:14', l: 'The Dock', d: 'Signal Lost. Last speed: 12mph', coords: '43.9915° N, 74.5788° W' }
    ],

    memos: [
        { filename: 'Dock - 0:41', audioSrc: window.ASSETS.sarah_dock, idle: '[Tap to play]', reveal: "SARAH: (whispering) hey... don't call me back. just... check the folder. the timestamp on the dock photo, that's the key. i gotta go." },
        { filename: 'Main House - 21:52', audioSrc: window.ASSETS.sarah_backroad, idle: '[Tap to play]', reveal: "SARAH: he thinks i'm still in the house. i'm taking the back road... if i don't message you by two, just delete the backup." },
        { filename: 'Unknown Location - 22:10', audioSrc: window.ASSETS.sarah_forensic, idle: '[Tap to play]', reveal: "SARAH: if you're listening to this... i didn't make it to the boat. look at the file details, not the picture." },
        { filename: 'Main House - 19:41', audioSrc: window.ASSETS.ashley_door, idle: '[Tap to play]', reveal: "ASHLEY: did you leave the back door unlocked? just checking" },
        { filename: 'Main House - 20:04', audioSrc: window.ASSETS.ashley_car, idle: '[Tap to play]', reveal: "ASHLEY: i saw that car outside again. thought it was you for a second. text me when you're back." },
        { filename: 'Kitchen - 20:30', audioSrc: window.ASSETS.ashley_counter, idle: '[Tap to play]', reveal: "ASHLEY: left your stuff by the counter. call me later." },
        { filename: 'Main House - 22:40', audioSrc: window.ASSETS.ashley_missing, idle: '[Tap to play]', reveal: "ASHLEY: hey... you haven't picked up all day. is everything okay?" },
        { filename: 'Main House - 23:15', audioSrc: window.ASSETS.ashley_heading_over, idle: '[Tap to play]', reveal: "ASHLEY: i'm heading over now. don't go anywhere." }
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
        },
        {
            title: "options (draft, don't send)",
            date: "Edited 4h ago",
            body: "1. tell ashley everything and stay\n2. take the card, don't tell anyone, be at the airport by 11\n3. wait it out, see if he actually shows tonight\n\nim leaning 2 and i hate that"
        },
        {
            title: "to jake, unsent",
            date: "Edited 3h ago",
            body: "jake if you get this and i never explained the shift thing, im sorry, something came up that i cant really\n\ndelete this"
        },
        {
            title: "passcodes",
            date: "Edited just now",
            locked: true
        }
    ],

    hintText: 'check the timestamp on the dock photo against her last text',

    vault: {
        code: '2214',
        partial: "You found the ticket, but it's too late. She's gone.",
        full: "Sarah played them both. She used Leo's card to buy the ticket and used Ashley as a distraction. She left her phone on a boat at 22:14 and she's already at the airport. She won.",
        artifactHtml: `
            <div class="artifact-board">
                <div class="artifact-header">DEPARTURES — INTL TERMINAL</div>
                <div class="artifact-row"><span>FLIGHT</span><span>AA 2214</span></div>
                <div class="artifact-row"><span>PASSENGER</span><span>S. WALSH</span></div>
                <div class="artifact-row"><span>STATUS</span><span class="artifact-status">CHECKED IN — 22:41</span></div>
                <div class="artifact-row"><span>GATE</span><span>C14</span></div>
                <div class="artifact-row"><span>PAYMENT</span><span>CARD ****9902</span></div>
                <div class="artifact-footnote">Check-in timestamp is 27 minutes after last recorded phone signal at The Dock.</div>
            </div>
        `
    }
};
