import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { log } from '../utils/logging';

const About: React.FC = () => {
  useEffect(() => {
    log.info('About page accessed');
  }, []);

  return (
    <Layout
      title="サイトについて | alteePC"
      description="alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイトについての情報"
    >
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">サイトについて</h1>
            <p className="mt-2 text-lg text-gray-600 mb-8">
              alteePC は自作PC初心者のためのパーツ互換性チェック＆簡易見積もりサイトです
            </p>
          </div>

          <div className="prose prose-blue mx-auto">
            <h2>サイトの目的</h2>
            <p>
              自作PCに興味があるけれど、最初の一歩を踏み出せていない方々に向けて、
              パーツ選びの難しさを解消するためのサービスを提供しています。
              特に「どのパーツが互いに相性が良いのか」「全部揃えるといくらかかるのか」
              という初心者が最も悩むポイントに焦点を当てています。
            </p>

            <h2>主な機能</h2>
            <h3>PCパーツの互換性チェック</h3>
            <p>
              CPUとマザーボードのソケットが合っているか、GPUがケースに収まるかなど、
              パーツ同士の互換性を自動的にチェックします。これにより、組み立て時に
              「パーツが合わない」というトラブルを事前に防ぐことができます。
            </p>

            <h3>PCパーツの簡易見積もり</h3>
            <p>
              選択したパーツの合計金額をリアルタイムで計算します。
              予算内に収めるためのパーツ選びを支援します。
            </p>

            <h3>URL発行機能</h3>
            <p>
              アカウント登録不要で、作成したPC構成を共有できます。
              友人や知人に相談したり、SNSでアドバイスを求めたりする際に便利です。
              共有されたURLは最後のアクセスから90日間有効で、その後は自動的に削除されます。
            </p>

            <h2>開発者について</h2>
            <p>
              alteePCは、自作PCの魅力をより多くの人に知ってもらいたいという
              思いから開発されました。私自身、初めて自作PCに挑戦した時の
              「どのパーツを選べばいいのか分からない」という悩みを解決したいと
              考えています。
            </p>

            <h2>将来の計画</h2>
            <p>
              現在はベータ版として基本機能を提供していますが、今後は以下の機能を追加予定です：
            </p>
            <ul>
              <li>より詳細なパーツ情報の提供</li>
              <li>リアルタイムの価格情報の取得</li>
              <li>ユーザーレビューの統合</li>
              <li>ベンチマークスコアの予測</li>
              <li>より高度な互換性チェック機能</li>
            </ul>

            <h2>免責事項</h2>
            <p>
              alteePCは可能な限り正確な情報提供を心がけていますが、
              最終的なパーツの互換性や価格については各メーカーの公式情報を
              必ず確認してください。当サイトの情報に基づく判断で生じたいかなる
              問題についても、責任を負いかねます。
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              ご質問やフィードバックがありましたら、
              <a href="/contact" className="text-blue-600 hover:text-blue-800">
                お問い合わせページ
              </a>
              からご連絡ください。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
