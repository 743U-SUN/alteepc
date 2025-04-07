// 互換性チェック機能のテスト実行用スクリプト
// このファイルを実行するには: node test-compatibility.js

console.log('互換性チェック機能のテスト実行中...');
console.log('重要: このスクリプトは TypeScript コードをコンパイルせずに実行するため、');
console.log('     実際のテストのためには npm run test:compatibility を使用してください。');
console.log('     (要 ts-node のインストール)');
console.log('\n代替方法: 以下のコマンドでts-nodeをインストールしてください:');
console.log('npm install --save-dev ts-node\n');

// CPUとマザーボードの互換性チェック機能の基本説明
console.log('実装した互換性チェック機能の概要:');
console.log('----------------------------------');
console.log('1. CPU-マザーボード互換性チェック:');
console.log('   - ソケットの一致確認 (例: LGA1700とAM5は互換性なし)');
console.log('   - メモリタイプの互換性確認 (例: DDR4とDDR5の互換性チェック)');
console.log('   - メモリ速度の制限チェック');
console.log('   - TDP/チップセットの適合性チェック');
console.log('\n2. 互換性問題の深刻度レベル:');
console.log('   - critical: 互換性なし、組み合わせ不可能');
console.log('   - warning: 互換性に制限あり、ただし動作は可能');
console.log('   - info: 情報提供のみ、問題なく動作可能\n');

console.log('テストを実行するには src/lib/compatibility/test.ts を実行してください。');
