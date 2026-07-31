/* ============================================================
   GHOST DRIVE ENGINE
   Generic OS-shell logic. Never edit this file to add a new case —
   add a new case-*.js file instead. See case-sarah.js for the
   reference structure every case must follow.
   ============================================================ */

const engineState = {
    booted: false,
    liveStoryFired: false,
    appsOpenedCount: 0,
    lastDiscoveryTime: null,
    stuckCheckStarted: false
};

function startSystem() {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
    document.getElementById('bg-music').play().catch(() => {});
    engineState.booted = true;
    renderIconGrid();
    startClock();
    scheduleLiveIntrusion();
}

function startClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    const tick = () => {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        clockEl.innerText = `${h}:${m} ${ampm}`;
    };
    tick();
    setInterval(tick, 30000);
}

const APP_META = {
    chats:  { icon: '💬', label: 'Chats' },
    gallery:{ icon: '🖼️', label: 'Gallery' },
    map:    { icon: '📍', label: 'Map' },
    memos:  { icon: '🎙️', label: 'Memos' },
    vault:  { icon: '🔒', label: 'Vault' },
    group:  { icon: '👥', label: 'Group Chat' }
};

function renderIconGrid() {
    const grid = document.getElementById('icon-grid');
    if (!grid || !window.CASE) return;
    const apps = window.CASE.apps || [];
    grid.innerHTML = apps.map(appId => {
        const meta = APP_META[appId] || { icon: '📁', label: appId };
        return `<div class="icon" onclick="openApp('${appId}')">
                    <div class="app-icon">${meta.icon}</div>
                    <span>${meta.label}</span>
                </div>`;
    }).join('');
}

function openApp(appId) {
    if (!window.CASE) return;
    engineState.appsOpenedCount++;

    const overlay = document.getElementById('window-overlay');
    const body = document.getElementById('app-body');
    const title = document.getElementById('window-title');
    overlay.classList.remove('hidden');

    const renderers = {
        chats: renderChats,
        gallery: renderGallery,
        map: renderMap,
        memos: renderMemos,
        vault: renderVault,
        group: renderGroupChat
    };

    const renderer = renderers[appId];
    if (!renderer) {
        title.innerText = 'UNKNOWN_APP';
        body.innerHTML = `<p style="color:#444;">This app has no case data yet.</p>`;
        return;
    }
    renderer(title, body);
}

function closeWindow() {
    document.getElementById('window-overlay').classList.add('hidden');
}

function renderChats(title, body) {
    title.innerText = 'ENCRYPTED_COMMS';
    const chats = window.CASE.chats || [];
    body.innerHTML = chats.map(m =>
        `<div class="chat-bubble"><strong>${m.u}</strong>${m.t}</div>`
    ).join('');
}

function renderGroupChat(title, body) {
    title.innerText = 'GROUP_CHAT';
    const msgs = (window.CASE.group && window.CASE.group.messages) || [];
    body.innerHTML = msgs.map(m =>
        `<div class="chat-bubble"><strong>${m.u}</strong>${m.t}</div>`
    ).join('');
}

