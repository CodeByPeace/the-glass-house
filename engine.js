const engine = {
    sessionCount: parseInt(localStorage.getItem('gd_sessions') || 0),
    battery: 84,
    startTime: Date.now(),
    discovered: new Set(),
    isBooted: false,
    currentApp: null,
    hintFired: false
};
localStorage.setItem('gd_sessions', engine.sessionCount + 1);

function startSystem() {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('os-shell').classList.remove('hidden');
    const bg = document.getElementById('bg-music');
    if (bg) { bg.volume = 0.3; bg.play().catch(()=>{}); }
    renderIcons();
    updateClock();
    setInterval(updateClock, 1000);
    startStuckCheck();
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const elapsed = (Date.now() - engine.startTime) / 1000;
    engine.battery = Math.max(0, 84 - Math.floor(elapsed / 15));
    document.getElementById('battery-level').style.width = engine.battery + '%';
}

function renderIcons() {
    const grid = document.getElementById('icon-grid');
    const meta = {
        chats: { i: '💬', l: 'Messages' },
        gallery: { i: '📷', l: 'Photos' },
        map: { i: '🗺️', l: 'Maps' },
        memos: { i: '🎙️', l: 'Voice Memos' },
        vault: { i: '🔒', l: 'Note' },
        notes: { i: '📝', l: 'Notes' }
    };
    grid.innerHTML = window.CASE.apps.map(id => `
        <div class="icon" onclick="openApp('${id}')">
            ${id === window.CASE.freshApp ? '<div class="badge"></div>' : ''}
            <div class="app-icon">${id === 'gallery' ? '📷' : meta[id].i}</div>
            <span>${meta[id].l}</span>
        </div>
    `).join('');
}

function openApp(id) {
    engine.currentApp = id;
    engine.lastAction = Date.now();
    const win = document.getElementById('app-window');
    const body = document.getElementById('app-body');
    const title = document.getElementById('window-title');
    win.classList.remove('hidden');

    const appTitles = { chats: 'Messages', gallery: 'Photos', map: 'Maps', memos: 'Voice Memos', notes: 'Notes', vault: 'Note' };
    title.innerText = appTitles[id] || 'App';

    if (id === 'chats') renderChats(body);
    if (id === 'gallery') renderGallery(body);
    if (id === 'map') renderMap(body);
    if (id === 'memos') renderMemos(body);
    if (id === 'vault') renderVault(body);
    if (id === 'notes') renderNotes(body);
}

function renderChats(body) {
    body.innerHTML = window.CASE.chats.map(m => `
        <div class="chat-bubble ${m.u === 'SARAH' ? 'self' : ''}">
            <div class="chat-meta">${m.u} • ${m.t}</div>
            <div class="chat-text">${m.msg}</div>
        </div>
    `).join('');
}

function renderGallery(body) {
    body.innerHTML = `<div class="gallery-grid">
        ${window.CASE.gallery.map((it, i) => `<img src="${it.img}" onclick="viewPhoto(${i})">`).join('')}
    </div>`;
}

function viewPhoto(i) {
    engine.discovered.add(i);
    const item = window.CASE.gallery[i];
    const body = document.getElementById('app-body');
    body.innerHTML = `
        <div class="metadata-view">
            <img src="${item.img}">
            <div class="exif-data">
                <div class="exif-row"><span>Date</span><span>${item.exif.date}</span></div>
                <div class="exif-row"><span>Location</span><span>${item.exif.loc}</span></div>
                <hr style="border:none; border-top:1px solid #111; margin: 15px 0;">
                <p style="font-size:14px; color:#ccc;">${item.desc}</p>
            </div>
            <button class="back-btn" onclick="openApp('gallery')" style="margin-top:20px; width:100%; border:1px solid #333; padding:12px; background:#111; color:white; border-radius:10px;">Done</button>
        </div>
    `;
}

