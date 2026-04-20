# ⚔️ 元素騎士ゲームポータル

元素騎士ミニゲーム開発キットで作られたゲームを一覧できるポータルサイトです。

## 概要

- `games.json` にゲーム情報を追加するだけで掲載できます
- タグ・コレクションによるフィルタリングとキーワード検索に対応
- `main` ブランチへのマージで GitHub Pages へ自動デプロイ

## 技術スタック

- **Vite** + **TypeScript**
- GitHub Actions（CI/CD）
- GitHub Pages（ホスティング）

## ローカル開発

```bash
npm install
npm run dev
```

ビルド:

```bash
npm run build
```

## ゲームの登録

ゲームをポータルに掲載したい場合は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

### 登録方法の概要

1. このリポジトリを Fork する
2. `games.json` の末尾にゲーム情報を追加する
3. `Add game: [ゲームタイトル]` というタイトルで Pull Request を作成する
4. マージされると自動デプロイされます

### games.json のフォーマット

```json
{
  "id": "YYYYMMDD-yourname",
  "title": "ゲームのタイトル",
  "creator": "GitHubユーザー名",
  "creatorUrl": "https://github.com/ユーザー名",
  "url": "https://ユーザー名.github.io/リポジトリ名/",
  "thumbnail": null,
  "collections": ["equipment_v2"],
  "tags": ["battle"],
  "description": "ゲームの説明（1〜2行）",
  "submittedAt": "YYYY-MM-DD"
}
```

**collections** に指定できる値:

| 値 | コレクション |
|---|---|
| `equipment_v1` | Genso_NFT（旧世代装備品） |
| `equipment_v2` | Genso_NFT_v2（現行装備品） |
| `block` | GENSO.Block |
| `item` | GensokishiOnline.Items |

**tags** に指定できる値:

| 値 | 説明 |
|---|---|
| `battle` | バトル・対戦系 |
| `puzzle` | パズル・頭脳系 |
| `collection` | コレクション・育成系 |
| `casual` | カジュアル・その他 |

## ライセンス

MIT
