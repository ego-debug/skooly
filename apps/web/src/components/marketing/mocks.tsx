'use client';

import { useEffect, useState } from 'react';
import { Icon } from './icon';

export function AttendanceCard({
  status = 'present',
  time = '9:05 AM',
}: {
  status?: 'present' | 'late';
  time?: string;
}) {
  const labels = {
    present: { label: 'Present', dot: '#10b981', cls: '' },
    late: { label: 'Arrived late', dot: '#f59e0b', cls: 'late' },
  };
  const c = labels[status];
  return (
    <div className="ui-card">
      <div className="ui-card-head">
        <span className="dot" style={{ background: c.dot }} />
        <span className="label">Attendance</span>
      </div>
      <div className="ui-card-body">
        <div className="attendance-row">
          <div className={`attendance-status ${c.cls}`}>{c.label}</div>
          <div className="attendance-time">Arrived {time}</div>
        </div>
      </div>
    </div>
  );
}

export function HifzCard({
  playing: forcedPlaying = false,
  surah = 'Surah Al-Fatihah',
  range = 'Ayah 5 – 7',
  stream = 'Sabak',
  duration = 47,
  teacher = 'Sister Sumayya',
}: {
  playing?: boolean;
  surah?: string;
  range?: string;
  stream?: string;
  duration?: number;
  teacher?: string;
}) {
  const [playing, setPlaying] = useState(!!forcedPlaying);
  const [progress, setProgress] = useState(forcedPlaying ? 38 : 0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 95 ? 0 : p + 1));
    }, 200);
    return () => clearInterval(id);
  }, [playing]);

  const s = String(duration % 60).padStart(2, '0');

  return (
    <div className="ui-card">
      <div className="ui-card-head">
        <span className="dot" style={{ background: '#059669' }} />
        <span className="label">Hifz · {stream}</span>
      </div>
      <div className="ui-card-body">
        <p className="hifz-title">{surah}</p>
        <p className="hifz-sub">{range}</p>
        <div className="hifz-player">
          <button
            type="button"
            className="hifz-play"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <Icon name={playing ? 'pause' : 'play'} size={14} />
          </button>
          <div className="hifz-track">
            <div className="hifz-bar">
              <div className="hifz-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="hifz-meta">Recited by your child · 0:{s}</div>
          </div>
        </div>
        <p className="hifz-recorder">Recorded by {teacher}</p>
      </div>
    </div>
  );
}

export function PraiseCard({
  category = 'Helpfulness',
  note = '',
  teacher = 'Sister Sumayya',
}: {
  category?: string;
  note?: string;
  teacher?: string;
}) {
  return (
    <div className="ui-card">
      <div className="ui-card-head">
        <span className="dot" style={{ background: '#f59e0b' }} />
        <span className="label">Praise · {category}</span>
      </div>
      <div className="ui-card-body">
        <p className="praise-quote">&ldquo;{note}&rdquo;</p>
        <p className="praise-by">{teacher}</p>
      </div>
    </div>
  );
}

export function HomeworkCard({
  title = '',
  due = 'Due Sunday',
}: {
  title?: string;
  due?: string;
}) {
  return (
    <div className="ui-card">
      <div className="ui-card-head">
        <span className="dot" style={{ background: '#6366f1' }} />
        <span className="label">Homework</span>
      </div>
      <div className="ui-card-body">
        <p className="hw-title">{title}</p>
        <div className="hw-due">
          <Icon name="cal" size={12} />
          {due}
        </div>
      </div>
    </div>
  );
}

