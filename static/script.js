document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("uploadArea")
  const fileInput = document.getElementById("file-upload")
  const uploadPreview = document.getElementById("uploadPreview")
  const previewImage = document.getElementById("previewImage")
  const fileName = document.getElementById("fileName")
  const submitBtn = document.getElementById("submitBtn")
  const uploadForm = document.querySelector(".upload-form")

  // Drag and drop functionality
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("dragover")
  })

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  })

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  })

  // Handle file selection
  function handleFileSelect(file) {
    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      showNotification("Please select a valid image file (PNG, JPG, JPEG)", "error")
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification("File size must be less than 10MB", "error")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.src = e.target.result
      fileName.textContent = file.name
      uploadArea.style.display = "none"
      uploadPreview.style.display = "block"
    }
    reader.readAsDataURL(file)
  }

  // Clear preview
  window.clearPreview = () => {
    uploadArea.style.display = "block"
    uploadPreview.style.display = "none"
    fileInput.value = ""
  }

  // Form submission
  uploadForm.addEventListener("submit", (e) => {
    if (!fileInput.files.length) {
      e.preventDefault()
      showNotification("Please select an image file", "error")
      return
    }

    // Show loading state
    const btnText = submitBtn.querySelector(".btn-text")
    const btnIcon = submitBtn.querySelector(".btn-icon")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnIcon.style.display = "none"
    btnLoading.style.display = "flex"
    submitBtn.disabled = true

    // Add some visual feedback
    submitBtn.style.background = "linear-gradient(45deg, #666, #888)"
  })

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `flash-message flash-${type === "error" ? "danger" : "info"}`
    notification.innerHTML = `
            <span class="flash-icon">${type === "error" ? "⚠️" : "ℹ️"}</span>
            ${message}
            <button class="flash-close" onclick="this.parentElement.remove()">×</button>
        `

    // Insert at the top of the container
    const container = document.querySelector(".container")
    const firstChild = container.firstElementChild
    container.insertBefore(notification, firstChild)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // Add some interactive particles on mouse move
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.98) {
      createMouseParticle(e.clientX, e.clientY)
    }
  })

  function createMouseParticle(x, y) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.width = "4px"
    particle.style.height = "4px"
    particle.style.background = "radial-gradient(circle, #00d4ff, transparent)"
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "1000"
    particle.style.animation = "fadeOut 2s ease-out forwards"

    document.body.appendChild(particle)

    setTimeout(() => {
      if (particle.parentElement) {
        particle.remove()
      }
    }, 2000)
  }

  // Add fadeOut animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `
  document.head.appendChild(style)

  // Add some scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  // Observe feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.style.animationPlayState = "paused"
    observer.observe(card)
  })
})
document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("uploadArea")
  const fileInput = document.getElementById("file-upload")
  const uploadPreview = document.getElementById("uploadPreview")
  const previewImage = document.getElementById("previewImage")
  const fileName = document.getElementById("fileName")
  const submitBtn = document.getElementById("submitBtn")
  const uploadForm = document.querySelector(".upload-form")

  // Drag and drop functionality
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("dragover")
  })

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  })

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  })

  // Handle file selection
  function handleFileSelect(file) {
    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      showNotification("Please select a valid image file (PNG, JPG, JPEG)", "error")
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification("File size must be less than 10MB", "error")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.src = e.target.result
      fileName.textContent = file.name
      uploadArea.style.display = "none"
      uploadPreview.style.display = "block"
    }
    reader.readAsDataURL(file)
  }

  // Clear preview
  window.clearPreview = () => {
    uploadArea.style.display = "block"
    uploadPreview.style.display = "none"
    fileInput.value = ""
  }

  // Form submission
  uploadForm.addEventListener("submit", (e) => {
    if (!fileInput.files.length) {
      e.preventDefault()
      showNotification("Please select an image file", "error")
      return
    }

    // Show loading state
    const btnText = submitBtn.querySelector(".btn-text")
    const btnIcon = submitBtn.querySelector(".btn-icon")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnIcon.style.display = "none"
    btnLoading.style.display = "flex"
    submitBtn.disabled = true

    // Add some visual feedback
    submitBtn.style.background = "linear-gradient(45deg, #666, #888)"
  })

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `flash-message flash-${type === "error" ? "danger" : "info"}`
    notification.innerHTML = `
            <span class="flash-icon">${type === "error" ? "⚠️" : "ℹ️"}</span>
            ${message}
            <button class="flash-close" onclick="this.parentElement.remove()">×</button>
        `

    // Insert at the top of the container
    const container = document.querySelector(".container")
    const firstChild = container.firstElementChild
    container.insertBefore(notification, firstChild)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // Add some interactive particles on mouse move
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.98) {
      createMouseParticle(e.clientX, e.clientY)
    }
  })

  function createMouseParticle(x, y) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.width = "4px"
    particle.style.height = "4px"
    particle.style.background = "radial-gradient(circle, #00d4ff, transparent)"
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "1000"
    particle.style.animation = "fadeOut 2s ease-out forwards"

    document.body.appendChild(particle)

    setTimeout(() => {
      if (particle.parentElement) {
        particle.remove()
      }
    }, 2000)
  }

  // Add fadeOut animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `
  document.head.appendChild(style)

  // Add some scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  // Observe feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.style.animationPlayState = "paused"
    observer.observe(card)
  })
})
