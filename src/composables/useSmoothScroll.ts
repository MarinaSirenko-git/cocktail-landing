import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

let activeScrollTween: gsap.core.Tween | null = null

function getHeaderOffset() {
  const header = document.querySelector('header')
  return header?.getBoundingClientRect().height ?? 0
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useSmoothScroll() {
  function scrollToSection(hash: string, onComplete?: () => void) {
    const target = document.querySelector(hash)
    if (!target) return

    const offsetY = getHeaderOffset()

    activeScrollTween?.kill()

    if (prefersReducedMotion()) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - offsetY

      window.scrollTo({ top, behavior: 'instant' })
      onComplete?.()
      return
    }

    activeScrollTween = gsap.to(window, {
      duration: 0.9,
      ease: 'power2.inOut',
      scrollTo: { y: target, offsetY },
      onComplete: () => {
        activeScrollTween = null
        onComplete?.()
      },
    })
  }

  function handleNavClick(
    event: MouseEvent,
    hash: string,
    onComplete?: () => void,
  ) {
    if (!hash.startsWith('#')) return

    event.preventDefault()
    scrollToSection(hash, onComplete)
  }

  return { scrollToSection, handleNavClick }
}
