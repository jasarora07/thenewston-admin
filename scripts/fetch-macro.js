const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const SERIES = [
  { id: 'FEDFUNDS', name: 'Federal Funds Rate', category: 'Rates' },
  { id: 'CPIAUCSL', name: 'Inflation (YoY)', category: 'Economy' }, // Will fetch % change
  { id: 'UNRATE', name: 'Unemployment Rate', category: 'Labor' },
  { id: 'GDPC1', name: 'Real GDP', category: 'Economy' } // Will fetch Trillions
];

async function updateMacro() {
  const apiKey = process.env.FRED_API_KEY;
  console.log("📊 Starting Professional Macro Sync...");

  for (const s of SERIES) {
    // pc1 = Percentage Change from Year Ago (Essential for Inflation)
    // lin = Levels (Direct values for Rates/GDP)
    const units = s.id === 'CPIAUCSL' ? 'pc1' : 'lin';
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${s.id}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1&units=${units}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (!data.observations?.length) continue;
      const latest = data.observations[0];

      await supabase.from('macro_data').upsert({
        symbol: s.id,
        indicator_name: s.name,
        value: parseFloat(latest.value).toFixed(2),
        date: latest.date,
        category: s.category
      }, { onConflict: 'symbol' });
      
      console.log(`✅ ${s.name}: ${latest.value}${units === 'pc1' ? '%' : ''}`);
    } catch (e) {
      console.error(`❌ Error ${s.name}:`, e.message);
    }
  }
}

updateMacro();
