/**
 * THE NEWSTON - Automated Fetcher (V2 - Real-time Sorting)
 * Columns: id, title, category, excerpt, url, imageUrl, author, readTime, date, source
 */

const { createClient } = require('@supabase/supabase-js');

console.log("--- STARTING TERMINAL SYNC (REAL-TIME MODE) ---");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runAutomation() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    console.log("📡 Connecting to NewsAPI (Everything Endpoint)...");

    // We search for finance/business and sort by the exact second they were published
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=finance+OR+business+OR+markets&language=en&sortBy=publishedAt&pageSize=50&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter out articles that have [Removed] titles or missing essential data
    const rawArticles = data.articles || [];
    const validArticles = rawArticles.filter(art => 
      art.title && 
      art.title !== "[Removed]" && 
      art.url && 
      art.urlToImage // This ensures our UI always has a photo
    );

    console.log(`✅ API Response received. Found ${validArticles.length} fresh articles.`);

    // 2. Map API data to your EXACT 10 columns
    const newsData = validArticles.map((article) => ({
      title: article.title,
      category: 'Finance', // Default category
      excerpt: article.description || 'Live market update received via terminal feed.',
      url: article.url,
      imageUrl: article.imageUrl || article.urlToImage, // Handles potential NewsAPI field differences
      author: article.author || 'Staff Writer',
      readTime: '3 min read',
      date: article.publishedAt || new Date().toISOString(),
      source: article.source.name || 'Financial News'
    }));

    console.log("💾 Upserting to Supabase...");

    // 3. Upsert based on URL to prevent duplicates
    const { error } = await supabase
      .from('news')
      .upsert(newsData, { 
        onConflict: 'url',
        ignoreDuplicates: false // This updates the entry if the same URL is found
      });

    if (error) {
      console.error("❌ SUPABASE ERROR:", error.message);
      throw error;
    }

    console.log("🚀 SUCCESS: Terminal synchronized with May 9 data.");

  } catch (err) {
    console.error("--- CRITICAL FAILURE ---");
    console.error(err.message);
    process.exit(1); 
  }
}

runAutomation();
