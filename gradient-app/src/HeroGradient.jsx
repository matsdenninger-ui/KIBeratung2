import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Ruhiger, dunkler Farbverlauf in den Marken-Tönen (Gold/Wein auf Anthrazit)
// als Deko-Hintergrund hinter den Hero-Sektionen. Rein dekorativ:
// pointerEvents 'none', damit Klicks/Tastatur ungestoert an die echten
// Inhalte darueber gehen.
export default function HeroGradient() {
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      pointerEvents="none"
      pixelDensity={1}
      fov={35}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uSpeed={0.1}
        uStrength={1.2}
        uDensity={0.9}
        uFrequency={5.5}
        uAmplitude={0.6}
        color1="#131315"
        color2="#722f3b"
        color3="#c9a445"
        reflection={0.05}
        brightness={0.9}
        grain="off"
        lightType="3d"
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={0}
        rotationZ={0}
        cAzimuthAngle={180}
        cPolarAngle={110}
        cDistance={3.2}
        cameraZoom={1}
        toggleAxis={false}
        zoomOut={false}
      />
    </ShaderGradientCanvas>
  )
}
