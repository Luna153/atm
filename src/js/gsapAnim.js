function gsapAni() {
  // console.log('123132')
  // gsap.registerPlugin(ScrollTrigger);
  
  // KV
  var tlKv = gsap.timeline({
    delay: 0.8,
    onComplete: function () {
      aniLoop();
      aniLoop2();
    },
    onStart: function () {
      window.scrollTo(0, 0);
    },
    repeatDelay: 0.8,
  });

  tlKv
    .addLabel("KvStart")

    .from(
      ".section-kv_title",
      {
        y: "-150%",
        opacity: 0,
        duration: 3,
        ease: "elastic.out(1, 0.8)",
        clearProps: "all",
      },
      "KvStart+=1"
    )
    .from(
      ".section-kv_subtitle",
      {
        y: "-150%",
        opacity: 0,
        duration: 3,
        ease: "elastic.out(1, 0.8)",
        clearProps: "all",
      },
      "KvStart+=0.5"
    )

    
    .addLabel("KvEnd")
    


  function aniLoop() {
    gsap
      .timeline({
        delay: 1,
        repeat: -1,
        repeatDelay: 2,
      })
      // .from(
      //   ".section-kv_title-slogan",
      //   {
      //     scale: 0.9,
      //     duration: 1,
      //     ease: "elastic.out(1, 0.45)",
      //     stagger: 0.2,
      //   },
      //   "<"
      // )
      // .from(
      //   ".section-kv_title-time",
      //   {
      //     scale: 0.9,
      //     duration: 1,
      //     ease: "elastic.out(1, 0.45)",
      //     stagger: 0.5,
      //   },
      //   "<"
      // )

  }
  function aniLoop2() {
    gsap
      .timeline({
        repeat: -1,
      })

      // .from(
      //   ".section-kv_title-loud",
      //   {
      //     opacity: 0,
      //   },
      //   "<"
      // )
      // .to(
      //   ".section-kv_title-loud",
      //   {
      //     opacity: 1,
      //     y: "35%",
      //     duration: 2,
      //     stagger: 0,
      //   },
      //   "<"
      // )

  }
}
