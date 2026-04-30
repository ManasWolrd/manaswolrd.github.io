// ===== 插件下载按钮生成器 =====
// 在插件页面放一个元素：
//   <div class="plugin-download" data-github="https://github.com/用户/仓库"></div>
// 引入本脚本即可自动生成下载区域

document.addEventListener('DOMContentLoaded', function() {
    var containers = document.querySelectorAll('.plugin-download[data-github]');
    containers.forEach(function(container) {
        var url = container.getAttribute('data-github');
        // 提取 user/repo
        var match = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\/|$)/);
        if (!match) return;
        var repo = match[1].replace(/\.git$/, '');

        // 构建下载区域 HTML
        container.innerHTML =
            '<div class="win-group">' +
            '<div class="win-group-title">下载</div>' +
            '<div class="section_content" style="padding:6px 8px;">' +
            '<div class="plugin-actions">' +
            '<a href="' + url + '" target="_blank" class="gh-btn">&#x2387; GitHub</a>' +
            '<span class="dl-items" style="display:inline-flex;gap:4px;flex-wrap:wrap;">' +
            '<span style="color:#666666;font-size:12px;">加载中...</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';

        // 请求 GitHub API 获取 Release 文件
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/repos/' + repo + '/releases/latest', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var items = container.querySelector('.dl-items');
                if (!items) return;
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    items.innerHTML = '';
                    data.assets.forEach(function(asset) {
                        var a = document.createElement('a');
                        a.href = asset.browser_download_url;
                        a.target = '_blank';
                        a.className = 'dl-btn';
                        a.textContent = asset.name;
                        items.appendChild(a);
                    });
                } else {
                    items.innerHTML = '<span style="color:#800000;font-size:12px;">获取插件信息失败</span>';
                }
            }
        };
        xhr.onerror = function() {
            var items = container.querySelector('.dl-items');
            if (items) items.innerHTML = '<span style="color:#800000;font-size:12px;">获取插件信息失败</span>';
        };
        xhr.send();
    });
});
