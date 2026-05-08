console.log("--- STARTING FETCH PROCESS ---");

const { createClient } = require('@supabase/supabase-js');

// Verify environment variables are reaching the script
if (!process.env.SUPABASE_URL) throw new Error("CRITICAL: SUPABASE_URL is missing from GitHub Secrets");

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    console.log("Calling NewsAPI...");
    const res = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await res.json();

    if (!data.articles) throw new Error("No articles found in API response");

    console.log(`Found ${data.articles.length} articles. Mapping to 10 columns...`);

    const mappedData = data.articles.map(art => ({
      title: art.title,
      category: 'Finance',
      excerpt: art.description || '',
      url: art.url,
      imageUrl: art.urlToImage || '',
      author: art.author || 'Staff',
      readTime: '3 min',
      date: art.publishedAt,
      source: art.source.name
    }));

    console.log("Uploading to Supabase...");
    const { error } = await supabase.from('news').upsert(mappedData, { onConflict: 'url' });

    if (error) throw error;
    console.log("--- SUCCESS: TERMINAL UPDATED ---");
  } catch (err) {
    console.error("--- ERROR DETECTED ---");
    console.error(err.message);
    process.exit(1);
  }
}

run();
