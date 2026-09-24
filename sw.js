const CACHE_NAME = 'timer-app-v1';
// キャッシュするファイル一覧（画像ファイル名やHTMLファイル名に合わせて変更してください）
const ASSETS_TO_CACHE = [
  './',
  './index.html', // HTMLのファイル名
  './IMG_3730.png' // アイコン画像
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 有効化時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ネットワーク優先、失敗時にキャッシュから読み込む (オフライン対応)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
