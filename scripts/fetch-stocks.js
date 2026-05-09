const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define the stocks you want to track by index group
const STOCKS_TO_SYNC = [
  // S&P 500
  { symbol: 'AAPL', name: 'Apple Inc.', group: 'S&P 500' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', group: 'S&P 500' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', group: 'S&P 500' },
  // NASDAQ 100
  { symbol: 'TSLA', name: 'Tesla Inc.', group: 'NASDAQ 100' },
  { symbol: 'META', name: 'Meta Platforms', group: 'NASDAQ 100' },
  // DOW JONES
  { symbol: 'GS',   name: 'Goldman Sachs', group: 'Dow Jones' },
  { symbol: 'UNH',  name: 'UnitedHealth',  group: 'Dow Jones' }
];

async function syncStocks() {
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  
  if (!apiKey) {
    console.error("❌ ERROR: ALPHA_VANTAGE_KEY is missing.");
    process.exit(1);
  }

  console.log(`🚀 Starting Sync for ${STOCKS_TO_SYNC.length} stocks...`);

  for (const stock of STOCKS_TO_SYNC) {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const quote = data['Global Quote'];

      if (!quote || Object.keys(quote).length === 0) {
        console.log(`⚠️ Skipping ${stock.symbol}: Rate limit hit or no data.`);
        continue;
      }

      // Prepare data for Supabase
      const stockUpdate = {
        symbol: stock.symbol,
        name: stock.name,
        price: parseFloat(quote['05. price']),
        change_percent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: quote['06. volume'],
        index_group: stock.group,
        last_updated: new Date().toISOString()
      };

      const { error } = await supabase
        .from('stocks')
        .upsert(stockUpdate, { onConflict: 'symbol' });

      if (error) throw error;

      console.log(`✅ Synced ${stock.symbol}: $${stockUpdate.price} (${stockUpdate.change_percent}%)`);

      // IMPORTANT: Alpha Vantage Free Tier limit is 5 calls per minute.
      // We wait 15 seconds between stocks to stay safe.
      console.log("⏱️ Waiting 15s for API rate limits...");
      await new Promise(resolve => setTimeout(resolve, 15000));

    } catch (err) {
      console.error(`❌ Failed to sync ${stock.symbol}:`, err.message);
    }
  }

  console.log("🏁 Stock Sync Completed.");
}

syncStocks();
