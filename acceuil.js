onsole.clear();
let targets = gsap.utils.toArray("#icons g");
let targetStarts = [20, 120, 220, 320, 420, 520];
let anim;
let activeDot = 0;
let targetDot;
let maxDur = 0.6;

targets.forEach((obj, i) => {
  obj.index = i;
  obj.addEventListener("click", letsStretch);
});

function letsStretch() {
  targetDot = this.index;
  if (targetDot != activeDot) {
    if (anim && anim.isActive()) {
      anim.progress(1);
    }

    let oldX = targetStarts[activeDot];
    let newX = targetStarts[targetDot];
    let travel = Math.abs(oldX - newX);
    let factor = gsap.utils.mapRange(100, 500, 0.5, 1, travel);
    let dur = maxDur * factor;

    anim = gsap.timeline({ defaults: { duration: dur, ease: "back.in(2)" } });
    if (newX > oldX) {
      anim.to("#stretchy", {
        attr: { width: travel + 60 }
      });

      anim.to(
        "#stretchy",
        { attr: { x: newX, width: 60 }, ease: "back" },
        "+=0.08"
      );
    } else {
      anim.to("#stretchy", {
        attr: { x: newX, width: travel + 60 }
      });
      anim.to("#stretchy", { attr: { width: 60 }, ease: "back" }, "+=0.08");
    }

    anim.to(
      "#stretchy",
      {
        duration: dur,
        ease: "sine.inOut",
        attr: { height: 30, y: 45 },
        yoyo: true,
        repeat: 1
      },
      0
    );
  } else {
    return;
  }

  activeDot = targetDot;
}
