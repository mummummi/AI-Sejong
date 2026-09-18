export default async function handler(req, res) {
    // 오직 POST 요청만 허용합니다.
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 💡 핵심: 브라우저가 아닌 서버 환경(Vercel)에 저장된 안전한 API 키를 불러옵니다.
    const apiKey = process.env.GEMINI_API_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview:generateContent?key=${apiKey}`;

    try {
        // 프론트엔드(HTML)에서 받은 질문(req.body)을 구글로 그대로 전달합니다.
        const googleRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        
        const data = await googleRes.json();
        
        // 구글에서 받은 답변을 다시 프론트엔드(HTML)로 돌려줍니다.
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 통신 중 에러가 발생했습니다.' });
    }
}
