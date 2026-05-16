'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './icon';
import { currentPageKey } from './site-nav';

const PERSONA_PAGES: {
  href: string;
  label: string;
  key: 'parents' | 'teachers' | 'principals';
  icon: IconName;
}[] = [
  { href: '/for-parents', label: 'For parents', key: 'parents', icon: 'parent' },
  { href: '/for-teachers', label: 'For teachers', key: 'teachers', icon: 'teacher' },
  { href: '/for-principals', label: 'For principals', key: 'principals', icon: 'principal' },
];

function PersonaSidebar() {
  const pathname = usePathname();
  const active = currentPageKey(pathname);
  return (
    <aside className="persona-rail" aria-label="Persona navigation">
      <div className="persona-rail-eyebrow">
        <span className="dot" />
        Audience
      </div>
      <nav className="persona-rail-nav">
        {PERSONA_PAGES.map((p) => (
          <Link
            key={p.key}
            href={p.href}
            className={`persona-rail-link ${active === p.key ? 'is-active' : ''}`}
          >
            <span className="persona-rail-icon">
              <Icon name={p.icon} size={16} />
            </span>
            <span>{p.label}</span>
            {active === p.key && (
              <span className="persona-rail-arrow">
                <Icon name="arrow" size={14} />
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="persona-rail-foot">
        <div className="persona-rail-eyebrow">
          <span className="dot" />
          Also see
        </div>
        <Link className="persona-rail-link sub" href="/pricing">
          <span className="persona-rail-icon">
            <Icon name="money" size={14} />
          </span>
          Pricing
        </Link>
        <Link className="persona-rail-link sub" href="#demo">
          <span className="persona-rail-icon">
            <Icon name="msg" size={14} />
          </span>
          Book a demo
        </Link>
      </div>
    </aside>
  );
}

export function PageLayout({
  children,
  withSidebar = true,
}: {
  children: ReactNode;
  withSidebar?: boolean;
}) {
  if (!withSidebar) return <>{children}</>;
  return (
    <div className="page-layout">
      <PersonaSidebar />
      <div className="page-layout-content">{children}</div>
    </div>
  );
}