export function HeroPhone() {
  return (
    <div className="hero-phone">
      <div className="hero-phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 10 }}>●●●●</span>
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="currentColor"
              role="img"
              aria-label="Battery"
              focusable={false}
            >
              <title>Battery</title>
              <rect
                x="0.5"
                y="0.5"
                width="11"
                height="9"
                rx="1.5"
                stroke="currentColor"
                fill="none"
              />
              <rect x="2" y="2" width="8" height="6" rx="0.5" />
              <rect x="12" y="3" width="1.5" height="4" rx="0.5" />
            </svg>
          </span>
        </div>
        <div className="phone-content">
          <div className="phone-header">
            <div className="greet">Assalamu alaikum, Jovan</div>
            <h6>Aisha&apos;s week</h6>
            <div className="cls">Year 3 · Sister Sumayya&apos;s class</div>
          </div>
          <div className="phone-section-label">Today</div>
          <AttendanceCard status="present" time="9:05 AM" />
          <HifzCard surah="Al-Fatihah" range="Ayah 5 – 7" stream="Sabak" duration={47} />
        </div>
      </div>
    </div>
  );
}

export function HeroFloat1() {
  return (
    <div className="hero-float-1">
      <PraiseCard
        category="Helpfulness"
        note="Aisha helped a younger student tie her hijab today, mashallah."
        teacher="Sister Sumayya"
      />
    </div>
  );
}

export function HeroFloat2() {
  return (
    <div className="hero-float-2">
      <HomeworkCard
        title="Practice Surah Al-Fatihah ayah 5 three times with a parent"
        due="Due Sunday"
      />
    </div>
  );
}

