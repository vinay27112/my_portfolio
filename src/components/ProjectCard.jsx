export default function ProjectCard({ project, expanded = false }) {
  const isLive = project.status === "live";

  return (
    <div
      data-reveal
      className="border border-line rounded-2xl bg-panel p-6 transition hover:shadow-[0_4px_20px_rgba(36,39,44,0.06)] hover:-translate-y-0.5 duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            isLive
              ? "bg-accent-soft text-ink-soft"
              : "bg-[#F3EEE6] text-[#9A7B3F]"
          }`}
        >
          {project.statusLabel}
        </span>
        <span className="text-xs text-ink-dim">{project.period}</span>
      </div>

      <h3 className="text-lg font-semibold text-ink mb-1">{project.name}</h3>
      <p className="text-sm text-ink-dim mb-4">{project.tagline}</p>

      <p className="text-sm leading-relaxed text-ink-soft mb-4">
        {project.summary}
      </p>

      {expanded && (
        <ul className="space-y-1.5 mb-4">
          {project.details.map((d, i) => (
            <li key={i} className="text-sm text-ink-soft flex gap-2">
              <span className="text-ink-dim shrink-0">–</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-0.5 rounded-full border border-line text-ink-dim"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-5 pt-4 border-t border-line text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-ink-soft hover:text-ink transition font-medium"
        >
          View repo
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:text-ink-soft transition font-medium"
          >
            Live demo →
          </a>
        )}
      </div>
    </div>
  );
}
