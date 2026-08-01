const engine = {
    sessionCount: parseInt(localStorage.getItem('gd_sessions') || 0),
    battery: 18,
    startTime: parseInt(localStorage.getItem('gd_start_time')) || Date.now(),
    discovered: new Set(JSON.parse(localStorage.getItem('gd_discovered') || '[]')),
    isBooted: false,
    currentApp: null,
    hintFired: false,
    bannerFired: false,
    lastAction: Date.now(),
    navStack: [],
    currentView: null,
    shutdown: false,
    vaultLocked: false
};
if (!localStorage.getItem('gd_start_time')) {
    localStorage.setItem('gd_start_time', engine.startTime);
}
localStorage.setItem('gd_sessions', engine.sessionCount + 1);

function saveProgress() {
    localStorage.setItem('gd_discovered', JSON.stringify([...engine.discovered]));
    localStorage.setItem('gd_last_seen', Date.now());
}

function markDiscovered(key) {
    engine.discovered.add(key);
    saveProgress();
}

function initLockScreen() {
    const lastSeen = parseInt(localStorage.getItem('gd_last_seen') || 0);
    const gapMs = lastSeen ? Date.now() - lastSeen : 0;
    const longGap = gapMs > 1000 * 60 * 10;

    const bannerEl = document.getElementById('lock-banner');
    if (bannerEl) {
        if (longGap && lastSeen) {
            bannerEl.innerHTML = `<div class="lock-banner-h">Messages</div><div class="lock-banner-b">1 new message · just now</div>`;
            bannerEl.classList.add('active');
        } else {
            bannerEl.classList.remove('active');
        }
    }

    const statusEl = document.getElementById('boot-status');
    if (statusEl) {
        statusEl.textContent = longGap && lastSeen
            ? 'Restoring from iCloud... (backup resumed)'
            : 'Restoring from iCloud...';
    }
}

function startSystem() {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('os-shell').classList.remove('hidden');
    const bg = document.getElementById('bg-music');
    if (bg) { bg.volume = 0.3; bg.play().catch(()=>{}); }
    renderIcons();
    updateClock();
    setInterval(updateClock, 1000);
    startStuckCheck();
    setInterval(saveProgress, 10000);
    saveProgress();
}

function updateClock() {
    if (engine.shutdown) return;
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const elapsed = (Date.now() - engine.startTime) / 1000;
    engine.battery = Math.max(0, 18 - Math.floor(elapsed / 25));
    const levelEl = document.getElementById('battery-level');
    if (levelEl) levelEl.style.width = engine.battery + '%';

    if (engine.battery <= 5) {
        document.getElementById('battery-icon')?.classList.add('critical');
    }

    if (engine.battery <= 0 && !engine.shutdown) {
        triggerShutdown();
    }
}

function triggerShutdown() {
    engine.shutdown = true;
    const bg = document.getElementById('bg-music');
    if (bg) { bg.pause(); }
    document.body.classList.add('shutdown-active');
    setTimeout(() => {
        document.getElementById('os-shell').innerHTML = `
            <div class="shutdown-screen">
                <div class="shutdown-msg">iPhone</div>
            </div>`;
    }, 900);
}

function renderIcons() {
    const grid = document.getElementById('icon-grid');
    const meta = {
        chats: { i: '💬', l: 'Messages' },
        gallery: { i: '📷', l: 'Photos' },
        map: { i: '🗺️', l: 'Maps' },
        memos: { i: '🎙️', l: 'Voice Memos' },
        notes: { i: '📝', l: 'Notes' },
        phone: { i: '📞', l: 'Phone' }
    };
    grid.innerHTML = window.CASE.apps.map(id => `
        <div class="icon" onclick="openApp('${id}')">
            ${id === window.CASE.freshApp ? '<div class="badge"></div>' : ''}
            <div class="app-icon">${meta[id].i}</div>
            <span>${meta[id].l}</span>
        </div>
    `).join('');
}

function pushView(view) {
    if (engine.currentView) engine.navStack.push(engine.currentView);
    engine.currentView = view;
}