export function TeacherWrap() {
  const [seconds, setSeconds] = useState(42);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 5 ? s - 1 : 60)), 1000);
    return () => clearInterval(id);
  }, []);

  const wave = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="tw-shell">
      <div className="tw-head">
        <div>
          <h5>Class wrap</h5>
          <div className="sub">Year 3 · Tuesday afternoon</div>
        </div>
        <div className="tw-timer">0:{String(seconds).padStart(2, '0')}</div>
      </div>

      <div className="tw-step done">
        <div className="tw-step-head">
          <div className="tw-step-num">
            <Icon name="check" size={12} />
          </div>
          <div className="tw-step-title">Attendance</div>
        </div>
        <div className="tw-students">
          <div className="tw-student-row">
            <span className="name">Aisha R.</span>
            <div className="tw-pills">
              <span className="tw-pill present">PRESENT</span>
            </div>
          </div>
          <div className="tw-student-row">
            <span className="name">Yusuf M.</span>
            <div className="tw-pills">
              <span className="tw-pill late">LATE 9:18</span>
            </div>
          </div>
          <div className="tw-student-row">
            <span className="name">Khadijah B.</span>
            <div className="tw-pills">
              <span className="tw-pill present">PRESENT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tw-step">
        <div className="tw-step-head">
          <div className="tw-step-num">2</div>
          <div className="tw-step-title">Record hifz · Aisha</div>
        </div>
        <div className="tw-rec">
          <div className="tw-rec-mic">
            <Icon name="mic" size={16} />
          </div>
          <div className="tw-rec-wave">
            {wave.map((i) => (
              <span
                key={i}
                style={{
                  height: `${20 + Math.sin(i * 0.7) * 30 + (i % 3) * 10}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
          <div className="tw-rec-time">0:38</div>
        </div>
      </div>

      <div className="tw-step">
        <div className="tw-step-head">
          <div className="tw-step-num">3</div>
          <div className="tw-step-title">Praise &amp; homework</div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const bars = [
    { d: 'Mon', p: 92, l: 5, a: 3 },
    { d: 'Tue', p: 88, l: 8, a: 4 },
    { d: 'Wed', p: 94, l: 4, a: 2 },
    { d: 'Thu', p: 90, l: 6, a: 4 },
    { d: 'Fri', p: 96, l: 3, a: 1 },
    { d: 'Sat', p: 89, l: 7, a: 4 },
    { d: 'Sun', p: 91, l: 5, a: 4 },
  ];
  return (
    <div className="dash">
      <div className="dash-head">
        <h5>This week</h5>
        <span className="date">NOV 09 TO 15</span>
      </div>
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="num">94%</div>
          <div className="delta">+2.1%</div>
          <div className="lbl">Attendance</div>
        </div>
        <div className="dash-stat">
          <div className="num">$8.4k</div>
          <div className="delta">+$1.2k</div>
          <div className="lbl">Tuition</div>
        </div>
        <div className="dash-stat">
          <div className="num">38</div>
          <div className="delta">+5</div>
          <div className="lbl">Hifz wins</div>
        </div>
        <div className="dash-stat">
          <div className="num">3</div>
          <div className="delta warn">needs reply</div>
          <div className="lbl">Messages</div>
        </div>
      </div>
      <div className="dash-chart">
        <div className="dash-chart-head">
          <div className="ttl">Daily attendance</div>
          <div className="legend">
            <span>
              <span className="sq" style={{ background: 'var(--accent)' }} />
              present
            </span>
            <span>
              <span className="sq" style={{ background: '#fbbf24' }} />
              late
            </span>
            <span>
              <span className="sq" style={{ background: 'var(--rose)', opacity: 0.7 }} />
              absent
            </span>
          </div>
        </div>
        <div>
          <div className="dash-bars">
            {bars.map((b) => (
              <div className="col" key={b.d}>
                <div className="b rose" style={{ height: `${b.a * 1.4}px` }} />
                <div className="b warn" style={{ height: `${b.l * 1.4}px` }} />
                <div className="b" style={{ height: `${b.p * 0.7}px` }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {bars.map((b) => (
              <div className="col" key={b.d} style={{ flex: 1 }}>
                <div className="lbl">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dash-rows">
        <div className="dash-row">
          <div className="who">
            <div className="avatar">SA</div>
            <span>Sister Amina · Year 2</span>
          </div>
          <span className="meta">3 hifz wins · 100% attendance</span>
        </div>
        <div className="dash-row">
          <div className="who">
            <div className="avatar">BI</div>
            <span>Brother Idris · Year 1</span>
          </div>
          <span className="meta">awaiting class wrap</span>
        </div>
        <div className="dash-row">
          <div className="who">
            <div className="avatar">SS</div>
            <span>Sister Sumayya · Year 3</span>
          </div>
          <span className="meta">12 hifz wins · 94% attendance</span>
        </div>
      </div>
    </div>
  );
}

export function PaymentsCard() {
  return (
    <div className="pay-stack">
      <div className="pay">
        <div className="pay-head">
          <div className="ttl">November tuition · Aisha</div>
          <div className="status">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
            UPCOMING
          </div>
        </div>
        <div className="pay-amount">
          <div className="big">$185.00</div>
          <div className="sub">Auto-pays on Nov 1 · Visa ending 4242</div>
        </div>
        <div className="pay-line">
          <span>Base tuition</span>
          <span className="val">$200.00</span>
        </div>
        <div className="pay-line">
          <span>Sibling discount</span>
          <span className="val" style={{ color: 'var(--accent-700)' }}>
            −$15.00
          </span>
        </div>
        <div className="pay-divider" />
        <div className="pay-line" style={{ fontWeight: 600, color: 'var(--fg)' }}>
          <span>Total</span>
          <span className="val" style={{ color: 'var(--fg)' }}>
            $185.00
          </span>
        </div>
        <div className="pay-foot">
          <button type="button" className="pay-btn">
            <Icon name="check" size={14} />
            Pay now
          </button>
          <div className="auto">
            <div className="toggle" />
            Autopay enabled · receipt to jovan@email.com
          </div>
        </div>
      </div>

      <div className="ledger">
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: 8,
          }}
        >
          October reconciled
        </div>
        <div className="ledger-row">
          <span className="l">Aisha R.</span>
          <span className="r">PAID $185</span>
        </div>
        <div className="ledger-row">
          <span className="l">Yusuf M.</span>
          <span className="r">PAID $185</span>
        </div>
        <div className="ledger-row">
          <span className="l">Khadijah B.</span>
          <span className="r">PAID $200</span>
        </div>
      </div>
    </div>
  );
}
