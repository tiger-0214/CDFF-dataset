# CDFF 数据集网站

**线上地址：<https://tiger-0214.github.io/CDFF-dataset/>**
（仓库：<https://github.com/tiger-0214/CDFF-dataset>，main 分支根目录 → GitHub Pages）

单页静态站点，中英双语，无构建步骤、无外部 CDN 依赖。

```
website/
├── index.html              # 全部内容（中文为默认文案，带 data-i18n 标记）
├── assets/
│   ├── css/style.css       # 设计系统（变量 + 响应式 + 打印样式）
│   ├── js/i18n.js          # 英文词条表 + 语言切换逻辑
│   ├── js/main.js          # 吸顶导航 / 计数动画 / 进场动画 / BibTeX 复制
│   └── img/                # 论文图，已压成 webp（+jpg 回退）
└── preview/                # 本地截图，仅供预览，不入库
```

## 本地预览

```bash
cd website
python3 -m http.server 8765
# 打开 http://127.0.0.1:8765/
```

直接双击 `index.html` 也能看，但用 `file://` 打开时浏览器会限制 `localStorage`，
语言偏好不记忆——不影响内容。

## 内容来源（改文案前先看这里）

页面上每个数字都能追到项目里的确权文件，**不要手改 HTML 里的数值**：

| 位置 | 权威来源 |
|---|---|
| 位置误差 / 尺度误差 / IoU / BRISQUE / 通过率 | `experiments/bcd/out_D_eval/results.json` → 汇总在 `figures/生成说明.md` §3.1 |
| 消融 E1 的 LCR / RLJ / p 值 | 同上 §3.2（结论是 null result） |
| 验证链 267 / 161 / 158 / Jaccard 0.585 | `0-workspace/README.md` §8 |
| 背景池 37,852、九类枚举 | `preprocessing/README.md` |
| V1–V9 检查数与失败码 | `0-workspace/README.md` §4 |
| 许可条款 | `THIRD_PARTY_LICENSES.md`、`NOTICE` |

改数字之前先改这些源文件，再同步页面——否则站点会变成第二个真相源。

## 双语

- 中文写在 `index.html` 里，作为默认语言；`i18n.js` 在加载时把这些原文快照进 `ZH`。
- 英文只维护 `i18n.js` 里的 `EN` 对象，键与 `data-i18n` 属性一一对应。缺 key 自动回退中文。
- 新增文案的流程：HTML 里写中文 + `data-i18n="some.key"` → 在 `EN` 里补同名 key。
- 切换后写到 `localStorage.cdff-lang`，刷新保持；`<html lang>`、`<title>`、`meta description` 一并更新。

## 自检

```bash
python3 /tmp/check_site.py     # 四档视口溢出、控制台错误、i18n 完整性、对比度
```

判据（当前全绿）：

- 1440 / 1180 / 834 / 390 四档 `document.scrollWidth == clientWidth`，零溢出元素
- 零控制台错误、零请求失败
- 切到 EN 后 `[data-i18n]` 节点中中文残留数 = 0，无 `undefined` 占位
- 7 张论文图 `naturalWidth > 0`，宽高比与源一致

## 部署

**已部署**：个人账号独立仓库，main 分支根目录发布，无需构建步骤。

- 线上：<https://tiger-0214.github.io/CDFF-dataset/>
- 仓库：<https://github.com/tiger-0214/CDFF-dataset>
- 更新方式：在本目录改完后 `git add -A && git commit -m "..." && git push`，Pages 约 40 秒后重建。

以下两条路径供换托管位置时参考：

**A. 个人账号独立仓库（当前所用）**

```bash
cd website
git init -b main && git add -A && git commit -m "CDFF dataset site"
gh repo create CDFF-dataset --public --source=. --push
gh api -X POST repos/<user>/CDFF-dataset/pages -f 'source[branch]=main' -f 'source[path]=/'
```

公开地址：`https://<user>.github.io/CDFF-dataset/`。首次构建约 1 分钟。

**B. 主仓库 docs/ 目录（URL 挂在 org 下）**

把本目录内容复制到 `low-slow-small-targets-dataset/docs/`，推送到 main，
再由仓库管理员在 Settings → Pages 选择 `main` / `/docs`。
公开地址：`https://taas2024.github.io/low-slow-small-targets-dataset/`。

> 需要仓库 admin 权限才能在 API 里打开 Pages；仅有 push 权限时走人工那一步。

## 素材

`assets/img/` 里的图由 `·重点节点总结笔记/论文写作/figures/fig*.png` 生成：
长边缩到 1400 px，输出 webp（q=84, method=6）与 jpg（progressive）双份，
7 张合计 1.6 MB。重新出图后按同样参数覆盖即可，HTML 不用改。
