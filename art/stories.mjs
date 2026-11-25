// Every story below is dated 25 November 2026 (UTC): it happened, was first
// reported, or is on that day's official calendar (FORECAST).

export const DAY = {
  weekday: 'Wednesday',
  dateline: '25 NOVEMBER 2026',
  short: 'Wed 25 Nov 2026',
  iso: '2026-11-25',
  closed: '01:05 UTC',
};

const S = (region, place, field, sure, src, head, text, lat, lon, more = {}) => ({ region, place, field, sure, src, head, text, lat, lon, ...more });

export const LEADS = [
  S('Asia', 'Jiuquan, China', 'space', 'CONFIRMED', 'Xinhua / CMSA',
    'Shenzhou-24 lifts off carrying China’s first foreign astronaut',
    'A Long March-2F rose from Jiuquan with Pakistan’s Muhammad Zeeshan Ali beside Tang Hongbo and Wu Yi: the 41st crewed Chinese mission, bound for Tiangong.',
    40.96, 100.29, { t: '00:18', tl: 'Shenzhou-24 up', pic: { main: 'rocket', side: ['globe', 'shield'], big: '41st', bigNote: 'crewed mission' } }),
  S('Oceania', 'Flinders Island, Tasmania', 'disaster', 'OFFICIAL', 'Tas Fire Service / ABC',
    'Bushfire emergency on Flinders Island: “too late to leave”',
    'Tasmania Fire Service put Killiecrankie, Leeka and Mount Tanner under an emergency warning and told residents and tourists to shelter in place.',
    -39.85, 148.05, { t: '00:14', tl: 'Flinders fire', pic: { main: 'flame', side: ['storm', 'leaf'], big: '3', bigNote: 'localities warned' } }),
  S('North America', 'Washington, USA', 'economy', 'FORECAST', 'BEA / DOL calendar',
    'Thanksgiving-eve data pile: GDP, PCE, durable goods, claims',
    'Q3 GDP second estimate (seen ~3.4% annualised), October PCE inflation, durable goods and jobless claims all land at 13:30 UTC, a day early for the holiday.',
    38.9, -77.04, { t: '13:30', tl: 'US data', pic: { main: 'chartUp', side: ['bank', 'coin'], big: '4', bigNote: 'US releases at once' } }),
];

export const CARDS = [
  S('Oceania', 'Canberra', 'economy', 'FORECAST', 'ABS', 'Australia’s October CPI due', 'September ran 4.3% y/y; trimmed mean 3.6%.', -35.28, 149.13, { icon: 'chartUp', t: '00:30', tl: 'AU CPI' }),
  S('Europe', 'Brussels', 'politics', 'FORECAST', 'EU agenda', 'EU–Western Balkans summit', 'Leaders meet a day before the 26–27 Nov European Council.', 50.84, 4.38, { icon: 'dove' }),
  S('Europe', 'Strasbourg', 'health', 'FORECAST', 'EP agenda', 'MEPs vote EU pharma reform', 'Critical Medicines Act also up in plenary.', 48.6, 7.77, { icon: 'health' }),
  S('Europe', 'Paris', 'sport', 'FORECAST', 'UEFA', 'PSG v Roma in the Champions League', 'One of 9 matchday-5 games on Wednesday.', 48.84, 2.25, { icon: 'ball', t: '20:00', tl: 'UCL 9 games' }),
  S('Africa', 'Johannesburg', 'weather', 'OFFICIAL', 'SAWS', 'Level 4 storm warning, 4 provinces', 'Gauteng, Limpopo, Mpumalanga, North West: hail, floods.', -26.2, 28.05, { icon: 'storm' }),
  S('Africa', 'Accra', 'business', 'FORECAST', 'Summit organisers', 'Germany–Africa Business Summit closes', 'Last day of the 23–25 Nov meeting in Ghana.', 5.6, -0.19, { icon: 'podium' }),
  S('Latin America', 'Mexico City', 'rights', 'FORECAST', 'UN Women', 'Day against violence on women', 'Marches open 16 Days of Activism, to 10 Dec.', 19.43, -99.13, { icon: 'ribbon' }),
  S('Middle East', 'Ajman, UAE', 'sport', 'FORECAST', 'ICC', 'Emerging Nations final: SL v Ireland', 'Women’s trophy decided at Karwan ground.', 25.4, 55.48, { icon: 'ball', t: '05:00', tl: 'ICC final' }),
  S('Asia', 'Taipei', 'politics', 'REPORTED', 'Japan Times', 'Taiwan vote seen as test for Lai', 'Saturday’s local polls shape the 2028 race.', 25.03, 121.56, { icon: 'ballot' }),
  S('Asia', 'Tokyo', 'culture', 'FORECAST', 'Pageant organisers', 'Miss International crowned in Tokyo', '73 entrants at Tokyo Dome City Hall.', 35.7, 139.75, { icon: 'podium' }),
  S('Europe', 'Madrid', 'politics', 'FORECAST', 'Euro Weekly', 'Spain’s snap-poll campaign, final week', 'Vote is on Sunday 29 Nov.', 40.42, -3.7, { icon: 'megaphone' }),
  S('North America', 'Washington', 'economy', 'FORECAST', 'Federal Reserve', 'Fed Beige Book released', 'Regional snapshot ahead of the December FOMC.', 38.89, -77.05, { icon: 'bank', t: '19:00', tl: 'Beige Book' }),
];