function renderGallery(title, body) {
    title.innerText = 'EVIDENCE_DUMP';
    const items = window.CASE.gallery || [];
    body.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            ${items.map((it, i) =>
                `<img src="${it.img}" style="width:100%; border-radius:10px;" onclick="revealDetail(${i})">`
            ).join('')}
        </div>
        <p style="font-size:0.6rem; color:#444; margin-top:20px;">NOTE: Tap to inspect metadata.</p>
    `;
}

function revealDetail(index) {
    const items = window.CASE.gallery || [];
    const item = items[index];
    if (!item) return;
    const overlay = document.getElementById('window-overlay');
    const body = document.getElementById('app-body');
    const title = document.getElementById('window-title');
    overlay.classList.remove('hidden');
    title.innerText = 'METADATA';
    body.innerHTML = `
        <img src="${item.img}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <p style="font-size:0.85rem; color:#ccc; line-height:1.6;">${item.metadata}</p>
        <p style="font-size:0.6rem; color:#444; margin-top:20px; cursor:pointer;" onclick="openApp('gallery')">‹ BACK TO GALLERY</p>
    `;
}

function renderMap(title, body) {
    title.innerText = 'GPS_TRACE';
    const points = window.CASE.map || [];
    body.innerHTML = points.map(m => `
        <div style="margin-bottom:20px; border-bottom:1px solid #111; padding-bottom:10px;">
            <span style="color:var(--accent); font-size:0.6rem; font-family:'JetBrains Mono';">${m.t}</span>
            <p style="font-size:0.8rem; margin:5px 0;">${m.l}</p>
            <p style="font-size:0.6rem; color:#444;">${m.d}</p>
        </div>
    `).join('');
}

function renderMemos(title, body) {
    title.innerText = 'AUDIO_SURVEILLANCE';
    const memo = (window.CASE.memos && window.CASE.memos[0]) || null;
    if (!memo) {
        body.innerHTML = `<p style="color:#444;">No audio on file.</p>`;
        return;
    }
    body.innerHTML = `
        <div class="audio-ui">
            <p style="font-size:0.7rem; color:#888;">${memo.filename || 'AUDIO.WAV'}</p>
            <div class="scrubber" onclick="scrub(event)"><div class="scrubber-fill" id="fill"></div></div>
            <p id="audio-sub" style="font-style:italic; font-size:0.8rem; color:var(--accent);">${memo.idleText || '[SILENCE]'}</p>
            ${memo.audioSrc ? `<audio id="memo-audio" src="${memo.audioSrc}"></audio>` : ''}
        </div>
    `;
}

function scrub(e) {
    const fill = document.getElementById('fill');
    const sub = document.getElementById('audio-sub');
    const memo = (window.CASE.memos && window.CASE.memos[0]) || null;
    if (!memo) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const w = Math.max(0, Math.min(100, (x / rect.width) * 100));
    fill.style.width = w + '%';

    const threshold = memo.revealThreshold != null ? memo.revealThreshold : 70;
    if (w > threshold) {
        sub.innerText = memo.revealText || '[SIGNAL FOUND]';
        const audioEl = document.getElementById('memo-audio');
        if (audioEl && memo.audioSrc && audioEl.paused) {
            audioEl.currentTime = 0;
            audioEl.play().catch(() => {});
        }
    } else {
        sub.innerText = memo.idleText || '[WIND AND STATIC]';
    }
}

function renderVault(title, body) {
    title.innerText = 'FINAL_DISPOSITION';
    const vault = window.CASE.vault || {};
    body.innerHTML = `
        <div style="text-align:center;">
            <p style="font-size:0.7rem; color:#444;">${vault.prompt || 'RECOVERY KEY REQUIRED'}</p>
            <input id="vault-input" type="tel" maxlength="${(vault.code || '').length || 4}"
                   style="background:transparent; border:none; border-bottom:1px solid #222; color:var(--accent); font-size:2.5rem; text-align:center; width:100%; outline:none; margin-top:30px;"
                   oninput="checkVaultCode(this.value)">
            <div id="final-reveal" class="hidden" style="margin-top:30px; text-align:left; font-size:0.9rem; color:#888; line-height:1.6;">
                <p><strong>CASE SUMMARY:</strong> ${vault.revealText || ''}</p>
            </div>
        </div>
    `;
}

function checkVaultCode(value) {
    const vault = window.CASE.vault || {};
    if (value === vault.code) {
        document.getElementById('final-reveal').classList.remove('hidden');
        document.getElementById('vault-input').classList.add('hidden');
    }
}

function scheduleLiveIntrusion() {
    const cfg = window.CASE && window.CASE.liveIntrusion;
    if (!cfg) return;

    if (cfg.trigger === 'after_first_app_open') {
        const check = setInterval(() => {
            if (engineState.appsOpenedCount >= 1 && !engineState.liveStoryFired) {
                clearInterval(check);
                fireLiveIntrusion(cfg);
            }
        }, 500);
    } else {
        const delay = cfg.delaySeconds != null ? cfg.delaySeconds * 1000 : 20000;
        setTimeout(() => fireLiveIntrusion(cfg), delay);
    }
}

function fireLiveIntrusion(cfg) {
    if (engineState.liveStoryFired) return;
    engineState.liveStoryFired = true;
    const n = document.getElementById('notif');
    const ping = document.getElementById('sfx-ping');
    if (ping) ping.play().catch(() => {});
    document.getElementById('notif-msg').innerText = cfg.message;
    n.classList.remove('hidden');
    setTimeout(() => n.classList.add('hidden'), cfg.displaySeconds ? cfg.displaySeconds * 1000 : 7000);
}

/* -------------------- STUCK WATCHER / GLITCH CUE -------------------- */

function startStuckWatcher() {
    setInterval(() => {
        if (!engineState.lastDiscoveryTime) return;
        const idleMs = Date.now() - engineState.lastDiscoveryTime;
        if (idleMs > 90000) {
            triggerGlitch();
            engineState.lastDiscoveryTime = Date.now(); // don't spam, re-arm for next 90s
        }
    }, 5000);
}

function triggerGlitch() {
    const desktop = document.getElementById('desktop');
    const overlay = document.getElementById('window-overlay');
    const target = overlay && !overlay.classList.contains('hidden') ? overlay : desktop;
    target.classList.add('glitch-active');
    setTimeout(() => target.classList.remove('glitch-active'), 500);
}
