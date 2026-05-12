import gsap from 'gsap'

export const useReveal = (
  el: HTMLElement
) => {

  const items = el.querySelectorAll('.reveal-item')

  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 80
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.18,
      ease: 'power3.out'
    }
  )

}