function goBack() {
    engine.lastAction = Date.now();
    const prev = engine.navStack.pop();
    if (!prev) { goHome(); return; }
    engine.currentView = null;
    renderView(prev, { fromBack: true });
}

function goHome() {
    document.getElementById('app-window').classList.add('hidden');
    engine.navStack = [];
    engine.currentView = null;
    engine.currentApp = null;
}

function renderView(view, opts) {
    opts = opts || {};
    const win = document.getElementById('app-window');
    const body = document.getElementById('app-body');
    const title = document.getElementById('window-title');
    win.classList.remove('hidden');

    const appTitles = { chats: 'Messages', gallery: 'Photos', map: 'Maps', memos: 'Voice Memos', notes: 'Notes', phone: 'Phone' };

    if (!opts.fromBack) pushView(view);
    else engine.currentView = view;

    title.innerText = view.title || appTitles[view.app] || 'App';

    if (view.app === 'chats' && view.mode === 'inbox') renderChatsInbox(body);
    if (view.app === 'chats' && view.mode === 'thread') renderChatThread(body, view.threadId);
    if (view.app === 'gallery' && view.mode === 'grid') renderGallery(body);
    if (view.app === 'gallery' && view.mode === 'detail') renderPhotoDetail(body, view.index);
    if (view.app === 'map' && !view.mode) renderMap(body);
    if (view.app === 'map' && view.mode === 'pin') renderMapPin(body, view.index);
    if (view.app === 'memos' && view.mode === 'list') renderMemos(body);
    if (view.app === 'memos' && view.mode === 'detail') renderMemoDetail(body, view.index);
    if (view.app === 'notes' && view.mode === 'list') renderNotesList(body);
    if (view.app === 'notes' && view.mode === 'detail') renderNoteDetail(body, view.index);
    if (view.app === 'notes' && view.mode === 'vault') renderVault(body);
    if (view.app === 'phone') renderPhone(body);
}

function openApp(id) {
    engine.currentApp = id;
    engine.lastAction = Date.now();
    engine.navStack = [];
    engine.currentView = null;

    if (id === 'chats') renderView({ app: 'chats', mode: 'inbox' });
    if (id === 'gallery') renderView({ app: 'gallery', mode: 'grid' });
    if (id === 'map') renderView({ app: 'map' });
    if (id === 'memos') renderView({ app: 'memos', mode: 'list' });
    if (id === 'notes') renderView({ app: 'notes', mode: 'list' });
    if (id === 'phone') renderView({ app: 'phone' });
}

function deepLink(target) {
    document.getElementById('notification-center').innerHTML = '';
    engine.navStack = [];
    engine.currentView = null;
    renderView(target);
}

function showNotification(title, body, onTap) {
    const center = document.getElementById('notification-center');
    const el = document.createElement('div');
    el.className = 'notif';
    el.innerHTML = `<div class="notif-h">${title}</div><div class="notif-b">${body}</div>`;
    if (onTap) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
            engine.lastAction = Date.now();
            onTap();
        });
    }
    center.appendChild(el);
    requestAnimationFrame(() => el.classList.add('active'));
    setTimeout(() => {
        el.classList.remove('active');
        setTimeout(() => el.remove(), 500);
    }, 7000);
}

function startStuckCheck() {
    setInterval(() => {
        if (engine.shutdown) return;
        const idle = Date.now() - (engine.lastAction || engine.startTime);
        const elapsed = Date.now() - engine.startTime;

        if (idle > 30000) {
            document.body.classList.add('glitch-active');
            setTimeout(() => document.body.classList.remove('glitch-active'), 300);
            const tension = document.getElementById('sfx-tension');
            if (tension) tension.play().catch(()=>{});
        }

        if (elapsed > 45000 && !engine.bannerFired) {
            engine.bannerFired = true;
            showNotification('Messages', 'Unknown Number: he knows you\'re still here.', () => {
                deepLink({ app: 'chats', mode: 'thread', threadId: 'unknown' });
            });
        }

        if (idle > 60000 && !engine.hintFired) {
            engine.hintFired = true;
            const target = nextUnexaminedClue();
            showNotification('iCloud', window.CASE.hintText || "Something on this phone doesn't add up yet.", () => {
                if (target) deepLink(target);
            });
        }
    }, 5000);
}

