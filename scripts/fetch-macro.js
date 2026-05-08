const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SERIES = [
  { id: 'FEDFUNDS', name: 'Federal Funds Rate', category: 'Interest Rates' },
  { id: 'CPIAUCSL', name: 'Consumer Price Index (CPI)', category: 'Inflation' },
  { id: 'UNRATE', name: 'Unemployment Rate', category: 'Labor' },
  { id: 'GDPC1', name: 'Real GDP', category: 'Economy' }
];

async function updateMacro() {
  const apiKey = process.env.FRED_API_KEY;
  
  if (!apiKey) {
    console.error("❌ ERROR: FRED_API_KEY is missing.");
    return;
  }

  console.log("📊 Syncing Economic Indicators from FRED...");

  for (const s of SERIES) {
    try {
      const response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=${s.id}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`
      );

      const data = await response.json();

      if (data.observations && data.observations.length > 0) {
        const latest = data.observations[0];
        
        console.log(`✅ Fetched ${s.name}: ${latest.value}`);

        const { error } = await supabase.from('macro_data').upsert({
          symbol: s.id,
          indicator_name: s.name,
          value: parseFloat(latest.value).toFixed(2),
          date: latest.date,
          category: s.category,
        }, { onConflict: 'symbol' });

        if (error) throw error;
      }
    } catch (err) {
      console.error(`❌ Failed to sync ${s.name}:`, err.message);
    }
  }
  console.log("🚀 Macro Dashboard updated successfully.");
}

updateMacro();
