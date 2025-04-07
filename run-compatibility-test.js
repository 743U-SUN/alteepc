// コマンドラインから互換性チェックテストを実行するスクリプト
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('互換性チェックテストを実行します...');

// TypeScriptのランタイム実行用のコマンド
// Node.jsから直接TypeScriptのファイルを実行する
const tsx = spawn('node', [
  '--loader', 'ts-node/esm',
  path.join(__dirname, 'src/lib/compatibility/test.ts')
]);

// 標準出力のストリーミング
tsx.stdout.on('data', (data) => {
  console.log(data.toString());
});

// 標準エラー出力のストリーミング
tsx.stderr.on('data', (data) => {
  console.error(data.toString());
});

// プロセス終了時の処理
tsx.on('close', (code) => {
  console.log(`テスト完了。終了コード: ${code}`);
  
  // ログファイルの内容を表示
  const logPath = path.join(__dirname, 'logs/compatibility-test.log');
  if (fs.existsSync(logPath)) {
    console.log('\nテストログの内容:');
    console.log('-----------------');
    console.log(fs.readFileSync(logPath, 'utf8'));
  } else {
    console.log('\nログファイルが見つかりません。');
  }
});

// エラーハンドリング
tsx.on('error', (err) => {
  console.error('テスト実行中にエラーが発生しました:', err);
  console.log('\nts-nodeパッケージがインストールされているか確認してください:');
  console.log('npm install --save-dev ts-node');
});
