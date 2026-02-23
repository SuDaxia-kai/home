const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".reveal").forEach((el) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(el);
});

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const markdownRoot = document.getElementById("markdown-content");
if (markdownRoot) {
  const source = markdownRoot.dataset.markdownSrc;
  const isFileProtocol = window.location.protocol === "file:";

  const renderMarkdown = (mdText) => {
    if (window.marked) {
      markdownRoot.innerHTML = window.marked.parse(mdText);
      if (window.renderMathInElement) {
        window.renderMathInElement(markdownRoot, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } else {
      markdownRoot.textContent =
        "Markdown 文本已加载，但渲染器未加载（marked CDN 不可用）。请联网后刷新，或改为本地部署 marked/katex。";
    }
  };

  const loadByXhr = (url) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
          resolve(xhr.responseText);
          return;
        }
        reject(new Error(`加载失败: ${xhr.status}`));
      };
      xhr.onerror = () => reject(new Error("XHR 读取失败"));
      xhr.send();
    });

  if (source) {
    fetch(source)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`加载失败: ${response.status}`);
        }
        return response.text();
      })
      .then(renderMarkdown)
      .catch((err) => {
        if (isFileProtocol) {
          loadByXhr(source)
            .then(renderMarkdown)
            .catch(() => {
              markdownRoot.textContent =
                "无法加载 Markdown 文件：当前是 file:// 打开。请在项目目录运行 `python3 -m http.server 8000`，然后访问 http://localhost:8000/world-model-note.html";
            });
          return;
        }
        markdownRoot.textContent = `无法加载 Markdown 文件：${err.message}`;
      });
  }
}
