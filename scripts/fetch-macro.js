const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const SERIES = [
  { id: 'FEDFUNDS', name: 'Federal Funds Rate', category: 'Interest Rates' },
  { id: 'CPIAUCSL', name: 'Consumer Price Index (CPI)', category: 'Inflation' },
  { id: 'UNRATE', name: 'Unemployment Rate', category: 'Labor' },
  { id: 'GDPC1', name: 'Real GDP', category: 'Economy' }
];

async function updateMacro() {
  const apiKey = process.env.FRED_API_KEY;
  
  if (!apiKey) {
    console.error("❌ ERROR: FRED_API_KEY is missing from environment variables.");
    process.exit(1); 
  }

  console.log("📊 Starting FRED Sync...");

  for (const s of SERIES) {
    try {
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${s.id}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`FRED API returned status ${res.status}`);
      
      const data = await res.json();
      
      if (!data.observations || data.observations.length === 0) {
        console.log(`⚠️ No data found for ${s.name}`);
        continue;
      }

      const latest = data.observations[0];

      const { error } = await supabase.from('macro_data').upsert({
        symbol: s.id,
        indicator_name: s.name,
        value: parseFloat(latest.value).toFixed(2),
        date: latest.date,
        category: s.category
      }, { onConflict: 'symbol' });

      if (error) throw error;
      
      console.log(`✅ Updated ${s.name}: ${latest.value}%`);
    } catch (e) {
      console.error(`❌ Failed ${s.name}:`, e.message);
      // We don't exit here so it can try the next indicator
    }
  }
  console.log("🏁 Sync attempt finished.");
}

updateMacro();
