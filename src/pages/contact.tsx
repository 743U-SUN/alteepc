import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { log } from '../utils/logging';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    log.info('Contact page accessed');
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // エラー状態をリセット
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!validateForm()) {
      log.info('Contact form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      // 実際の実装ではAPIエンドポイントにPOSTするが、
      // 現在はダミー実装なので、成功レスポンスをシミュレート
      log.info('Contact form submitted', { formData });
      
      // 送信成功を装う（実際にはサーバーサイドの処理が必要）
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        success: true,
        message: 'お問い合わせを受け付けました。回答をお待ちください。',
      });
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      log.error(`Contact form submission error: ${error}`);
      setSubmitStatus({
        success: false,
        message: 'エラーが発生しました。後ほど再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="お問い合わせ | alteePC"
      description="alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイトへのお問い合わせフォーム"
    >
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>
            <p className="mt-2 text-lg text-gray-600">
              ご質問・ご要望・フィードバックなどをお気軽にお寄せください
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            {submitStatus ? (
              <div
                className={`p-4 mb-6 rounded-md ${
                  submitStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {submitStatus.success ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        submitStatus.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="山田 太郎"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    お名前を入力してください
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    有効なメールアドレスを入力してください
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  お問い合わせ種別
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">選択してください</option>
                  <option value="question">サイトの使い方</option>
                  <option value="suggestion">機能改善の提案</option>
                  <option value="bug">バグ報告</option>
                  <option value="business">ビジネス関連</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="こちらにお問い合わせ内容を入力してください"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    お問い合わせ内容を入力してください
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-md font-medium ${
                    isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      送信中...
                    </span>
                  ) : (
                    '送信する'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">よくあるお問い合わせ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Q: このサイトは無料で使えますか？
                </h3>
                <p className="mt-1 text-gray-600">
                  A: はい、alteePCはすべての機能を無料でご利用いただけます。アカウント登録も不要です。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Q: 互換性チェックはどのくらい正確ですか？
                </h3>
                <p className="mt-1 text-gray-600">
                  A: 主要な互換性の問題を検出できるよう設計されていますが、完璧ではありません。最終的な互換性確認には各メーカーの公式情報も参照することをおすすめします。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Q: 共有URLの有効期限はありますか？
                </h3>
                <p className="mt-1 text-gray-600">
                  A: 共有URLは最後のアクセスから90日間有効です。期間を過ぎると自動的に削除されます。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Q: 価格情報は最新ですか？
                </h3>
                <p className="mt-1 text-gray-600">
                  A: 現在は参考価格を表示しています。実際の販売価格は販売店によって異なる場合があります。将来的にはリアルタイムの価格情報を提供する予定です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
