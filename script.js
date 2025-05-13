// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const header = document.querySelector("header")
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
    const navItems = document.querySelectorAll(".nav-link")
    const canvas = document.getElementById("bgCanvas")
    const themeToggle = document.getElementById("theme-toggle")
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  
    // Initialize background animation
    initBackgroundAnimation()
  
    // Initialize theme
    initTheme()
  
    // Initialize typing animation
    initTypingAnimation()
  
    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active")
        this.classList.toggle("open")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        navLinks.classList.remove("active")
        if (menuToggle) menuToggle.classList.remove("open")
  
        // Update active link
        navItems.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
  
      // Update active navigation based on scroll position
      updateActiveNavOnScroll()
    })
  
    // Update active navigation based on scroll position
    function updateActiveNavOnScroll() {
      const sections = document.querySelectorAll("section")
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active")
        }
      })
    }
  
    // Initialize theme
    function initTheme() {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode")
      }
  
      // Theme toggle event listeners
      themeToggle.addEventListener("click", toggleTheme)
      mobileThemeToggle.addEventListener("click", toggleTheme)
    }
  
    // Toggle theme function
    function toggleTheme() {
      const isLightMode = document.documentElement.classList.toggle("light-mode")
      localStorage.setItem("theme", isLightMode ? "light" : "dark")
    }
  
    // Initialize typing animation
    function initTypingAnimation() {
      const skills = [
        "Graphics Designer",
        "Logo Designer",
        "UI/UX Designer",
        "Web & App Designer",
        "Frontend Development",
        "Flutter Developer",
        "Firebase Developer",
        "Node.js Developer",
        "Problem Solver",
        "Creative Thinker",
        "Team Player",
      ]
  
      let skillIndex = 0
      let charIndex = 0
      const typedSkill = document.getElementById("typed-skill")
  
      function typeSkill() {
        if (charIndex < skills[skillIndex].length) {
          typedSkill.textContent += skills[skillIndex].charAt(charIndex)
          charIndex++
          setTimeout(typeSkill, 100)
        } else {
          setTimeout(eraseSkill, 1500)
        }
      }
  
      function eraseSkill() {
        if (charIndex > 0) {
          typedSkill.textContent = skills[skillIndex].substring(0, charIndex - 1)
          charIndex--
          setTimeout(eraseSkill, 50)
        } else {
          skillIndex = (skillIndex + 1) % skills.length
          setTimeout(typeSkill, 200)
        }
      }
  
      // Start typing animation
      typeSkill()
    }
  
    // Initialize the background animation with a new pattern
    function initBackgroundAnimation() {
      if (!canvas) return
  
      const ctx = canvas.getContext("2d")
  
      // Set canvas size to match window
      function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
  
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
  
      // Particles array
      const particles = []
      const particleCount = 100
      const connectionDistance = 150
  
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50}, ${Math.random() * 150 + 100}, ${Math.random() * 0.5 + 0.3})`,
        })
      }
  
      // Animation function
      function animate() {
        // Check if theme is light or dark
        const isLightMode = document.documentElement.classList.contains("light-mode")
  
        // Clear canvas with appropriate background
        ctx.fillStyle = isLightMode ? "rgba(245, 245, 245, 1)" : "rgba(0, 0, 0, 1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
  
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
  
          // Update position
          p.x += p.speedX
          p.y += p.speedY
  
          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
  
          // Draw particle
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = isLightMode ? p.color.replace("rgba", "rgba(50, 50, 100,") : p.color
          ctx.fill()
  
          // Connect particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)
  
            if (distance < connectionDistance) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
  
              // Line opacity based on distance
              const opacity = 1 - distance / connectionDistance
              ctx.strokeStyle = isLightMode
                ? `rgba(100, 50, 200, ${opacity * 0.3})`
                : `rgba(147, 51, 234, ${opacity * 0.3})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        }
  
        // Add glow effects
        addGlowEffects(isLightMode)
  
        requestAnimationFrame(animate)
      }
  
      // Add glow effects
      function addGlowEffects(isLightMode) {
        const numGlows = 3
        const time = Date.now() * 0.0005
  
        for (let i = 0; i < numGlows; i++) {
          const x = (Math.sin(time + i) * canvas.width) / 2 + canvas.width / 2
          const y = (Math.cos(time + i * 2) * canvas.height) / 2 + canvas.height / 2
  
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300)
  
          if (isLightMode) {
            gradient.addColorStop(0, "rgba(147, 51, 234, 0.1)")
            gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.03)")
            gradient.addColorStop(1, "rgba(147, 51, 234, 0)")
          } else {
            gradient.addColorStop(0, "rgba(147, 51, 234, 0.2)")
            gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.05)")
            gradient.addColorStop(1, "rgba(147, 51, 234, 0)")
          }
  
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      }
  
      // Start animation
      animate()
    }
  
    // Add scroll reveal animations for elements
    const revealElements = document.querySelectorAll(".experience-card, .project-card, .contact-item, .skill-icon")
  
    function checkReveal() {
      const windowHeight = window.innerHeight
      const revealPoint = 150
  
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("revealed")
        }
      })
    }
  
    // Add revealed class for CSS animations
    window.addEventListener("scroll", checkReveal)
  
    // Check on initial load
    checkReveal()
  
    // Add CSS for revealed elements
    const style = document.createElement("style")
    style.textContent = `
          .experience-card, .project-card, .contact-item, .skill-icon {
              opacity: 0;
              transform: translateY(30px);
              transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .revealed {
              opacity: 1;
              transform: translateY(0);
          }
      `
    document.head.appendChild(style)
  
    // Animate the orbit lines
    function animateOrbitLines() {
      const orbitLines = document.querySelectorAll(".orbit-line")
  
      orbitLines.forEach((line, index) => {
        // Add random rotation animation
        line.style.animation = `rotate ${10 + index * 5}s linear infinite ${index * 2}s`
      })
    }
  
    // Initialize orbit animations
    animateOrbitLines()
  
    // Create skill icons
    function createSkillIcons() {
      // Define skill icons with their paths
      const skillIcons = {
        figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        telegram: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/telegram/telegram-original.svg",
        css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        xd: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
        javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      }
  
      // Get all skill images
      const skillImgs = document.querySelectorAll(".skill-img")
  
      // Set the src attribute for each skill image
      skillImgs.forEach((img) => {
        const alt = img.getAttribute("alt").toLowerCase()
        const iconKey = Object.keys(skillIcons).find((key) => alt.includes(key.toLowerCase()))
  
        if (iconKey && skillIcons[iconKey]) {
          img.src = skillIcons[iconKey]
        }
      })
    }
  
    // Initialize skill icons
    createSkillIcons()
  
    // Create project images
    function createProjectImages() {
      // Define project images with their paths
      const projectImages = {
        "UI/UX Design Project":
          "images/img4.png",
        "Frontend Web Developer Project":
          "images/img6.png",
        "Flutter App Development":
          "images/img5.png",
      }
  
      // Get all project images
      const projectImgs = document.querySelectorAll(".project-image img")
  
      // Set the src attribute for each project image
      projectImgs.forEach((img) => {
        const alt = img.getAttribute("alt")
        const projectKey = Object.keys(projectImages).find((key) => alt.includes(key))
  
        if (projectKey && projectImages[projectKey]) {
          img.src = projectImages[projectKey]
        }
      })
    }
  
    // Initialize project images
    createProjectImages()
  
    // Create placeholder images for experience icons
    function createExperienceIcons() {
      const toolIcons = {
        Canva: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
        InDesign: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        Illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        XD: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
        Photoshop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      }
  
      // Get all tool icons
      const toolIconImgs = document.querySelectorAll(".tool-icon")
  
      // Set the src attribute for each tool icon
      toolIconImgs.forEach((img) => {
        const alt = img.getAttribute("alt")
        const iconKey = Object.keys(toolIcons).find((key) => alt.includes(key))
  
        if (iconKey && toolIcons[iconKey]) {
          img.src = toolIcons[iconKey]
        }
      })
    }
  
    // Initialize experience icons
    createExperienceIcons()
  })
  