/**
 * THE NEWSTON - Real-Time Fetcher
 * Optimized for Today's News (May 9, 2026)
 */

const { createClient } = require('@supabase/supabase-js');

console.log("--- TERMINAL SYNC: LIVE MODE ---");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runAutomation() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    
    // Get Today's Date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    console.log(`📡 Fetching live updates for: ${today}`);

    // SWITCHED TO top-headlines for REAL-TIME access (No 24h delay)
    // We use 'category=business' to get the freshest industry news
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=40&apiKey=${apiKey}`
    );

    if (!response.ok) throw new Error(`NewsAPI error: ${response.status}`);

    const data = await response.json();
    const validArticles = (data.articles || []).filter(art => art.title && art.title !== "[Removed]" && art.urlToImage);

    console.log(`✅ Found ${validArticles.length} LIVE articles.`);

    const newsData = validArticles.map((article) => ({
      title: article.title,
      category: 'Finance',
      excerpt: article.description || 'Live terminal update.',
      url: article.url,
      imageUrl: article.urlToImage,
      author: article.author || 'Staff',
      readTime: '3 min read',
      date: article.publishedAt, // This will now show May 9 timestamps
      source: article.source.name || 'News Wire'
    }));

    const { error } = await supabase
      .from('news')
      .upsert(newsData, { onConflict: 'url' });

    if (error) throw error;
    console.log("🚀 SUCCESS: Terminal updated with real-time May 9 data.");

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    process.exit(1);
  }
}

runAutomation();
