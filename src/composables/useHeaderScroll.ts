import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades in a semi-transparent background and blur on the header
 * once the user scrolls past the hero section.
 *
 * @param backdropRef — ref to the inner backdrop layer (not the sticky header),
 *   so backdrop-filter does not break position: sticky.
 */
export function useHeaderScroll(backdropRef: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!backdropRef.value) return

    // gsap.context() groups all tweens and ScrollTriggers created inside.
    // ctx.revert() in onUnmounted kills them and clears inline styles —
    // without this, animations leak when the component unmounts.
    ctx = gsap.context(() => {
      const navTween = gsap.timeline({
        scrollTrigger: {
          // Fires when the bottom of the header reaches the top of the viewport
          trigger: 'header',
          start: 'bottom top',
          // play on scroll down, reverse when scrolling back up
          toggleActions: 'play none none reverse',
        },
      })

      navTween.fromTo(
        backdropRef.value,
        {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
        },
        {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          duration: 1,
          ease: 'power1.inOut',
        },
      )
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
