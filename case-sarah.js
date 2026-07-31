/* ============================================================
   CASE FILE: "THE LAKE HOUSE" (Sarah)
   This is the ONLY file you touch to write a new episode.
   Copy this file, rename it (case-<name>.js), edit the content
   below, and swap the <script> tag in index.html to load it.
   ============================================================ */

window.CASE = {
    apps: ['chats', 'gallery', 'map', 'memos', 'vault'],

    chats: [
        { u: 'SARAH',   t: "I'm at the dock. Leo doesn't know." },
        { u: 'UNKNOWN', t: "He knows. Check the Fit Check photo. He's in the mirror." },
        { u: 'SARAH',   t: "Wait... if he's in the house, who is Ashley with?" },
        { u: 'UNKNOWN', t: "Ashley isn't at the lake, Sarah. She never was." }
    ],

    gallery: [
        {
            img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
            metadata: "Taken at 10:00 PM. High-res zoom reveals Leo in the background — but he's not looking at Sarah. He's looking at Marcus."
        },
        {
            img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
            metadata: "No unusual details. Just the lake at dusk. Sarah captioned it 'last night here for a while.'"
        },
        {
            img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38',
            metadata: "Sarah is holding a plane ticket. The destination is obscured, but the date is today."
        }
    ],

    map: [
        { t: '11:00 PM', l: 'Main House',  d: 'Toast recorded.' },
        { t: '01:00 AM', l: 'Guest Room',  d: 'Sarah realized she was being watched.' },
        { t: '02:14 AM', l: 'The Dock',    d: 'SIGNAL LOST.' }
    ],

    memos: [
        {
            filename: '02:14_DOCK_AMBIENT.WAV',
            idleText: '[WIND AND STATIC]',
            revealText: "LEO: 'Sarah? I know you're here. Let's talk about the money.'",
            revealThreshold: 70,
            audioSrc: null
        }
    ],

    vault: {
        prompt: 'RECOVERY KEY REQUIRED (4-DIGIT DOCK TIME)',
        code: '0214',
        revealText: "Leo didn't find Sarah. Sarah found Leo. The person in the mirror wasn't Leo — it was the investigator Sarah hired to fake her own death. Leo is at the dock because he's trying to stop her from leaving with the money. But look at the GPS: Sarah's phone is at the dock, but her car just crossed the bridge. She left the phone behind to lead him there. Ashley was never part of it. But someone paid for that plane ticket — and it wasn't Sarah's card."
    },

    liveIntrusion: {
        trigger: 'after_first_app_open',
        message: "ASHLEY: Where are you?? Leo just left the bar and he looks furious.",
        displaySeconds: 7
    }
};