const B = (region, field, sure, src, head, lat, lon, more) => S(region, '', field, sure, src, head, '', lat, lon, more);

export const BRIEFS = [
  B('North America', 'economy', 'FORECAST', 'DOL', 'US jobless claims moved to Wednesday (~201K seen)', 38.9, -77),
  B('North America', 'economy', 'FORECAST', 'Census', 'US October durable goods orders', 38.9, -77),
  B('North America', 'economy', 'FORECAST', 'BEA', 'US October PCE inflation, income, spending', 38.9, -77),
  B('North America', 'economy', 'FORECAST', 'Census', 'US October new home sales', 38.9, -77, { t: '15:00', tl: 'new homes' }),
  B('North America', 'markets', 'FORECAST', 'NYSE', 'Last full US trading day before Thanksgiving', 40.7, -74),
  B('North America', 'sport', 'FORECAST', 'NBA', 'NBA Cup: Pistons at Magic, Orlando can clinch', 28.5, -81.4),
  B('North America', 'sport', 'FORECAST', 'NBA', 'NBA Cup: Mavericks at Nuggets, both 2–0', 39.7, -105, { t: '03:00', tl: 'NBA Cup' }),
  B('North America', 'sport', 'FORECAST', 'NHL', 'NHL: Golden Knights at Oilers in Edmonton', 53.5, -113.5),
  B('Europe', 'politics', 'FORECAST', 'EP', 'Metsola signs 2027 EU budget into law', 48.6, 7.77),
  B('Europe', 'conflict', 'FORECAST', 'EP', 'MEPs debate “securing peace for Ukraine”', 48.6, 7.77),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Sabah v Barcelona in Baku', 40.4, 49.9, { t: '17:45', tl: 'UCL early' }),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Slavia Prague v Villarreal', 50.1, 14.5),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Club Brugge v Liverpool', 51.2, 3.2),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Sporting CP v Manchester United', 38.8, -9.2),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Lille v Bayern Munich', 50.6, 3.1),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Inter v VfB Stuttgart', 45.5, 9.1),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Atlético Madrid v Viking', 40.4, -3.6),
  B('Europe', 'sport', 'FORECAST', 'UEFA', 'UCL: Shakhtar Donetsk v Fenerbahçe', 50.1, 19.9),
  B('Europe', 'culture', 'FORECAST', 'EP', 'LUX Audience Film Award 2027 shortlist', 48.6, 7.77),
  B('Europe', 'disaster', 'FORECAST', 'EU agenda', 'Disaster Resilience Days, Munich, day 2', 48.1, 11.6),
  B('Asia', 'defence', 'OFFICIAL', 'PNA', 'Marcos: Philippine Navy to get new ships, submarines', 14.6, 121),
  B('Asia', 'disaster', 'OFFICIAL', 'PNA', 'Marcos orders aid to 23,000 flooded Maguindanao homes', 6.95, 124.4),
  B('Asia', 'space', 'FORECAST', 'CMSA', 'Shenzhou-24 set to dock at Tianhe forward port', 41, 100.3),
  B('Asia', 'sport', 'FORECAST', 'AFC', 'ACL Elite: Kashima Antlers v Jeonbuk', 36, 140.6),
  B('Asia', 'sport', 'FORECAST', 'AFC', 'ACL Elite: Gamba Osaka v Port FC', 34.8, 135.5),
  B('Asia', 'sport', 'FORECAST', 'CricketTimes', 'Women’s T20I: Malaysia v China, Kuala Lumpur', 3.1, 101.5, { t: '02:00', tl: 'KL T20I' }),
  B('Oceania', 'sport', 'FORECAST', 'CA', 'WBBL: Melbourne Renegades v Brisbane Heat', -37.8, 145, { t: '04:40', tl: 'WBBL' }),
  B('Asia', 'diplomacy', 'REPORTED', 'Daily Star', 'UN Security Council meets on ICJ Rohingya ruling', 20.1, 93),
  B('Europe', 'sport', 'FORECAST', 'EFE', 'Davis Cup Final 8: Italy v South Korea, Bologna', 44.5, 11.3, { t: '15:00', tl: 'Davis Cup' }),
  B('Middle East', 'sport', 'FORECAST', 'FIFA', 'U-17 World Cup, Qatar: Ecuador v Korea, Panama v Egypt', 25.3, 51.4),
  B('Africa', 'diplomacy', 'FORECAST', 'EFE', 'Germany’s Steinmeier meets Ruto in Nairobi', -1.29, 36.8),
  B('Latin America', 'politics', 'FORECAST', 'EFE', 'Machado meets students at Venezuela’s UCV', 10.5, -66.9),
  B('Latin America', 'culture', 'FORECAST', 'EFE', 'Peru’s scissors dancers gather at Congress', -12.05, -77),
  B('Latin America', 'energy', 'FORECAST', 'EFE', 'Mercosur–Chile gas project closes in Montevideo', -34.9, -56.2),
  B('Middle East', 'sport', 'FORECAST', 'ILT20', 'ILT20: Dubai Capitals v Desert Vipers', 25.1, 55.2, { t: '14:30', tl: 'ILT20' }),
];

export const DATECHECK = [
  { when: '24 Nov', what: 'White House turkey pardon' },
  { when: '24 Nov', what: 'Zaporizhzhia flats strike, 2 dead' },
  { when: '24 Nov', what: 'Cartagena supermarket hostages' },
  { when: '24 Nov', what: 'Nikkei +3.9% to 58,644' },
  { when: '24 Nov', what: 'Houthi drone hits Riyadh tower' },
  { when: '24 Nov', what: 'CAS gives AFCON title to Senegal' },
  { when: '24 Nov', what: 'Ras Al Khaimah bus crash, 13 dead' },
  { when: '26 Nov', what: 'Bank of Korea rate call (tomorrow)' },
  { when: '28 Nov', what: 'Taiwan local vote; Libertadores final' },
];

export const SOURCES = 'Xinhua, CMSA, Tasmania Fire Service, ABC, ABS, BEA, US Labor Dept, Census Bureau, Federal Reserve, NYSE, EU agenda, European Parliament, UEFA, SAWS, UN Women, ICC, AFC, Japan Times, PNA, Daily Star, EFE, FIFA, NBA, NHL · each item checked against a report or calendar dated 25 Nov 2026 UTC';
