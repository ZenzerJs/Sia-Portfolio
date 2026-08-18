import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 3D Process Stacking Disks Engine with Conic Gradient Rotation & Staggered Pinning
 */
export function initProcessStack(): () => void {
  if (typeof window === "undefined") return () => {};

  const processSection = document.querySelector("#process") as HTMLElement | null;
  const disksContainer = document.querySelector(".process__disks") as HTMLElement | null;
  const disks = gsap.utils.toArray<HTMLElement>(".process__disk");

  if (!processSection || !disksContainer || disks.length === 0) {
    return () => {};
  }

  // Set initial 3D transform on disk graphics
  gsap.set(".process__disk-graphic", {
    transformPerspective: 900,
    rotateX: 30,
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#process",
      start: "top top",
      end: "+=200%",
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
    },
  });

  // Disks order: disk 4 (Listen), disk 3 (Strategy), disk 2 (Design), disk 1 (Build)
  // Stack down sequentially
  disks.forEach((disk, i) => {
    const isFirst = i === 0;
    const initialY = -i * 150;
    const targetY = -i * 66;

    const labelText = disk.querySelector(".process__disk-label-text");
    const gradient = disk.querySelector(".disk-gradient");

    if (!isFirst) {
      // Incoming disks start higher and transparent
      gsap.set(disk, { y: initialY - 100, opacity: 0 });

      timeline.to(
        disk,
        {
          y: targetY,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        i * 0.8
      );
    } else {
      gsap.set(disk, { y: 0, opacity: 1 });
    }

    if (gradient) {
      timeline.to(
        gradient,
        {
          rotation: 360,
          duration: 2.5,
          ease: "none",
        },
        0
      );
    }

    if (labelText && i < disks.length - 1) {
      timeline.to(
        labelText,
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power1.out",
        },
        i * 0.8 + 0.6
      );
    }
  });

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}
