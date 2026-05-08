const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runAutomation() {
  const apiKey = process.env.NEWS_API_KEY;
  // Fetching business/finance news specifically
  const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsData = data.articles.map(article => ({
      title: article.title,
      category: 'Finance', // Default category
      excerpt: article.description || 'No description available.',
      url: article.url,
      imageUrl: article.urlToImage || 'https://via.placeholder.com/800x450',
      author: article.author || article.source.name,
      readTime: '3 min read', // Estimated
      date: article.publishedAt,
      source: article.source.name
    }));

    // Upsert into Supabase (prevents duplicates if URL is set as unique)
    const { error } = await supabase
      .from('news')
      .upsert(newsData, { onConflict: 'url' }); 

    if (error) throw error;
    console.log(`Successfully synced ${newsData.length} articles to the Terminal.`);

  } catch (err) {
    console.error('Automation failed:', err.message);
    process.exit(1);
  }
}

runAutomation();
