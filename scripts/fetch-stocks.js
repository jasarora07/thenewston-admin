const { createClient } = require('@supabase/supabase-js');

// DEBUG: This will show in GitHub logs if the variables are landing
console.log("Checking Environment Variables...");
console.log("URL Present:", !!process.env.SUPABASE_URL);
console.log("Key Present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL || "", 
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
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
  
  if (!apiKey) {
    console.error("❌ ERROR: ALPHA_VANTAGE_KEY is missing.");
    process.exit(1);
  }

  for (const stock of STOCKS_TO_SYNC) {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Handle the "Information" or "Note" fields Alpha Vantage sends when rate limited
      if (data.Note || data.Information) {
        console.log(`⚠️ API Limit Reached: ${data.Note || data.Information}`);
        break; 
      }

      const quote = data['Global Quote'] || {};
      
      // Fallback values to prevent "image-style" blank crashes
      const price = parseFloat(quote['05. price']) || 0;
      const changeRaw = quote['10. change percent'] || "0%";
      const changePercent = parseFloat(changeRaw.replace('%', '')) || 0;

      const { error } = await supabase
        .from('stocks')
        .upsert({
          symbol: stock.symbol,
          name: stock.name || 'N/A',
          price: price,
          change_percent: changePercent,
          volume: quote['06. volume'] || "0",
          index_group: stock.group,
          last_updated: new Date().toISOString()
        }, { onConflict: 'symbol' });

      if (error) throw error;
      console.log(`✅ Synced ${stock.symbol}`);

      // Wait 15s to respect Alpha Vantage free tier (5 calls/min)
      await new Promise(resolve => setTimeout(resolve, 15000));

    } catch (err) {
      console.error(`❌ Error syncing ${stock.symbol}:`, err.message);
    }
  }
}

syncStocks();