function goHome() { document.getElementById('app-window').classList.add('hidden'); }
function showNotification(title, body) {
    const center = document.getElementById('notification-center');
    const el = document.createElement('div');
    el.className = 'notif';
    el.innerHTML = `<div class="notif-h">${title}</div><div class="notif-b">${body}</div>`;
    center.appendChild(el);
    requestAnimationFrame(() => el.classList.add('active'));
    setTimeout(() => {
        el.classList.remove('active');
        setTimeout(() => el.remove(), 500);
    }, 6000);
}
function startStuckCheck() {
    setInterval(() => {
        const idle = Date.now() - (engine.lastAction || engine.startTime);
        if (idle > 90000) {
            document.body.classList.add('glitch-active');
            setTimeout(()=>document.body.classList.remove('glitch-active'), 300);
        }
        if (idle > 180000 && !engine.hintFired) {
            engine.hintFired = true;
            showNotification('iCloud', window.CASE.hintText || "Something on this phone doesn't add up yet.");
        }
    }, 10000);
}

function renderVault(body) {
    body.innerHTML = `
        <div class="vault-wrap">
            <p style="font-size:13px; color:#666;">Enter Password</p>
            <input type="tel" id="vault-input" maxlength="4" style="background:none; border:none; border-bottom:2px solid #333; color:white; font-size:32px; text-align:center; width:120px; outline:none; letter-spacing:8px;" oninput="checkVault(this)">
        </div>
    `;
}

function checkVault(el) {
    if (el.value.length < 4) return;
    if (el.value === window.CASE.vault.code) {
        const reveal = (engine.discovered.size / window.CASE.gallery.length) >= 0.6 ? window.CASE.vault.full : window.CASE.vault.partial;
        document.getElementById('app-body').innerHTML = `<div style="font-size:15px; line-height:1.6; color:#eee">${reveal}</div>`;
    } else {
        el.value = '';
        el.classList.add('shake');
        setTimeout(()=>el.classList.remove('shake'), 400);
    }
}
function renderMap(body) {
    body.innerHTML = window.CASE.map.map(m => `<div style="margin-bottom:20px; padding-bottom:10px; border-bottom:1px solid #111">
        <div style="font-size:11px; color:#555">${m.t}</div>
        <div style="font-weight:600; margin:4px 0">${m.l}</div>
        <div style="font-size:12px; color:#888">${m.d}</div>
    </div>`).join('');
}
function renderMemos(body) {
    body.innerHTML = window.CASE.memos.map((m, i) => `
        <div style="padding:14px 0; border-bottom:1px solid #111; display:flex; justify-content:space-between; align-items:center;" onclick="openMemo(${i})">
            <span style="font-size:14px; color:#ccc;">${m.filename}</span>
            <span style="font-size:11px; color:#555;">›</span>
        </div>
    `).join('');
}
function openMemo(i) {
    engine.currentMemo = i;
    const m = window.CASE.memos[i];
    const body = document.getElementById('app-body');
    body.innerHTML = `<div style="text-align:center; padding-top:40px;">
        <audio id="memo-audio" src="${m.audioSrc}" preload="metadata"></audio>
        <div style="height:3px; background:#222; width:100%; position:relative; margin-bottom:20px"><div id="m-progress" style="height:100%; width:0%; background:#00ffcc;"></div>
        <input type="range" min="0" max="100" value="0" style="width:100%; position:absolute; left:0; top:0; opacity:0;" oninput="scrub(this.value)"></div>
        <p id="m-sub" style="color:#444; font-style:italic;">${m.idle}</p>
        <button class="back-btn" onclick="openApp('memos')" style="margin-top:30px; width:80%; border:1px solid #333; padding:12px; background:#111; color:white; border-radius:10px;">Done</button>
    </div>`;
}
function scrub(v) {
    const m = window.CASE.memos[engine.currentMemo];
    const audio = document.getElementById('memo-audio');
    document.getElementById('m-progress').style.width = v + '%';
    if (audio.duration) {
        audio.currentTime = (v / 100) * audio.duration;
        audio.play().catch(()=>{});
    }
    document.getElementById('m-sub').innerText = (v > 70) ? m.reveal : m.idle;
    document.getElementById('m-sub').style.color = (v > 70) ? '#00ffcc' : '#444';
}
function renderNotes(body) {
    body.innerHTML = window.CASE.notes.map(n => `
        <div style="margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #111;">
            <div style="font-size:11px; color:#555;">${n.date}</div>
            ${n.title ? `<div style="font-weight:600; margin:4px 0;">${n.title}</div>` : ''}
            <div style="font-size:14px; color:#ccc; white-space:pre-wrap;">${n.body}</div>
        </div>
    `).join('');
}
