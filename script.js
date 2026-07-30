const state = { unlocked: false, progress: 0 };

const data = {
    chats: [
        {u: "SARAH", t: "I'm at the dock. Leo doesn't know."},
        {u: "UNKNOWN", t: "He knows. Check the Fit Check photo. He's in the mirror."},
        {u: "SARAH", t: "Wait... if he's in the house, who is Ashley with?"},
        {u: "UNKNOWN", t: "Ashley isn't at the lake, Sarah. She never was."}
    ],
    memos: [
        {time: "02:14 AM", text: "Heavy breathing... wind... 'Sarah, I can see you.'"}
    ],
    map: [
        {t: "11:00 PM", l: "Main House", d: "Toast recorded."},
        {t: "01:00 AM", l: "Guest Room", d: "Sarah realized she was being watched."},
        {t: "02:14 AM", l: "The Dock", d: "SIGNAL LOST."}
    ]
};

function startSystem() {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
    document.getElementById('bg-music').play();
    triggerLiveStory();
}

function openApp(app) {
    const overlay = document.getElementById('window-overlay');
    const body = document.getElementById('app-body');
    const title = document.getElementById('window-title');
    overlay.classList.remove('hidden');
    
    if (app === 'chats') {
        title.innerText = "ENCRYPTED_COMMS";
        body.innerHTML = data.chats.map(m => `<div class="chat-bubble"><strong>${m.u}</strong>${m.t}</div>`).join('');
    } else if (app === 'gallery') {
        title.innerText = "EVIDENCE_DUMP";
        body.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205" style="width:100%; border-radius:10px;" onclick="revealDetail(1)">
                <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70" style="width:100%; border-radius:10px;" onclick="revealDetail(2)">
                <img src="https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38" style="width:100%; border-radius:10px;" onclick="revealDetail(3)">
            </div>
            <p style="font-size:0.6rem; color:#444; margin-top:20px;">NOTE: Tap to inspect metadata.</p>
        `;
    } else if (app === 'map') {
        title.innerText = "GPS_TRACE";
        body.innerHTML = data.map.map(m => `
            <div style="margin-bottom:20px; border-bottom:1px solid #111; padding-bottom:10px;">
                <span style="color:var(--accent); font-size:0.6rem; font-family:'JetBrains Mono';">${m.t}</span>
                <p style="font-size:0.8rem; margin:5px 0;">${m.l}</p>
                <p style="font-size:0.6rem; color:#444;">${m.d}</p>
            </div>
        `).join('');
    } else if (app === 'memos') {
        title.innerText = "AUDIO_SURVEILLANCE";
        body.innerHTML = `
            <div class="audio-ui">
                <p style="font-size:0.7rem; color:#888;">02:14_DOCK_AMBIENT.WAV</p>
                <div class="scrubber" onclick="scrub(event)"><div class="scrubber-fill" id="fill"></div></div>
                <p id="audio-sub" style="font-style:italic; font-size:0.8rem; color:var(--accent);">[SILENCE]</p>
            </div>
        `;
    } else if (app === 'vault') {
        title.innerText = "FINAL_DISPOSITION";
        body.innerHTML = `
            <div style="text-align:center;">
                <p style="font-size:0.7rem; color:#444;">RECOVERY KEY REQUIRED (4-DIGIT DOCK TIME)</p>
                <input type="tel" maxlength="4" style="background:transparent; border:none; border-bottom:1px solid #222; color:var(--accent); font-size:2.5rem; text-align:center; width:100%; outline:none; margin-top:30px;" oninput="if(this.value==='0214')showFinal()">
                <div id="final-reveal" class="hidden" style="margin-top:30px; text-align:left; font-size:0.9rem; color:#888; line-height:1.6;">
                    <p><strong>CASE SUMMARY:</strong> Leo didn't find Sarah. Sarah found Leo. The person in the mirror wasn't Leo—it was the investigator Sarah hired to fake her own death. Leo is at the dock because he's trying to stop her from leaving with the money. But look at the GPS... Sarah's phone is at the dock, but her car just crossed the bridge. She left the phone behind to lead him there. Ashley was never part of it. Sarah is gone.</p>
                </div>
            </div>
        `;
    }
}

function revealDetail(id) {
    if(id === 1) alert("METADATA: Taken at 10:00 PM. High-res zoom reveals Leo in the background... but he's not looking at Sarah. He's looking at Marcus.");
    if(id === 3) alert("METADATA: Sarah is holding a plane ticket. The destination is obscured, but the date is today.");
}

function scrub(e) {
    const fill = document.getElementById('fill');
    const sub = document.getElementById('audio-sub');
    let x = e.offsetX;
    let w = (x / e.target.clientWidth) * 100;
    fill.style.width = w + '%';
    if(w > 70) sub.innerText = "LEO: 'Sarah? I know you're here. Let's talk about the money.'";
    else sub.innerText = "[WIND AND STATIC]";
}

function showFinal() {
    document.getElementById('final-reveal').classList.remove('hidden');
    document.querySelector('input').classList.add('hidden');
}

function triggerLiveStory() {
    setTimeout(() => {
        const n = document.getElementById('notif');
        document.getElementById('sfx-ping').play();
        document.getElementById('notif-msg').innerText = "ASHLEY: Where are you?? Leo just left the bar and he looks furious.";
        n.classList.remove('hidden');
        setTimeout(() => n.classList.add('hidden'), 7000);
    }, 15000);
}

function closeWindow() { document.getElementById('window-overlay').classList.add('hidden'); }
