// scripts/fetch-news.js
console.log("--- SCRIPT STARTING ---");

const { createClient } = require('@supabase/supabase-js');

console.log("Checking Environment Variables...");
if (!process.env.SUPABASE_URL) console.error("MISSING: SUPABASE_URL");
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) console.error("MISSING: SUPABASE_SERVICE_ROLE_KEY");
if (!process.env.NEWS_API_KEY) console.error("MISSING: NEWS_API_KEY");

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runAutomation() {
  console.log("Initiating NewsAPI Fetch...");
  
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${process.env.NEWS_API_KEY}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NewsAPI Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`API Success: Found ${data.articles?.length || 0} articles.`);

    // Map to your 10 columns
    const newsData = data.articles.map(article => ({
      title: article.title,
      category: 'Finance',
      excerpt: article.description || '',
      url: article.url,
      imageUrl: article.urlToImage || '',
      author: article.author || 'Staff',
      readTime: '4 min',
      date: article.publishedAt,
      source: article.source.name
    }));

    console.log("Attempting Supabase Upsert...");
    const { error } = await supabase.from('news').upsert(newsData, { onConflict: 'url' });

    if (error) throw error;
    console.log("--- AUTOMATION COMPLETE: SUCCESS ---");

  } catch (err) {
    console.error("--- CRITICAL ERROR ---");
    console.error(err.message);
    process.exit(1);
  }
}

runAutomation();
