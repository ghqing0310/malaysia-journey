import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CloudRain,
  Coffee,
  Dumbbell,
  Expand,
  Hotel,
  MapPin,
  Menu,
  Music2,
  Palmtree,
  Plane,
  Play,
  Shirt,
  Sparkles,
  SunMedium,
  Sunset,
  Utensils,
  Waves,
  X,
} from 'lucide-react';
import sourceItinerary from './assets/source-itinerary.png';
import day1Photos from './assets/day-1-photos.png';
import day2Photos from './assets/day-2-photos.png';
import day3Photos from './assets/day-3-photos.png';
import day4Photos from './assets/day-4-photos.png';
import day5Photos from './assets/day-5-photos.png';
import malaysiaHero from './assets/malaysia-hero.png';
import './styles.css';

const tripDays = [
  {
    date: '9/24',
    weekday: '周四',
    weather: '25°–30°',
    weatherText: '阵雨',
    icon: CloudRain,
    kicker: '城市初见',
    title: '上海 → 吉隆坡',
    subtitle: '双子塔逛吃 · 51 楼无边泳池 · 健身',
    accent: 'cobalt',
    events: [
      { time: '09:25', icon: Plane, title: '上海浦东机场 T1 起飞', detail: '东航 MU8641，实际承运上航 FM885，含正餐', tag: '飞行约 5.5 小时' },
      { time: '14:50', icon: MapPin, title: '抵达吉隆坡国际机场 T1', detail: '入境通关约 40–60 分钟，机场 Grab 前往酒店', tag: '车程 40–50 分钟' },
      { time: '傍晚', icon: Sunset, title: '双子塔与高空泳池', detail: '18:00 前后光线柔和，适合 51 楼泳池拍照', tag: '日落 19:09' },
    ],
    hotel: '吉隆坡帝国酒店',
    hotelMeta: '市中心 · 24 小时健身房',
    food: [
      '精致正餐：Soham 本地特色菜（需提前 1–2 周预约）',
      '阿罗街黄亚华烧烤：烤鸡翅、沙爹、魔鬼鱼，人均约 50 马币',
    ],
    outfit: '长途飞行选宽松透气衣物，备泳衣、拖鞋；当地冷气足，室内带一件薄外套。',
    notes: ['提前准备返程行程单与酒店订单', '泳池 22:00 关闭，17–19 点为高峰', '下载 Grab，支付宝可直接使用'],
    mood: '城市灯火',
    photo: day1Photos,
    photoTitle: '双子塔与无边泳池',
    photoCaption: '傍晚先拍城市天际线，再用泳池水面做前景；蓝调时刻最出片。',
  },
  {
    date: '9/25',
    weekday: '周五',
    weather: '25°–31°',
    weatherText: '阵雨',
    icon: CloudRain,
    kicker: '跨海换城',
    title: '吉隆坡 → 亚庇',
    subtitle: '市区打卡 · 凯悦健身 · 秘境池畔夕阳',
    accent: 'coral',
    events: [
      { time: '12:00', icon: Hotel, title: '帝国酒店退房', detail: 'Grab 前往吉隆坡国际机场 T2 航站楼', tag: '车程约 1 小时' },
      { time: '14:05', icon: Plane, title: '飞往亚庇', detail: '亚航 AK5116，空客 320-NEO，无餐食', tag: '飞行约 2.5 小时' },
      { time: '16:45', icon: MapPin, title: '抵达亚庇机场 T1', detail: '入境约 30 分钟，Grab 前往凯悦尚萃酒店', tag: '车程约 15 分钟' },
    ],
    hotel: '亚庇凯悦尚萃酒店',
    hotelMeta: '市区 · 海景泳池',
    food: [
      '午餐：机场或市区顺路简餐',
      '华记冰室：经典南洋冰品、吐司',
      '晚餐：海王城海鲜，油左步行 5 分钟，人均约 120 马币',
    ],
    outfit: '短途飞行穿轻便衣物；泳衣用于泳池拍夕阳，市区逛街可加一件薄外搭。',
    notes: ['吉隆坡 T2 航站楼，T1 转 T2 需预留 2 小时', '高空泳池日落黄金时段 17:30–18:30', '提前确认次日 Kawa 团酒店接站时间'],
    mood: '南洋夕照',
    photo: day2Photos,
    photoTitle: '南洋穿搭与池畔晚霞',
    photoCaption: '利用棕榈、石墙与酒店窗框做取景框，日落前后各留一组照片。',
  },
  {
    date: '9/26',
    weekday: '周六',
    weather: '25°–32°',
    weatherText: '阴天',
    icon: SunMedium,
    kicker: '雨林与萤火',
    title: '亚庇 → 太平洋丝绸',
    subtitle: '沉浸泳池 · Kawa 红树林 · 萤火虫一日游',
    accent: 'leaf',
    events: [
      { time: '10:30', icon: Coffee, title: '凯悦退房，酒店用餐', detail: '打车前往太平洋丝绸酒店，寄存行李后玩沙滩泳池', tag: '慢享上午' },
      { time: '12:30', icon: Palmtree, title: 'Kawa 红树林出发', detail: '清真寺、长鼻猴、晚霞拍摄与萤火虫体验', tag: '已安排接送' },
      { time: '21:30', icon: BedDouble, title: '返回酒店办理入住', detail: '结束后送回太平洋丝绸酒店', tag: '轻松收尾' },
    ],
    hotel: '太平洋丝绸酒店',
    hotelMeta: '丹绒亚路 · 沙滩泳池',
    food: [
      '上午：凯悦 Pool Bar，主打三明治、椰汁、水果碗',
      '晚餐：红树林行程包含河畔自助晚餐',
      '夜宵：酒店附近 24 小时茶餐室，可打包肉骨茶、吐司',
    ],
    outfit: '白天泳衣＋防晒衣；清真寺准备长裤或长裙；红树林蚊虫多，带防蚊液和薄外套。',
    notes: ['寄存行李，15:00 后办理正式入住', '必备驱蚊水、浴巾、拖鞋、防晒与晕车药', '水上清真寺门票约 5 马币'],
    mood: '雨林微光',
    photo: day3Photos,
    photoTitle: '霞光人像与夜色水面',
    photoCaption: '暖色天空适合近景人像，入夜后用水面反光营造更有故事感的画面。',
  },
  {
    date: '9/27',
    weekday: '周日',
    weather: '25°–32°',
    weatherText: '阵雨',
    icon: CloudRain,
    kicker: '向海而行',
    title: '跳岛一日游',
    subtitle: '红树林之外 · 浮潜 · 丹绒亚路日落 · 健身',
    accent: 'aqua',
    events: [
      { time: '07:30', icon: Waves, title: '酒店私人码头集合', detail: '登录出发跳岛，沙比岛与马穆迪岛路线', tag: '海上半日' },
      { time: '15:30–16:00', icon: Waves, title: '返程靠岸', detail: 'Grab 前往丹绒亚路海滩', tag: '车程约 10 分钟' },
      { time: '18:40', icon: Sunset, title: '看完日落返回酒店', detail: '晚上可健身、泳池或放松', tag: '日落约 18:00' },
    ],
    hotel: '太平洋丝绸酒店',
    hotelMeta: '连住第 2 晚',
    food: [
      '岛上午餐：视当天安排或自助午餐',
      '香格里拉 Sunset Bar：日落位，人均约 150 马币',
      '大茄来海鲜：市区知名海鲜店，人均约 130 马币',
      '香格里拉香宫：粤菜与式烧腊，人均约 200 马币',
    ],
    outfit: '浮潜穿速干泳衣＋防晒衣，准备换洗衣物、拖鞋和毛巾；傍晚海风大，带薄外套。',
    notes: ['跳岛需自行前往 DBKK 码头，07:10 前登记', '必备晕船药、防晒霜、手机防水袋与换洗衣物', '珊瑚注意划伤，天气多变可能调整浮潜点'],
    mood: '海岛蓝调',
    photo: day4Photos,
    photoTitle: '海岛穿搭与沙滩机位',
    photoCaption: '白色、浅灰和卡其最衬海水；低机位拍摄能把天空和海岸线一起收进画面。',
  },
  {
    date: '9/28',
    weekday: '周一',
    weather: '25°–32°',
    weatherText: '阴天',
    icon: SunMedium,
    kicker: '山野终章',
    title: '神山一日游 → 上海',
    subtitle: '滑翔伞 · ATV · 奶牛牧场 · 景点打卡',
    accent: 'ochre',
    events: [
      { time: '07:00', icon: Palmtree, title: '酒店大堂集合', detail: '神山一日游专车接驾，牛场、滑翔伞、ATV 等路线', tag: '车程约 2.5 小时' },
      { time: '19:30–20:00', icon: Plane, title: '抵达机场，办理值机', detail: '亚庇 T1 → 上海浦东 T1，东航 MU8415 / 实际承运上航 FM7224', tag: '次日 04:00 抵达' },
    ],
    hotel: '航班上',
    hotelMeta: '红眼航班 · 含茶点',
    food: [
      '行程含 Desa View 娘惹午餐',
      '观景台可自费烤山猪肉、手工拉茶',
      '返程可在机场简餐',
    ],
    outfit: '穿舒适运动鞋，山上气温低采用分层穿搭；准备薄外套，博物馆方便增减。',
    notes: ['滑翔伞、ATV 受天气影响，雨天取消无退款', '盘山路易晕车，提前备药；返程高峰注意堵车', '20:00 前必须抵达机场，预留 2.5 小时值机安检'],
    mood: '山雾与归途',
    photo: day5Photos,
    photoTitle: '神山与牧场的清新画面',
    photoCaption: '山间光线柔和，帽子和牛仔元素很适合牧场；阴天也能保留细腻层次。',
  },
];

