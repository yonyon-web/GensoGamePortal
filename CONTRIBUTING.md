# ゲームの登録方法

元素騎士ミニゲーム開発キットで作ったゲームをこのポータルに掲載できます。

---

## 前提条件

- ゲームが GitHub Pages で公開済みであること
- GitHub アカウントを持っていること

---

## 登録手順

### 自動登録（推奨）

開発キットの Claude Code で以下を実行すると、PRが自動作成されます:

```
/submit-portal
```

### 手動登録

#### 1. このリポジトリを Fork する

GitHub の「Fork」ボタンを押してください。

#### 2. games.json に追記する

配列の末尾に以下の形式で追加してください:

```json
{
  "id": "YYYYMMDD-yourname",
  "title": "ゲームのタイトル",
  "creator": "あなたのGitHubユーザー名",
  "creatorUrl": "https://github.com/あなたのユーザー名",
  "url": "https://あなたのユーザー名.github.io/リポジトリ名/",
  "thumbnail": null,
  "collections": ["equipment_v2"],
  "tags": ["battle"],
  "description": "ゲームの説明（1〜2行）",
  "submittedAt": "2025-04-20"
}
```

**id**: `YYYYMMDD-あなたの名前` の形式（例: `20250420-yamada`）

**collections** に指定できる値:
- `equipment_v1` — Genso_NFT（旧世代装備品）
- `equipment_v2` — Genso_NFT_v2（現行装備品）
- `block` — GENSO.Block
- `item` — GensokishiOnline.Items

**tags** に指定できる値:
- `battle` — バトル・対戦系
- `puzzle` — パズル・頭脳系
- `collection` — コレクション・育成系
- `casual` — カジュアル・その他

#### 3. Pull Request を作成する

- タイトル: `Add game: [ゲームタイトル]`
- 本文に: ゲームURL・使用コレクション・一言説明 を記載してください

#### 4. レビュー後、自動デプロイされます

管理者がマージすると GitHub Actions がポータルを自動更新します。

---

## 登録基準

以下を満たすゲームを歓迎します:

- 元素騎士のNFT（装備品・ブロック・アイテム）を実際に使っている
- GitHub Pages で公開されており、URLにアクセスできる
- 動作するゲームである（制作中・未完成は不可）

---

## 問い合わせ

登録に関する質問は Issue またはDiscordまでお気軽にどうぞ。
