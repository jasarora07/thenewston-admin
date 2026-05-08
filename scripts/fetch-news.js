const { createClient } = require('@supabase/supabase-js');

console.log("--- TERMINAL SYNC: DEEP FETCH ---");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runAutomation() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    
    // We fetch from 'us' top-headlines for high frequency business news
    // This is the most reliable real-time endpoint for NewsAPI
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=50&apiKey=${apiKey}`;
    
    console.log("📡 Connecting to NewsAPI...");
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(`NewsAPI Error: ${data.message}`);
    }

    const articles = data.articles || [];
    console.log(`📦 NewsAPI sent ${articles.length} total articles.`);

    // Map and Clean data
    const newsData = articles
      .filter(art => art.title && art.title !== "[Removed]") // Keep even those without images for now to test
      .map((article) => ({
        title: article.title,
        category: 'Business',
        excerpt: article.description || 'Market summary pending...',
        url: article.url,
        imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1611974714851-48206138d73e',
        author: article.author || 'Financial Desk',
        readTime: '4 min read',
        date: article.publishedAt || new Date().toISOString(),
        source: article.source.name || 'News Wire'
      }));

    if (newsData.length === 0) {
      console.log("⚠️ No valid articles found to upload.");
      return;
    }

    console.log(`💾 Syncing ${newsData.length} articles to Supabase...`);

    const { error } = await supabase
      .from('news')
      .upsert(newsData, { 
        onConflict: 'url',
        ignoreDuplicates: false // This forces an update even if the URL exists
      });

    if (error) throw error;
    console.log("🚀 TERMINAL UPDATED: May 9 Sync Complete.");

  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err.message);
    process.exit(1);
  }
}

runAutomation();
