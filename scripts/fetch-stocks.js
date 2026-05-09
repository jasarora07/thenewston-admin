const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const STOCKS_TO_SYNC = [
  { symbol: 'AAPL', name: 'Apple Inc.', group: 'S&P 500' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', group: 'S&P 500' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', group: 'S&P 500' },
  { symbol: 'TSLA', name: 'Tesla Inc.', group: 'NASDAQ 100' },
  { symbol: 'META', name: 'Meta Platforms', group: 'NASDAQ 100' },
  { symbol: 'GS',   name: 'Goldman Sachs', group: 'Dow Jones' },
  { symbol: 'UNH',  name: 'UnitedHealth',  group: 'Dow Jones' }
];

async function syncStocks() {
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  
  if (!apiKey || !process.env.SUPABASE_URL) {
    console.error("❌ ERROR: Missing environment variables.");
    process.exit(1);
  }

  for (const stock of STOCKS_TO_SYNC) {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const quote = data['Global Quote'] || {}; // Fallback to empty object

      // Safe Parsing: If values are missing, use 0 or "N/A"
      const price = parseFloat(quote['05. price']) || 0;
      const changeRaw = quote['10. change percent'] || "0%";
      const changePercent = parseFloat(changeRaw.replace('%', '')) || 0;
      const volume = quote['06. volume'] || "0";

      const { error } = await supabase
        .from('stocks')
        .upsert({
          symbol: stock.symbol,
          name: stock.name || 'N/A',
          price: price,
          change_percent: changePercent,
          volume: volume,
          index_group: stock.group,
          last_updated: new Date().toISOString()
        }, { onConflict: 'symbol' });

      if (error) throw error;
      console.log(`✅ Synced ${stock.symbol}`);

      // Rate limit protection
      await new Promise(resolve => setTimeout(resolve, 15000));

    } catch (err) {
      console.error(`❌ Error ${stock.symbol}:`, err.message);
    }
  }
}

syncStocks();