const packingItems = [
  { id: 'passport', label: '护照与电子签', group: '证件' },
  { id: 'swim', label: '泳衣与速干衣', group: '海岛' },
  { id: 'sunscreen', label: '防晒霜与遮阳帽', group: '海岛' },
  { id: 'mosquito', label: '防蚊液', group: '雨林' },
  { id: 'medicine', label: '晕车 / 晕船药', group: '健康' },
  { id: 'adapter', label: '英标转换插头', group: '电子' },
];

function IconBadge({ icon: Icon }) {
  return <span className="icon-badge"><Icon size={17} strokeWidth={1.8} /></span>;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSource, setShowSource] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showMusic, setShowMusic] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mala-checklist')) || {}; } catch { return {}; }
  });
  const active = tripDays[activeIndex];
  const completed = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  useEffect(() => {
    localStorage.setItem('mala-checklist', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    const onKey = (event) => {
      if ((showSource || activePhoto) && event.key === 'Escape') {
        setShowSource(false);
        setActivePhoto(null);
      }
      if (!showSource && !activePhoto && event.key === 'ArrowRight') setActiveIndex((v) => Math.min(v + 1, tripDays.length - 1));
      if (!showSource && !activePhoto && event.key === 'ArrowLeft') setActiveIndex((v) => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showSource, activePhoto]);

  return (
    <div className="app-shell" style={{ '--malaysia-hero': `url(${malaysiaHero})` }}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">M</span>
          <span><strong>MALA</strong><small>慢游手记</small></span>
        </a>
        <nav className={mobileNav ? 'nav-links is-open' : 'nav-links'}>
          <a href="#journey" onClick={() => setMobileNav(false)}>每日行程</a>
          <a href="#overview" onClick={() => setMobileNav(false)}>路线总览</a>
          <a href="#checklist" onClick={() => setMobileNav(false)}>出发清单</a>
        </nav>
        <div className="nav-actions">
          <button className="ghost-button source-button" onClick={() => setShowSource(true)}>
            <Expand size={16} /> 原始行程图
          </button>
          <button className="menu-button" onClick={() => setMobileNav(!mobileNav)} aria-label="打开菜单">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-stage">
        <div className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> 5 DAYS · MALAYSIA</div>
            <h1>从城市天际线，<br /><em>走进婆罗洲的风。</em></h1>
            <p>一份从上海出发，串联吉隆坡、亚庇、海岛与神山的五日轻旅行手记。</p>
            <div className="hero-actions">
              <a className="primary-button" href="#journey">开始看行程 <ArrowRight size={17} /></a>
              <button className="text-button" onClick={() => setShowSource(true)}>对照原始表格</button>
            </div>
            <div className="quick-stats">
              <div><strong>5</strong><span>天旅程</span></div>
              <div><strong>3</strong><span>座城市</span></div>
              <div><strong>2</strong><span>段飞行</span></div>
              <div><strong>01</strong><span>次跳岛</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="旅行路线卡片">
            <div className="sun-orbit"></div>
            <div className="route-card">
              <div className="route-card-head"><span>SEP · ITINERARY</span><span>05 DAYS</span></div>
              <div className="map-doodle">
                <span className="place place-sh">上海</span>
                <span className="place place-kl">吉隆坡</span>
                <span className="place place-kk">亚庇</span>
                <div className="route-line line-one"></div>
                <div className="route-line line-two"></div>
                <Plane className="plane-mark" size={28} fill="currentColor" />
              </div>
              <div className="route-footer"><MapPin size={14} /> 24 SEP — 28 SEP</div>
            </div>
            <div className="postcard small-card-one"><Palmtree size={32} /><span>SABAH</span></div>
            <div className="postcard small-card-two"><Waves size={30} /><span>ISLAND</span></div>
          </div>
        </div>
        </section>

        <section className="day-switcher-wrap" id="journey">
          <div className="day-switcher section-wrap" role="tablist" aria-label="选择旅行日期">
            {tripDays.map((day, index) => {
              const WeatherIcon = day.icon;
              return (
                <button
                  key={day.date}
                  className={activeIndex === index ? 'day-tab active' : 'day-tab'}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={activeIndex === index}
                >
                  <span className="day-number">{day.date}</span>
                  <span className="day-meta">{day.weekday} · {day.weatherText}</span>
                  <WeatherIcon size={18} />
                </button>
              );
            })}
          </div>
        </section>

        <section className={`day-detail section-wrap accent-${active.accent}`}>
          <div className="section-heading">
            <div>
              <span className="section-index">DAY {String(activeIndex + 1).padStart(2, '0')}</span>
              <p className="section-kicker">{active.kicker}</p>
              <h2>{active.title}</h2>
              <p>{active.subtitle}</p>
            </div>
            <div className="weather-pill"><active.icon size={22} /><span>{active.weather}<small>{active.weatherText}</small></span></div>
          </div>

          <button className="photo-story" onClick={() => setActivePhoto(active)} aria-label={`放大查看${active.photoTitle}`}>
            <div className="photo-story-copy">
              <span className="photo-overline">PHOTO NOTES · 原图提取</span>
              <h3>{active.photoTitle}</h3>
              <p>{active.photoCaption}</p>
              <span className="photo-action"><Expand size={15} /> 点击放大</span>
            </div>
            <div className="photo-frame" key={active.date}>
              <img src={active.photo} alt={`${active.date} ${active.photoTitle}拍照参考`} />
              <span className="photo-date">DAY 0{activeIndex + 1} · {active.date}</span>
            </div>
          </button>

          <div className="detail-grid">
            <article className="timeline-panel">
              <div className="panel-title"><CalendarDays size={19} /><span>今日时间线</span></div>
              <div className="timeline">
                {active.events.map((event, index) => (
                  <div className="timeline-item" key={`${active.date}-${event.time}`}>
                    <div className="timeline-time">{event.time}</div>
                    <div className="timeline-node"><event.icon size={17} /></div>
                    <div className="timeline-content">
                      <h3>{event.title}</h3>
                      <p>{event.detail}</p>
                      <span>{event.tag}</span>
                    </div>
                    {index !== active.events.length - 1 && <div className="timeline-stem" />}
                  </div>
                ))}
              </div>
              <div className="day-mood">
                <span>今日关键词</span>
                <strong>{active.mood}</strong>
                <div className="mood-line"></div>
              </div>
            </article>

            <div className="info-grid">
              <article className="info-card hotel-card">
                <IconBadge icon={BedDouble} />
                <span className="card-label">今晚住这里</span>
                <h3>{active.hotel}</h3>
                <p>{active.hotelMeta}</p>
              </article>
              <article className="info-card outfit-card">
                <IconBadge icon={Shirt} />
                <span className="card-label">穿搭建议</span>
                <p>{active.outfit}</p>
              </article>
              <article className="info-card food-card">
                <div className="card-topline"><IconBadge icon={Utensils} /><span className="card-label">今天吃什么</span></div>
                <div className="food-list">
                  {active.food.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
                </div>
              </article>
              <article className="info-card note-card">
                <div className="card-topline"><IconBadge icon={CircleAlert} /><span className="card-label">出发前记得</span></div>
                <ul>{active.notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </article>
            </div>
          </div>

          <div className="day-nav">
            <button onClick={() => setActiveIndex((v) => Math.max(v - 1, 0))} disabled={activeIndex === 0}><ChevronLeft size={17} /> 前一天</button>
            <span>{activeIndex + 1} / {tripDays.length}</span>
            <button onClick={() => setActiveIndex((v) => Math.min(v + 1, tripDays.length - 1))} disabled={activeIndex === tripDays.length - 1}>后一天 <ChevronRight size={17} /></button>
          </div>
        </section>

        <section className="overview-section" id="overview">
          <div className="section-wrap">
            <div className="mini-heading"><span>THE WHOLE JOURNEY</span><h2>五天，一条渐入自然的路线</h2></div>
            <div className="overview-track">
              {tripDays.map((day, index) => (
                <button key={day.date} className="overview-stop" onClick={() => { setActiveIndex(index); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="stop-index">0{index + 1}</span>
                  <span className="stop-dot"></span>
                  <span className="stop-date">{day.date} · {day.weekday}</span>
                  <strong>{day.title}</strong>
                  <small>{day.kicker}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="checklist-section section-wrap" id="checklist">
          <div className="checklist-copy">
            <span className="section-index">BEFORE YOU GO</span>
            <h2>把期待装进行李箱</h2>
            <p>勾选状态会保存在当前设备。出门前，再做一次轻量确认。</p>
            <div className="progress-copy"><span>准备进度</span><strong>{completed} / {packingItems.length}</strong></div>
            <div className="progress-track"><span style={{ width: `${(completed / packingItems.length) * 100}%` }}></span></div>
          </div>
          <div className="checklist-card">
            {packingItems.map((item) => (
              <label className={checked[item.id] ? 'check-item checked' : 'check-item'} key={item.id}>
                <input type="checkbox" checked={Boolean(checked[item.id])} onChange={(event) => setChecked({ ...checked, [item.id]: event.target.checked })} />
                <span className="custom-check">{checked[item.id] && <Check size={15} />}</span>
                <span className="check-label"><strong>{item.label}</strong><small>{item.group}</small></span>
              </label>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="section-wrap footer-inner">
          <div className="brand footer-brand"><span className="brand-mark">M</span><span><strong>MALA</strong><small>慢游手记</small></span></div>
          <p>吉隆坡 · 亚庇 · 神山<br />愿每一次出发，都轻盈又尽兴。</p>
          <button className="ghost-button" onClick={() => setShowSource(true)}><Expand size={16} /> 查看原始行程图</button>
        </div>
      </footer>

      <aside className={showMusic ? 'music-dock is-open' : 'music-dock'} aria-label="背景音乐播放器">
        {showMusic ? (
          <div className="music-panel">
            <div className="music-panel-head">
              <div className="music-title">
                <span className="music-disc"><Music2 size={16} /></span>
                <span><small>TRIP SOUNDTRACK</small><strong>打火机 · Penny</strong></span>
              </div>
              <button onClick={() => setShowMusic(false)} aria-label="收起音乐播放器"><X size={17} /></button>
            </div>
            <a
              className="music-load"
              href="https://music.douyin.com/qishui/share/track?track_id=7512402632118503441"
              target="_blank"
              rel="noreferrer"
              aria-label="在汽水音乐打开 Penny《打火机》"
            >
              <span><Play size={17} fill="currentColor" /></span>
              <span><strong>在汽水音乐播放</strong><small>抖音官方歌曲页 · 点击打开</small></span>
              <ArrowRight className="music-arrow" size={17} />
            </a>
            <div className="music-links">
              <span>将在新页面打开，不影响当前行程</span>
            </div>
          </div>
        ) : (
          <button className="music-fab" onClick={() => setShowMusic(true)} aria-label="打开背景音乐">
            <Music2 size={19} /><span>播放《打火机》</span>
          </button>
        )}
      </aside>

      {showSource && (
        <div className="modal-backdrop" onClick={() => setShowSource(false)} role="presentation">
          <div className="source-modal" role="dialog" aria-modal="true" aria-label="原始行程图" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head"><div><span>ORIGINAL PLAN</span><h2>原始行程表</h2></div><button onClick={() => setShowSource(false)} aria-label="关闭"><X size={21} /></button></div>
            <div className="source-scroll"><img src={sourceItinerary} alt="9 月 24 日至 28 日马来西亚五日行程原始表格" /></div>
            <p className="modal-hint">可横向滚动查看完整表格 · 按 Esc 关闭</p>
          </div>
        </div>
      )}

      {activePhoto && (
        <div className="modal-backdrop photo-backdrop" onClick={() => setActivePhoto(null)} role="presentation">
          <div className="photo-modal" role="dialog" aria-modal="true" aria-label={activePhoto.photoTitle} onClick={(event) => event.stopPropagation()}>
            <button className="photo-close" onClick={() => setActivePhoto(null)} aria-label="关闭照片"><X size={22} /></button>
            <img src={activePhoto.photo} alt={`${activePhoto.date} ${activePhoto.photoTitle}拍照参考大图`} />
            <div className="photo-modal-caption"><span>{activePhoto.date} · {activePhoto.kicker}</span><h2>{activePhoto.photoTitle}</h2><p>{activePhoto.photoCaption}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
