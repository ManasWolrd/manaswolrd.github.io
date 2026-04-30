// ===== Plugin Registry =====
const PLUGINS = [
    {
        id: 'overview',
        name: 'Overview',
        category: 'General',
        icon: 'i',
        path: 'plugins/overview.html'
    },
    {
        id: 'warpcore',
        name: 'WarpCore',
        category: 'Spectral Inversion',
        icon: 'WC',
        github: 'ManasWolrd/WarpCore',
        img: 'https://raw.githubusercontent.com/ManasWolrd/WarpCore/main/docs/gui.png',
        desc: 'Multi-band spectral inversion effect, inspired by PiWarp / Wormhole. Adjustable band count, filters, formant shifting — from subtle comb filtering to extreme warp.',
        path: 'plugins/warpcore.html'
    },
    {
        id: 'steepflanger',
        name: 'SteepFlanger',
        category: 'Flanger',
        icon: 'SF',
        github: 'ManasWolrd/SteepFlanger',
        img: 'https://raw.githubusercontent.com/ManasWolrd/SteepFlanger/main/docs/gui.png',
        desc: 'FIR / IIR hybrid flanger with Barberpole infinite ramp mode. From basic flanging to resonator-like effects.',
        path: 'plugins/steepflanger.html'
    },
    {
        id: 'vitalreverb',
        name: 'VitalReverb',
        category: 'Reverb',
        icon: 'VR',
        img: '/assets/img/vitalreverb_ui.png',
        desc: 'Reverb ported from the Vital synth',
        path: 'plugins/vitalreverb.html'
    }
];

// ===== DOM Refs =====
const pluginListEl = document.getElementById('plugin-list');
const pluginCountEl = document.getElementById('plugin-count');
const contentArea = document.getElementById('content-area');
const contentTitle = document.getElementById('content-title');

// ===== Helpers for iframes =====
function getPluginInfo(id) {
    for (var i = 0; i < PLUGINS.length; i++) {
        if (PLUGINS[i].id === id) return PLUGINS[i];
    }
    return null;
}

function getPlugins() {
    var list = [];
    for (var i = 0; i < PLUGINS.length; i++) {
        if (PLUGINS[i].id !== 'overview') list.push(PLUGINS[i]);
    }
    return list;
}

// ===== Render sidebar =====
function renderPluginList() {
    pluginListEl.innerHTML = '';
    pluginCountEl.textContent = PLUGINS.length;

    PLUGINS.forEach(function(plugin) {
        var li = document.createElement('li');
        li.className = 'plugin-item';
        li.dataset.pluginId = plugin.id;
        li.innerHTML = [
            '<span class="plugin-icon">' + plugin.icon + '</span>',
            '<div class="plugin-info">',
            '<div class="plugin-name">' + plugin.name + '</div>',
            '<div class="plugin-category">' + plugin.category + '</div>',
            '</div>',
            '<span class="plugin-arrow">&#x25B6;</span>'
        ].join('');

        li.addEventListener('click', function() {
            window.location.hash = plugin.id;
        });
        pluginListEl.appendChild(li);
    });
}

// ===== Load plugin content =====
function loadPlugin(plugin, listItemEl) {
    document.querySelectorAll('.plugin-item').forEach(function(el) { el.classList.remove('active'); });
    if (listItemEl) {
        listItemEl.classList.add('active');
    } else {
        var found = document.querySelector('.plugin-item[data-plugin-id="' + plugin.id + '"]');
        if (found) found.classList.add('active');
    }

    contentTitle.textContent = plugin.name;

    if (plugin.content) {
        contentArea.innerHTML = plugin.content;
    } else if (plugin.path) {
        contentArea.innerHTML = '<iframe class="plugin-iframe" src="' + plugin.path + '"></iframe>';
    } else {
        showPlaceholder(plugin);
    }
}

// ===== Placeholder =====
function showPlaceholder(plugin) {
    contentArea.innerHTML = [
        '<div class="plugin-header">',
        '<span class="plugin-header-icon">' + plugin.icon + '</span>',
        '<div>',
        '<h2 class="plugin-title">' + plugin.name + '</h2>',
        '<span class="plugin-badge">' + plugin.category + '</span>',
        '</div>',
        '</div>',
        '<div class="plugin-description">',
        '<p><strong>' + plugin.name + '</strong> — A ' + plugin.category + ' audio plugin.</p>',
        '</div>',
        '<div class="tips-box">',
        '&#x2139; Details for this plugin have not been added yet. Stay tuned.',
        '</div>',
        '<div class="p-section">',
        '<div class="section-title">Info</div>',
        '<div class="section_content">',
        '<table><tr><th>Property</th><th>Value</th></tr>',
        '<tr><td>Plugin Name</td><td>' + plugin.name + '</td></tr>',
        '<tr><td>Category</td><td>' + plugin.category + '</td></tr>',
        '<tr><td>Status</td><td><span style="color:#808080;">Pending</span></td></tr>',
        '</table>',
        '</div>',
        '</div>'
    ].join('');
}

// ===== Hash routing =====
function handleRoute() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) { hash = 'overview'; }

    for (var i = 0; i < PLUGINS.length; i++) {
        if (PLUGINS[i].id === hash) {
            loadPlugin(PLUGINS[i]);
            return;
        }
    }

    loadPlugin(PLUGINS[0]);
}

window.addEventListener('hashchange', handleRoute);

// ===== Start =====
renderPluginList();
handleRoute();
