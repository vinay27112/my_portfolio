import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-28">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-ink-dim">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5 text-sm">
          <a href={`mailto:${profile.email}`} className="text-ink-soft hover:text-ink transition">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink transition">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink transition">
            GitHub
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink transition">
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
}
