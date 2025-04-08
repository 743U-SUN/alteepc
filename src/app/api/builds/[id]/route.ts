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

// PC構成を取得するAPIエンドポイント
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const buildId = params.id;
    
    logToFile('Build retrieval request received', { id: buildId });
    
    if (!buildId) {
      logToFile('Invalid request: Build ID is missing');
      return NextResponse.json(
        { error: { message: 'Build ID is required' } },
        { status: 400 }
      );
    }
    
    const build = await buildService.getBuild(buildId);
    
    if (!build) {
      logToFile('Build not found', { id: buildId });
      return NextResponse.json(
        { error: { message: 'Build not found' } },
        { status: 404 }
      );
    }
    
    logToFile('Build retrieved successfully', { id: buildId });
    return NextResponse.json(build);
  } catch (error) {
    logToFile('Error retrieving build', error);
    return NextResponse.json(
      { error: { message: 'Failed to retrieve build' } },
      { status: 500 }
    );
  }
}
