type AdminNoticeProps = {
  kind?: 'info' | 'accessDenied'
  text: string
  title?: string
}

export function AdminNotice({ kind = 'info', text, title }: AdminNoticeProps) {
  if (kind === 'accessDenied') {
    return (
      <div className="admin-access-denied" role="alert">
        <p className="eyebrow">Kein Admin-Zugriff</p>
        <h2>{title ?? 'Account ohne Admin-Rolle'}</h2>
        <p>{text}</p>
      </div>
    )
  }

  return (
    <div className="panel-frame p-6 text-[var(--color-muted)]">
      <p>{text}</p>
    </div>
  )
}

export function getAdminNoticeKind(error: string) {
  return error === 'Dein Clerk-User hat noch keine Admin-Rolle.' ? 'accessDenied' : 'info'
}
