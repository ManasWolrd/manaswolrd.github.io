// ===== 插件注册表 =====
// 每个插件可以：
//   - 有 path  → 从独立 HTML 文件加载
//   - 有 content → 直接在 JS 中内嵌 HTML
//   - 都没有  → 自动显示占位内容
const PLUGINS = [
    {
        id: 'overview',
        name: '概览',
        category: '综合',
        icon: 'i',
        path: 'plugins/overview.html'
    },
    {
        id: 'warpcore',
        name: 'WarpCore',
        category: '频谱反转',
        icon: 'WC',
        github: 'ManasWolrd/WarpCore',
        img: 'https://raw.githubusercontent.com/ManasWolrd/WarpCore/main/docs/gui.png',
        desc: '多段频谱反转效果器，灵感源自 PiWarp / Wormhole。可调节频段数、滤波器、共振峰移动，从微妙梳状滤波到极端扭曲。',
        path: 'plugins/warpcore.html'
    },
    {
        id: 'steepflanger',
        name: 'SteepFlanger',
        category: '镶边效果',
        icon: 'SF',
        github: 'ManasWolrd/SteepFlanger',
        img: 'https://raw.githubusercontent.com/ManasWolrd/SteepFlanger/main/docs/gui.png',
        desc: 'FIR / IIR 混合架构镶边效果器，支持 Barberpole 无尽斜坡模式。产生从基础镶边到谐振器的效果。',
        path: 'plugins/steepflanger.html'
    },
    {
        id: 'vitalreverb',
        name: 'VitalReverb',
        category: '混响效果',
        icon: 'VR',
        desc: '移植自Vital合成器的混响',
        path: 'plugins/vitalreverb.html'
    }
];

// ===== DOM 引用 =====
const pluginListEl = document.getElementById('plugin-list');
const pluginCountEl = document.getElementById('plugin-count');
const contentArea = document.getElementById('content-area');
const contentTitle = document.getElementById('content-title');

// ===== 供 iframe 调用的 helper =====
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

// ===== 渲染侧栏列表 =====
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

// ===== 加载插件内容 =====
function loadPlugin(plugin, listItemEl) {
    // 高亮当前选中项
    document.querySelectorAll('.plugin-item').forEach(function(el) { el.classList.remove('active'); });
    if (listItemEl) {
        listItemEl.classList.add('active');
    } else {
        var found = document.querySelector('.plugin-item[data-plugin-id="' + plugin.id + '"]');
        if (found) found.classList.add('active');
    }

    contentTitle.textContent = plugin.name;

    if (plugin.content) {
        // 有内嵌 HTML → 直接显示
        contentArea.innerHTML = plugin.content;
    } else if (plugin.path) {
        // 有独立页面 → 用 iframe 加载（兼容 file:// 协议）
        contentArea.innerHTML = '<iframe class="plugin-iframe" src="' + plugin.path + '"></iframe>';
    } else {
        // 都没有 → 占位内容
        showPlaceholder(plugin);
    }
}

// ===== 占位内容（插件无内容时显示） =====
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
        '<p><strong>' + plugin.name + '</strong> —— ' + plugin.category + '类音频插件。</p>',
        '</div>',
        '<div class="tips-box">',
        '&#x2139; 该插件的详情尚未添加，敬请期待。',
        '</div>',
        '<div class="p-section">',
        '<div class="section-title">信息</div>',
        '<div class="section_content">',
        '<table><tr><th>属性</th><th>值</th></tr>',
        '<tr><td>插件名称</td><td>' + plugin.name + '</td></tr>',
        '<tr><td>类别</td><td>' + plugin.category + '</td></tr>',
        '<tr><td>状态</td><td><span style="color:#808080;">待添加</span></td></tr>',
        '</table>',
        '</div>',
        '</div>'
    ].join('');
}

// ===== URL 哈希路由 =====
function handleRoute() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) { hash = 'overview'; }

    for (var i = 0; i < PLUGINS.length; i++) {
        if (PLUGINS[i].id === hash) {
            loadPlugin(PLUGINS[i]);
            return;
        }
    }

    // 找不到时默认概览
    loadPlugin(PLUGINS[0]);
}

// ===== 监听 hash 变化 =====
window.addEventListener('hashchange', handleRoute);

// ===== 启动 =====
renderPluginList();
handleRoute();
