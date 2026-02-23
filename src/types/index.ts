import { ReactNode } from 'react';
import type { Document } from '@contentful/rich-text-types';

// ─── Blog Types ─────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;   // primary display category (first tag)
  tags: string[];     // all tags from Contentful metadata
  excerpt: string;
  image: string;
  readTime: string;
  featured?: boolean;
  author?: string;
  keywords?: string;
  content: Document;
  faqItems?: FAQItem[];
}

// ─── SEO Types ──────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  section?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  wordCount?: number;
  tags?: string;
}

// ─── Content JSON Types (content.json) ──────────────────────

export interface SiteConfig {
  name: string;
  tagline: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface Navigation {
  links: NavigationLink[];
  ctaButton: NavigationLink;
}

export interface HeroHeadline {
  line1: string;
  line2: string;
  line2Suffix: string;
}

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroContent {
  statusBadge: string;
  headline: HeroHeadline;
  description: string;
  buttons: {
    primary: HeroButton;
    secondary: HeroButton;
  };
  scrollText: string;
}

export interface StatItem {
  value: string;
  label: string;
  variant: 'light' | 'dark';
}

export interface AboutContent {
  sectionTitle: string;
  sectionSubtitle: string;
  paragraphs: string[];
  quote: string;
  stats: StatItem[];
  currentlyShipping: {
    label: string;
    value: string;
  };
}

export interface PrincipleItem {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface OperatingSystemContent {
  sectionTitle: string;
  sectionSubtitle: string;
  principles: PrincipleItem[];
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface TimelineContent {
  sectionTitle: string;
  sectionSubtitle: string;
  quote: string;
  quoteImage?: string;
  quoteAuthor?: string;
  events: TimelineEvent[];
}

export interface GoalSection {
  label: string;
  goals: string[];
}

export interface StrategyContent {
  futureHeading: string;
  shortTerm: GoalSection;
  longTerm: GoalSection;
  learningHeading: string;
  skills: string[];
  whyNow: {
    label: string;
    answer: string;
  };
}

export interface ProjectItem {
  title: string;
  date: string;
  concept: string;
  friction?: string;
  lesson: string;
  status?: string;
}

export interface ProjectsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: ProjectItem[];
}

export interface BeliefItem {
  category: string;
  statement: string;
  muted?: boolean;
}

export interface PhilosophyContent {
  sectionTitle: string;
  sectionSubtitle: string;
  beliefs: BeliefItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  ctaLabel: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface FooterContent {
  copyright: string;
  quote: string;
}

export interface ContentData {
  site: SiteConfig;
  navigation: Navigation;
  hero: HeroContent;
  about: AboutContent;
  operatingSystem: OperatingSystemContent;
  timeline: TimelineContent;
  strategy: StrategyContent;
  projects?: ProjectsContent;
  philosophy: PhilosophyContent;
  contact: ContactContent;
  footer: FooterContent;
}

// ─── Portfolio Types (portfolios.json) ──────────────────────

export interface FeaturedProject {
  title: string;
  status: string;
  description: string;
  tags: string[];
  link: string;
  logo: string;
}

export interface ProjectEntry {
  title: string;
  date: string;
  status: string;
  description: string;
  tags: string[];
  link: string;
}

export interface ClientWork {
  title: string;
  category: string;
  description: string;
  link: string;
  image: string;
}

export interface PortfoliosData {
  pageTitle: string;
  pageSubtitle: string;
  description: string;
  featured: FeaturedProject;
  projects: ProjectEntry[];
  clientWorks: ClientWork[];
}

// ─── Things I Like Types (thingsILike.json) ─────────────────

export interface ThingItem {
  title: string;
  subtitle: string;
  note: string;
  image: string;
}

export interface ThingsSection {
  id: string;
  name: string;
  iconName: string;
  items: ThingItem[];
}

export interface ThingsILikeData {
  pageTitle: string;
  pageSubtitle: string;
  description: string;
  sections: ThingsSection[];
}

// ─── Component Prop Types ───────────────────────────────────

export interface BeliefCardProps {
  category: string;
  statement: string;
  muted?: boolean;
}

export interface GoalItemProps {
  children: ReactNode;
}

export interface SkillBadgeProps {
  children: ReactNode;
}

export interface StatCardProps {
  value: string;
  label: string;
  variant?: 'light' | 'dark';
}

export interface TimelineItemProps {
  period: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface PrincipleCardProps {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
  index?: number;
}

export interface ProjectCardProps {
  title: string;
  date: string;
  concept: string;
  friction?: string;
  lesson: string;
  status?: string;
  index?: number;
}

export interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  dark?: boolean;
}

