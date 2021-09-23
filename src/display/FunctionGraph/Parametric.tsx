import React from "react"
import { useScaleContext } from "../../view/ScaleContext"
import { Stroked } from "../../display/Theme"

export interface ParametricProps extends Stroked {
  xy: (t: number) => [number, number]
  t: [number, number]
  color?: string
  samples?: number
  style?: "solid" | "dashed"
  svgPathProps?: React.SVGProps<SVGPathElement>
}

const ParametricFunction: React.FC<ParametricProps> = ({
  xy,
  t,
  color,
  style = "solid",
  weight = 2,
  opacity = 1.0,
  samples,
  svgPathProps = {},
}) => {
  const { cssScale } = useScaleContext()

  const [tMin, tMax] = t

  // How many points to render
  samples = samples || 1000
  const dt = (tMax - tMin) / samples

  const points: [number, number][] = []

  const tAlmostMax = tMax - dt / 2
  for (let t = tMin; dt > 0 ? t < tAlmostMax : t > tAlmostMax; t += dt) {
    const [x, y] = xy(t)
    points.push([x, y])
  }
  points.push(xy(tMax))

  const pathDescriptor = "M " + points.map((p) => p.join(" ")).join(" L ")

  return (
    <path
      d={pathDescriptor}
      strokeWidth={weight}
      tabIndex={0}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={style === "dashed" ? "1,10" : undefined}
      transform={cssScale}
      {...svgPathProps}
      style={{
        stroke: color || "var(--mafs-fg)",
        strokeOpacity: opacity,
        vectorEffect: "non-scaling-stroke",
        ...(svgPathProps.style || {}),
      }}
    ></path>
  )
}

export default ParametricFunction
