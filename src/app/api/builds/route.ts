import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/services/service-factory';

// ロガー関数
function logToFile(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data);
  // 注: ここでファイルへのログ出力も実装できる
}

// BuildServiceの取得
const buildService = ServiceFactory.getBuildService();

// PC構成を保存するAPIエンドポイント
export async function POST(request: NextRequest) {
  try {
    logToFile('Build save request received');
    const body = await request.json();
    
    // リクエストの検証
    if (!body.components) {
      logToFile('Invalid request: components is missing', body);
      return NextResponse.json(
        { error: { message: 'components is required' } },
        { status: 400 }
      );
    }
    
    // 構成を保存
    const result = await buildService.saveBuild({
      components: body.components,
      name: body.name
    });
    
    logToFile('Build saved successfully', { id: result.id });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logToFile('Error saving build', error);
    return NextResponse.json(
      { error: { message: 'Failed to save build' } },
      { status: 500 }
    );
  }
}
