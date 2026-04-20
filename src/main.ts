/**
 * 元素騎士ゲームポータル — メインスクリプト
 *
 * games.json を読み込んでゲームカードを表示する。
 * フィルタ（タグ・コレクション）と検索に対応。
 */

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

interface GameEntry {
  id: string;
  title: string;
  creator: string;
  creatorUrl: string;
  url: string;
  thumbnail: string | null;
  collections: string[];
  tags: string[];
  description: string;
  submittedAt: string;
}

// ---------------------------------------------------------------------------
// 状態
// ---------------------------------------------------------------------------

let allGames: GameEntry[] = [];
let activeFilter = 'all';
let searchQuery = '';

// ---------------------------------------------------------------------------
// 初期化
// ---------------------------------------------------------------------------

async function init() {
  try {
    const res = await fetch('./games.json');
    if (!res.ok) throw new Error(`games.json の取得に失敗: ${res.status}`);
    allGames = (await res.json()) as GameEntry[];
  } catch (e) {
    document.getElementById('grid')!.innerHTML =
      '<div class="empty">ゲームデータの読み込みに失敗しました。</div>';
    console.error(e);
    return;
  }

  renderGrid();
  setupFilters();
  setupSearch();
}

// ---------------------------------------------------------------------------
// グリッド描画
// ---------------------------------------------------------------------------

function renderGrid() {
  const grid = document.getElementById('grid')!;
  const countBar = document.getElementById('count-bar')!;

  const filtered = allGames.filter((g) => {
    // テキスト検索
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hit =
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.creator.toLowerCase().includes(q);
      if (!hit) return false;
    }

    // フィルタ
    if (activeFilter !== 'all') {
      const inTags = g.tags.includes(activeFilter);
      const inCols = g.collections.includes(activeFilter);
      if (!inTags && !inCols) return false;
    }

    return true;
  });

  countBar.textContent = `${filtered.length} 件のゲーム`;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty">条件に一致するゲームがありません</div>';
    return;
  }

  grid.innerHTML = filtered.map(buildCard).join('');
}

function buildCard(g: GameEntry): string {
  const thumbnail = g.thumbnail
    ? `<img class="game-thumbnail" src="${g.thumbnail}" alt="${g.title}" loading="lazy" onerror="this.className='game-thumbnail placeholder';this.textContent='🎮'">`
    : `<div class="game-thumbnail placeholder">🎮</div>`;

  const tags = g.tags
    .map((t) => `<span class="tag tag-${t in TAG_COLORS ? t : 'default'}">${TAG_LABELS[t] ?? t}</span>`)
    .join('');

  const cols = g.collections
    .map((c) => `<span class="col-tag">${COL_LABELS[c] ?? c}</span>`)
    .join('');

  return `
    <div class="game-card">
      ${thumbnail}
      <div class="game-body">
        <div class="game-title">${escHtml(g.title)}</div>
        <div class="game-creator">by <a href="${escHtml(g.creatorUrl)}" target="_blank" rel="noopener">@${escHtml(g.creator)}</a></div>
        <div class="game-desc">${escHtml(g.description)}</div>
        <div class="tag-row">${tags}${cols}</div>
        <a class="play-btn" href="${escHtml(g.url)}" target="_blank" rel="noopener">▶ 遊ぶ</a>
      </div>
    </div>
  `;
}

const TAG_COLORS = { battle: 1, puzzle: 1, collection: 1, casual: 1 };
const TAG_LABELS: Record<string, string> = {
  battle: 'バトル', puzzle: 'パズル', collection: 'コレクション', casual: 'カジュアル',
};
const COL_LABELS: Record<string, string> = {
  equipment_v1: '装備v1', equipment_v2: '装備v2', block: 'ブロック', item: 'アイテム',
};

function escHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));
}

// ---------------------------------------------------------------------------
// フィルタ
// ---------------------------------------------------------------------------

function setupFilters() {
  document.getElementById('filter-group')!.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter ?? 'all';
    renderGrid();
  });
}

// ---------------------------------------------------------------------------
// 検索
// ---------------------------------------------------------------------------

function setupSearch() {
  const input = document.getElementById('search') as HTMLInputElement;
  let timer: number;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      searchQuery = input.value.trim();
      renderGrid();
    }, 200);
  });
}

// ---------------------------------------------------------------------------
// 起動
// ---------------------------------------------------------------------------

init();
