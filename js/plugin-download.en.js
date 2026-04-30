// ===== Plugin Download Button Generator =====
// Place this element in a plugin page:
//   <div class="plugin-download" data-github="https://github.com/user/repo"></div>
// Include this script to auto-generate the download section

document.addEventListener('DOMContentLoaded', function() {
    var containers = document.querySelectorAll('.plugin-download[data-github]');
    containers.forEach(function(container) {
        var url = container.getAttribute('data-github');
        // Extract user/repo
        var match = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\/|$)/);
        if (!match) return;
        var repo = match[1].replace(/\.git$/, '');

        // Build download section HTML
        container.innerHTML =
            '<div class="win-group">' +
            '<div class="win-group-title">Download</div>' +
            '<div class="section_content" style="padding:6px 8px;">' +
            '<div class="plugin-actions">' +
            '<a href="' + url + '" target="_blank" class="gh-btn">&#x2387; GitHub</a>' +
            '<span class="dl-items" style="display:inline-flex;gap:4px;flex-wrap:wrap;">' +
            '<span style="color:#666666;font-size:12px;">Loading...</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';

        // Fetch GitHub API for the latest release
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/repos/' + repo + '/releases/latest', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var items = container.querySelector('.dl-items');
                if (!items) return;
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    items.innerHTML = '';
                    // Display version and release date
                    var date = new Date(data.published_at);
                    var dateStr = date.getFullYear() + '-' +
                        String(date.getMonth() + 1).padStart(2, '0') + '-' +
                        String(date.getDate()).padStart(2, '0');
                    var info = document.createElement('div');
                    info.style.cssText = 'width:100%;font-size:14px;color:#666666;font-weight:bold;margin-bottom:4px;';
                    info.textContent = data.tag_name + ' — ' + dateStr;
                    items.appendChild(info);

                    // Release notes content
                    if (data.body) {
                        var notesEl = document.createElement('div');
                        notesEl.className = 'release-notes';
                        notesEl.style.cssText = 'width:100%;font-size:13px;color:#333333;background-color:#eeeeee;border:1px solid #808080;padding:8px 10px;margin-top:4px;margin-bottom:6px;white-space:pre-wrap;line-height:1.6;';
                        notesEl.textContent = data.body;
                        items.appendChild(notesEl);
                    }
                    data.assets.forEach(function(asset) {
                        var a = document.createElement('a');
                        a.href = asset.browser_download_url;
                        a.target = '_blank';
                        a.className = 'dl-btn';
                        a.textContent = asset.name;
                        items.appendChild(a);
                    });
                } else {
                    items.innerHTML = '<span style="color:#800000;font-size:12px;">Failed to fetch plugin info</span>';
                }
            }
        };
        xhr.onerror = function() {
            var items = container.querySelector('.dl-items');
            if (items) items.innerHTML = '<span style="color:#800000;font-size:12px;">Failed to fetch plugin info</span>';
        };
        xhr.send();
    });
});
