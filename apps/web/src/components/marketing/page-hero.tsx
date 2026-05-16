import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './icon';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  titleAccent?: ReactNode;
  lede?: ReactNode;
  primaryCta?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  lede,
  primaryCta = 'Book a demo',
  secondaryCta,
  secondaryHref,
  children,
}: Props) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          {eyebrow && (
            <span className="eyebrow">
              <span className="dot" />
              {eyebrow}
            </span>
          )}
          <h1>
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className="serif">{titleAccent}</span>
              </>
            )}
          </h1>
          {lede && <p className="lede">{lede}</p>}
          <div className="hero-cta">
            <Link className="btn btn-accent" href="#demo">
              {primaryCta}
              <Icon name="arrow" size={14} />
            </Link>
            {secondaryCta && (
              <Link className="btn btn-ghost" href={secondaryHref || '#'}>
                {secondaryCta}
              </Link>
            )}
          </div>
        </div>
        <div className="page-hero-art">{children}</div>
      </div>
    </section>
  );
}
