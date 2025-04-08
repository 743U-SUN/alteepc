import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/services/service-factory';

// 特定のパーツを取得するAPI
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partsService = ServiceFactory.getPartsService();
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'パーツIDが指定されていません' }, 
        { status: 400 }
      );
    }
    
    // URLからパーツタイプを取得
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'cpu';
    
    // パーツタイプに応じたメソッドを呼び出し
    let data;
    switch (type.toLowerCase()) {
      case 'cpu':
        data = await partsService.getCPUById(id);
        break;
      case 'motherboard':
        data = await partsService.getMotherboardById(id);
        break;
      // 将来的に他のパーツタイプも追加
      default:
        return NextResponse.json(
          { error: `パーツタイプ '${type}' が不明です` }, 
          { status: 400 }
        );
    }
    
    if (!data) {
      return NextResponse.json(
        { error: `ID '${id}' の ${type} が見つかりません` }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error(`パーツ詳細API エラー: パーツID=${params.id}`, error);
    return NextResponse.json(
      { error: 'パーツデータの取得中にエラーが発生しました' }, 
      { status: 500 }
    );
  }
}
