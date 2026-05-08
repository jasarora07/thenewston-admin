console.log("--- TERMINAL BOOT SEQUENCE STARTING ---");

const { createClient } = require('@supabase/supabase-js');

// 1. Check Secrets immediately
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ ERROR: Supabase credentials missing from GitHub Secrets.");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runAutomation() {
  try {
    console.log("📡 Connecting to NewsAPI...");
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${process.env.NEWS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`NewsAPI returned status ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ API Success: Found ${data.articles?.length || 0} articles.`);

    const mappedData = data.articles.map(article => ({
      title: article.title,
      category: 'Finance',
      excerpt: article.description || '',
      url: article.url,
      imageUrl: article.urlToImage || '',
      author: article.author || 'Staff',
      readTime: '3 min',
      date: article.publishedAt,
      source: article.source.name
    }));

    console.log("💾 Writing to Supabase...");
    const { error } = await supabase.from('news').upsert(mappedData, { onConflict: 'url' });

    if (error) throw error;
    console.log("🚀 SUCCESS: Database updated.");

  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err.message);
    process.exit(1);
  }
}

runAutomation();
