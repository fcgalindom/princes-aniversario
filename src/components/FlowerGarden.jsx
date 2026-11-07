import { useEffect, useRef } from 'react'

const FLOWER_COUNT = 12

function Flower({ innerRef }) {
  return (
    <div className="flower-container" ref={innerRef}>
      <div className="flower-top">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <div key={n} className={`flower-petal flower-petal__${n}`} />
        ))}
        <div className="flower-circle" />
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <div key={n} className={`flower-light flower-light__${n}`} />
        ))}
      </div>
      <div className="flower-bottom">
        <div className="flower-stem" />
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n} className={`flower-leaf flower-leaf__${n}`} />
        ))}
        {[1, 2, 3, 4].map(n => (
          <div key={n} className={`flower-grass flower-grass__${n}`} />
        ))}
      </div>
    </div>
  )
}

export default function FlowerGarden() {
  const refs = useRef([])

  useEffect(() => {
    const flowers = refs.current
    flowers[0]?.classList.add('animate')

    const t = setTimeout(() => {
      for (let i = 1; i <= 2 && i < flowers.length; i++) {
        flowers[i]?.classList.add('animate')
      }
      let remaining = flowers.slice(3)
      const interval = setInterval(() => {
        if (remaining.length === 0) { clearInterval(interval); return }
        const idx = Math.floor(Math.random() * remaining.length)
        remaining.splice(idx, 1)[0]?.classList.add('animate')
      }, 400)
      return () => clearInterval(interval)
    }, 2500)

    return () => clearTimeout(t)
  }, [])

  return (
    <div className="ground">
      {Array.from({ length: FLOWER_COUNT }, (_, i) => (
        <Flower key={i} innerRef={el => (refs.current[i] = el)} />
      ))}
    </div>
  )
}
