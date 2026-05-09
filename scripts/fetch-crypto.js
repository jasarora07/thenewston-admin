const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncCrypto() {
  console.log("🚀 Terminal: Starting Seamless Crypto Sync...");

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    );
    const coins = await response.json();

    if (!Array.isArray(coins)) throw new Error("Invalid API response");

    // 1. Prepare data for UPSERT
    const currentSymbols = coins.map(c => c.symbol.toUpperCase());
    const formattedAssets = coins.map((coin) => ({
      rank: coin.market_cap_rank,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change_24h: coin.price_change_percentage_24h || 0,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      last_updated: new Date().toISOString()
    }));

    // 2. SEAMLESS UPSERT: Update existing rows or add new ones
    // This ensures data is always present for the frontend
    const { error: upsertError } = await supabase
      .from('crypto_assets')
      .upsert(formattedAssets, { onConflict: 'symbol' });

    if (upsertError) throw upsertError;
    console.log("📡 Data Upserted: UI remains populated.");

    // 3. CLEANUP: Delete only the rows that are NOT in the new Top 20
    const { error: deleteError } = await supabase
      .from('crypto_assets')
      .delete()
      .not('symbol', 'in', `(${currentSymbols.join(',')})`);

    if (deleteError) console.error("⚠️ Cleanup failed, but data is fresh.");
    
    console.log("🏁 Sync Complete.");

  } catch (err) {
    console.error("❌ Sync Failed:", err.message);
  }
}

syncCrypto();
