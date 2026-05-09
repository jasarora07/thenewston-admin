const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncCrypto() {
  console.log("📡 Terminal: Initiating Seamless Crypto Sync...");

  try {
    // 1. Fetch Top 20 Coins from CoinGecko
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    );
    const coins = await response.json();

    if (!Array.isArray(coins)) {
      console.log("⚠️ API Response:", coins);
      throw new Error("Rate limit hit or invalid response from CoinGecko.");
    }

    // 2. Prepare Data & Capture current symbols for cleanup
    const currentSymbols = coins.map(c => c.symbol.toUpperCase());
    const formattedAssets = coins.map((coin) => ({
      rank: coin.market_cap_rank,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change_24h: coin.price_change_percentage_24h || 0,
      market_cap: Math.round(coin.market_cap),
      volume_24h: Math.round(coin.total_volume),
      last_updated: new Date().toISOString()
    }));

    // 3. SEAMLESS UPSERT: Update prices in place
    const { error: upsertError } = await supabase
      .from('crypto_assets')
      .upsert(formattedAssets, { onConflict: 'symbol' });

    if (upsertError) throw upsertError;
    console.log("✅ Live Data Upserted.");

    // 4. CLEANUP: Remove any "ghost" assets not in the current Top 20
    const { error: deleteError } = await supabase
      .from('crypto_assets')
      .delete()
      .not('symbol', 'in', `(${currentSymbols.join(',')})`);

    if (deleteError) console.log("⚠️ Cleanup warning:", deleteError.message);
    
    console.log("🏁 Sync Cycle Complete.");

  } catch (err) {
    console.error("❌ Sync Failed:", err.message);
  }
}

syncCrypto();
