import { useMemo } from 'react'
import useAppStore from '../stores/useAppStore'
import { createT } from './translations'

/**
 * Hook for translations
 * Usage:
 *   const { t, lang, setLanguage } = useTranslation()
 *   t('feed.composePlaceholder')
 */
export default function useTranslation() {
  const lang = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)

  const t = useMemo(() => createT(lang), [lang])

  return { t, lang, setLanguage }
}
