import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/services/service-factory';

// パーツ一覧を取得するAPI
export async function GET(req: NextRequest) {
  try {
    const partsService = ServiceFactory.getPartsService();
    const url = new URL(req.url);
    
    // クエリパラメータを取得
    const type = url.searchParams.get('type') || 'cpu';
    const filters: Record<string, string> = {};
    
    // フィルターパラメータを処理
    url.searchParams.forEach((value, key) => {
      if (key !== 'type' && key !== 'sort') {
        filters[key] = value;
      }
    });
    
    // ソートオプション
    const sortBy = url.searchParams.get('sort') || 'recommended';
    
    // パーツタイプに応じたメソッドを呼び出し
    let data;
    switch (type.toLowerCase()) {
      case 'cpu':
        data = await partsService.getCPUs(filters, sortBy);
        break;
      case 'motherboard':
        data = await partsService.getMotherboards(filters, sortBy);
        break;
      // 将来的に他のパーツタイプも追加
      default:
        return NextResponse.json(
          { error: `パーツタイプ '${type}' が不明です` }, 
          { status: 400 }
        );
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('パーツAPI エラー:', error);
    return NextResponse.json(
      { error: 'パーツデータの取得中にエラーが発生しました' }, 
      { status: 500 }
    );
  }
}