function nextUnexaminedClue() {
    for (let i = 0; i < window.CASE.gallery.length; i++) {
        if (!engine.discovered.has('photo-' + i)) {
            return { app: 'gallery', mode: 'detail', index: i };
        }
    }
    for (let i = 0; i < window.CASE.memos.length; i++) {
        if (!engine.discovered.has('memo-' + i)) {
            return { app: 'memos', mode: 'detail', index: i };
        }
    }
    return { app: 'notes', mode: 'list' };
}

function renderChatsInbox(body) {
    body.innerHTML = window.CASE.threads.map(th => `
        <div class="inbox-row" onclick='renderView({app:"chats", mode:"thread", threadId:"${th.id}"})'>
            <div class="inbox-avatar">${th.avatar || th.name[0]}</div>
            <div class="inbox-meta">
                <div class="inbox-name">${th.name}</div>
                <div class="inbox-preview">${th.preview}</div>
            </div>
            <div class="inbox-time">${th.lastTime}</div>
            ${engine.discovered.has('thread-' + th.id) ? '' : '<div class="unread-dot"></div>'}
        </div>
    `).join('');
}

function renderChatThread(body, threadId) {
    const thread = window.CASE.threads.find(t => t.id === threadId);
    if (!thread) { body.innerHTML = ''; return; }
    markDiscovered('thread-' + threadId);
    body.innerHTML = thread.messages.map(m => `
        <div class="chat-bubble ${m.self ? 'self' : ''} ${m.kind || ''}">
            <div class="chat-meta">${m.u} • ${m.t}</div>
            <div class="chat-text">${m.msg}</div>
        </div>
    `).join('');
}

function renderGallery(body) {
    body.innerHTML = `<div class="gallery-grid">
        ${window.CASE.gallery.map((it, i) => `<div class="gallery-cell"><img src="${it.img}" onclick='renderView({app:"gallery", mode:"detail", index:${i}})'>${engine.discovered.has('photo-' + i) ? '<div class="seen-check">✓</div>' : ''}</div>`).join('')}
    </div>`;
}

function renderPhotoDetail(body, i) {
    markDiscovered('photo-' + i);
    const item = window.CASE.gallery[i];
    body.innerHTML = `
        <div class="metadata-view">
            <img src="${item.img}">
            <div class="exif-data">
                <div class="exif-row"><span>Device</span><span>${item.exif.device}</span></div>
                <div class="exif-row"><span>Date</span><span>${item.exif.date}</span></div>
                <div class="exif-row"><span>ISO</span><span>${item.exif.iso}</span></div>
                <div class="exif-row"><span>Shutter</span><span>${item.exif.shutter}</span></div>
                <div class="exif-row"><span>Dimensions</span><span>${item.exif.dims}</span></div>
                <div class="exif-row"><span>Coordinates</span><span>${item.exif.coords}</span></div>
            </div>
        </div>
    `;
}

function renderMap(body) {
    body.innerHTML = `<div class="map-pins">` + window.CASE.map.map((m, i) => `
        <div class="map-row" onclick='renderView({app:"map", mode:"pin", index:${i}})'>
            <div style="font-size:11px; color:#555">${m.t}</div>
            <div style="font-weight:600; margin:4px 0">${m.l}</div>
            <div style="font-size:12px; color:#888">${m.d}</div>
        </div>`).join('') + `</div>`;
}

function renderMapPin(body, i) {
    const m = window.CASE.map[i];
    markDiscovered('pin-' + i);
    body.innerHTML = `
        <div class="pin-detail">
            <div class="pin-map-fake"><div class="pin-dot"></div></div>
            <div class="pin-coords">${m.coords || 'coordinates unavailable'}</div>
            <div class="pin-label">${m.l}</div>
            <div class="pin-desc">${m.d}</div>
        </div>`;
}

function renderMemos(body) {
    body.innerHTML = window.CASE.memos.map((m, i) => `
        <div class="memo-row" onclick='renderView({app:"memos", mode:"detail", index:${i}})'>
            <span style="font-size:14px; color:#ccc;">${m.filename}</span>
            <span style="font-size:11px; color:#555;">${engine.discovered.has('memo-' + i) ? '✓' : '›'}</span>
        </div>
    `).join('');
}

function renderMemoDetail(body, i) {
    engine.currentMemo = i;
    markDiscovered('memo-' + i);
    const m = window.CASE.memos[i];
    body.innerHTML = `<div style="text-align:center; padding-top:40px;">
        <audio id="memo-audio" src="${m.audioSrc}" preload="metadata"></audio>
        <div style="height:3px; background:#222; width:100%; position:relative; margin-bottom:20px"><div id="m-progress" style="height:100%; width:0%; background:#00ffcc;"></div>
        <input type="range" min="0" max="100" value="0" style="width:100%; position:absolute; left:0; top:0; opacity:0;" oninput="scrub(this.value)"></div>
        <p id="m-sub" style="color:#444; font-style:italic;">${m.idle}</p>
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

function renderNotesList(body) {
    body.innerHTML = window.CASE.notes.map((n, i) => `
        <div class="note-row" onclick='renderView({app:"notes", mode:"detail", index:${i}})'>
            <div class="note-title">${n.locked ? '🔒 ' : ''}${n.title || '(no title)'}</div>
            <div class="note-date">${n.date}</div>
        </div>
    `).join('');
}

function renderNoteDetail(body, i) {
    const n = window.CASE.notes[i];
    if (n.locked) {
        renderView({ app: 'notes', mode: 'vault', title: n.title });
        return;
    }
    markDiscovered('note-' + i);
    body.innerHTML = `
        <div style="font-size:11px; color:#555;">${n.date}</div>
        <div style="font-weight:600; margin:8px 0;">${n.title || '(no title)'}</div>
        <div style="font-size:14px; color:#ccc; white-space:pre-wrap;">${n.body}</div>
    `;
}

function engagementMet() {
    let count = 0;
    for (const key of engine.discovered) {
        if (key.startsWith('photo-') || key.startsWith('memo-')) count++;
    }
    return count >= 3;
}

function renderVault(body) {
    body.innerHTML = `
        <div class="vault-wrap">
            <p style="font-size:13px; color:#666;">Enter Passcode</p>
            <input type="tel" id="vault-input" maxlength="4" oninput="checkVault(this)">
            <p id="vault-gate-msg" style="font-size:11px; color:#444; margin-top:20px;">${engagementMet() ? '' : 'Some things on this phone still don\'t add up.'}</p>
        </div>
    `;
}

function checkVault(el) {
    if (el.value.length < 4) return;
    if (engine.vaultLocked) { el.value = ''; return; }

    if (el.value === window.CASE.vault.code) {
        renderEnding(engagementMet());
    } else {
        el.value = '';
        el.classList.add('shake');
        document.body.classList.add('flash-red');
        engine.vaultLocked = true;
        setTimeout(() => el.classList.remove('shake'), 400);
        setTimeout(() => document.body.classList.remove('flash-red'), 200);
        setTimeout(() => { engine.vaultLocked = false; }, 10000);
    }
}

function renderEnding(deep) {
    const body = document.getElementById('app-body');
    if (!deep) {
        body.innerHTML = `<div class="ending-basic">${window.CASE.vault.partial}</div>`;
        return;
    }
    body.innerHTML = window.CASE.vault.artifactHtml || `<div class="ending-basic">${window.CASE.vault.full}</div>`;
}

function renderPhone(body) {
    body.innerHTML = `<div class="call-log">` + (window.CASE.calls || []).map(c => `
        <div class="call-row ${c.missed ? 'missed' : ''}">
            <div class="call-name">${c.name}</div>
            <div class="call-meta">${c.missed ? 'Missed Call' : 'Call'} · ${c.t}</div>
        </div>`).join('') + `</div>`;
}
