class RelieVRApp {
  constructor() {
    this.currentStep = 1
    this.totalSteps = 4 // Updated to 4 steps without intro video
    this.preAssessmentData = {}
    this.postAssessmentData = {}
    this.sessionStartTime = null
    this.sessionTimer = null
    this.vrVideo = null
    this.vrProgressInterval = null

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.generateQuestionnaires()
    this.updateProgress()
  }

  setupEventListeners() {
    // Pre-assessment submission
    document.getElementById("submitPreAssessment").addEventListener("click", () => {
      this.handlePreAssessmentSubmit()
    })

    // Post-assessment submission
    document.getElementById("submitPostAssessment").addEventListener("click", () => {
      this.handlePostAssessmentSubmit()
    })

    document.getElementById("emergencyExit").addEventListener("click", () => {
      this.exitVRSession()
    })

    // Results actions
    document.getElementById("downloadReport").addEventListener("click", () => {
      this.downloadPDFReport()
    })

    document.getElementById("scheduleFollowup").addEventListener("click", () => {
      this.scheduleFollowup()
    })
  }

  generateQuestionnaires() {
    this.generatePreAssessment()
    this.generatePostAssessment()
  }

  generatePreAssessment() {
    const container = document.getElementById("preQuestionnaire")
    const questions = [
      {
        id: "stress_emoji",
        type: "emoji",
        text: "How are you feeling right now? Select the emoji that best represents your current emotional state.",
        emojis: ["😢", "😟", "😐", "🙂", "😊"],
        labels: ["Very Sad", "Worried", "Neutral", "Good", "Very Happy"],
      },
      {
        id: "pain_level",
        type: "scale",
        text: "On a scale of 1-10, how would you rate your current pain level?",
        min: 1,
        max: 10,
      },
      {
        id: "anxiety_emoji",
        type: "emoji",
        text: "How anxious do you feel about your recovery?",
        emojis: ["😰", "😨", "😕", "😌", "😎"],
        labels: ["Very Anxious", "Anxious", "Somewhat Worried", "Calm", "Very Confident"],
      },
      {
        id: "mood_color",
        type: "color",
        text: "Which color best represents your current mood?",
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"],
      },
      {
        id: "energy_level",
        type: "emoji",
        text: "How is your energy level today?",
        emojis: ["😴", "😪", "😐", "😊", "⚡"],
        labels: ["Very Tired", "Tired", "Neutral", "Energetic", "Very Energetic"],
      },
      {
        id: "overall_wellbeing",
        type: "scale",
        text: "Overall, how would you rate your current wellbeing?",
        min: 1,
        max: 10,
      },
      {
        id: "sleep_quality",
        type: "scale",
        text: "How would you rate your sleep quality last night?",
        min: 1,
        max: 10,
      },
      {
        id: "appetite_level",
        type: "emoji",
        text: "How is your appetite today?",
        emojis: ["🚫", "😕", "😐", "😋", "🍽️"],
        labels: ["No Appetite", "Poor", "Normal", "Good", "Excellent"],
      },
      {
        id: "mobility_level",
        type: "scale",
        text: "How would you rate your current mobility/movement ability?",
        min: 1,
        max: 10,
      },
      {
        id: "concentration",
        type: "emoji",
        text: "How is your ability to concentrate today?",
        emojis: ["😵", "😕", "😐", "🤔", "🎯"],
        labels: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
      },
      {
        id: "social_comfort",
        type: "scale",
        text: "How comfortable do you feel interacting with others today?",
        min: 1,
        max: 10,
      },
      {
        id: "motivation_level",
        type: "emoji",
        text: "How motivated do you feel about your recovery today?",
        emojis: ["😞", "😕", "😐", "💪", "🚀"],
        labels: ["Very Low", "Low", "Neutral", "High", "Very High"],
      },
      {
        id: "breathing_comfort",
        type: "scale",
        text: "How comfortable is your breathing right now?",
        min: 1,
        max: 10,
      },
      {
        id: "nausea_level",
        type: "emoji",
        text: "Are you experiencing any nausea or dizziness?",
        emojis: ["🤢", "😷", "😕", "😐", "😊"],
        labels: ["Very Nauseous", "Somewhat Nauseous", "Mild Discomfort", "Slight", "None"],
      },
      {
        id: "temperature_comfort",
        type: "scale",
        text: "How comfortable is your body temperature right now?",
        min: 1,
        max: 10,
      },
      {
        id: "optimism_level",
        type: "emoji",
        text: "How optimistic do you feel about your recovery?",
        emojis: ["😔", "😟", "😐", "🙂", "🌟"],
        labels: ["Very Pessimistic", "Pessimistic", "Neutral", "Optimistic", "Very Optimistic"],
      },
      {
        id: "stress_physical",
        type: "scale",
        text: "How much physical tension or stress do you feel in your body?",
        min: 1,
        max: 10,
      },
      {
        id: "comfort_environment",
        type: "emoji",
        text: "How comfortable do you feel in your current environment?",
        emojis: ["😰", "😕", "😐", "😌", "🏠"],
        labels: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"],
      },
      {
        id: "recovery_confidence",
        type: "scale",
        text: "How confident are you in your recovery process?",
        min: 1,
        max: 10,
      },
      {
        id: "support_feeling",
        type: "emoji",
        text: "How supported do you feel by your healthcare team and family?",
        emojis: ["😞", "😕", "😐", "🤗", "❤️"],
        labels: ["Not Supported", "Slightly Supported", "Neutral", "Well Supported", "Very Supported"],
      },
    ]

    questions.forEach((question, index) => {
      const questionCard = this.createQuestionCard(question, index + 1)
      container.appendChild(questionCard)
    })
  }

  generatePostAssessment() {
    const container = document.getElementById("postQuestionnaire")
    const questions = [
      {
        id: "post_stress_emoji",
        type: "emoji",
        text: "After the VR therapy session, how are you feeling now?",
        emojis: ["😢", "😟", "😐", "🙂", "😊"],
        labels: ["Very Sad", "Worried", "Neutral", "Good", "Very Happy"],
      },
      {
        id: "post_pain_level",
        type: "scale",
        text: "How would you rate your pain level now after the VR session?",
        min: 1,
        max: 10,
      },
      {
        id: "post_anxiety_emoji",
        type: "emoji",
        text: "How anxious do you feel about your recovery now?",
        emojis: ["😰", "😨", "😕", "😌", "😎"],
        labels: ["Very Anxious", "Anxious", "Somewhat Worried", "Calm", "Very Confident"],
      },
      {
        id: "post_mood_color",
        type: "color",
        text: "Which color best represents your mood after the VR session?",
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"],
      },
      {
        id: "post_energy_emoji",
        type: "emoji",
        text: "How is your energy level after the VR session?",
        emojis: ["😴", "😪", "😐", "😊", "⚡"],
        labels: ["Very Tired", "Tired", "Neutral", "Energetic", "Very Energetic"],
      },
      {
        id: "post_overall_wellbeing",
        type: "scale",
        text: "Overall, how would you rate your wellbeing after the VR session?",
        min: 1,
        max: 10,
      },
      {
        id: "post_relaxation",
        type: "emoji",
        text: "How relaxed do you feel after the VR experience?",
        emojis: ["😤", "😕", "😐", "😌", "🧘"],
        labels: ["Very Tense", "Tense", "Neutral", "Relaxed", "Very Relaxed"],
      },
      {
        id: "post_appetite_level",
        type: "emoji",
        text: "How is your appetite after the VR session?",
        emojis: ["🚫", "😕", "😐", "😋", "🍽️"],
        labels: ["No Appetite", "Poor", "Normal", "Good", "Excellent"],
      },
      {
        id: "post_mobility_comfort",
        type: "scale",
        text: "How comfortable do you feel about moving around now?",
        min: 1,
        max: 10,
      },
      {
        id: "post_concentration",
        type: "emoji",
        text: "How is your mental clarity and focus now?",
        emojis: ["😵", "😕", "😐", "🤔", "🎯"],
        labels: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
      },
      {
        id: "post_social_comfort",
        type: "scale",
        text: "How do you feel about interacting with others now?",
        min: 1,
        max: 10,
      },
      {
        id: "post_motivation_level",
        type: "emoji",
        text: "How motivated do you feel about your recovery now?",
        emojis: ["😞", "😕", "😐", "💪", "🚀"],
        labels: ["Very Low", "Low", "Neutral", "High", "Very High"],
      },
      {
        id: "post_breathing_comfort",
        type: "scale",
        text: "How comfortable is your breathing after the VR session?",
        min: 1,
        max: 10,
      },
      {
        id: "post_nausea_level",
        type: "emoji",
        text: "Are you experiencing any nausea or dizziness now?",
        emojis: ["🤢", "😷", "😕", "😐", "😊"],
        labels: ["Very Nauseous", "Somewhat Nauseous", "Mild Discomfort", "Slight", "None"],
      },
      {
        id: "post_temperature_comfort",
        type: "scale",
        text: "How comfortable is your body temperature now?",
        min: 1,
        max: 10,
      },
      {
        id: "post_optimism_level",
        type: "emoji",
        text: "How optimistic do you feel about your recovery now?",
        emojis: ["😔", "😟", "😐", "🙂", "🌟"],
        labels: ["Very Pessimistic", "Pessimistic", "Neutral", "Optimistic", "Very Optimistic"],
      },
      {
        id: "post_stress_physical",
        type: "scale",
        text: "How much physical tension do you feel in your body now?",
        min: 1,
        max: 10,
      },
      {
        id: "post_comfort_environment",
        type: "emoji",
        text: "How comfortable do you feel in your environment now?",
        emojis: ["😰", "😕", "😐", "😌", "🏠"],
        labels: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"],
      },
      {
        id: "post_recovery_confidence",
        type: "scale",
        text: "How confident are you in your recovery process now?",
        min: 1,
        max: 10,
      },
      {
        id: "vr_experience_rating",
        type: "emoji",
        text: "How would you rate your overall VR therapy experience?",
        emojis: ["😞", "😕", "😐", "😊", "🌟"],
        labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      },
    ]

    questions.forEach((question, index) => {
      const questionCard = this.createQuestionCard(question, index + 1, "post")
      container.appendChild(questionCard)
    })
  }

  createQuestionCard(question, number, prefix = "pre") {
    const card = document.createElement("div")
    card.className = "question-card"

    let optionsHTML = ""

    switch (question.type) {
      case "emoji":
        optionsHTML = `
                    <div class="emoji-options">
                        ${question.emojis
                          .map(
                            (emoji, index) => `
                            <div class="emoji-option" data-value="${index + 1}" data-question="${prefix}_${question.id}" title="${question.labels[index]}">
                                ${emoji}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
        break

      case "scale":
        optionsHTML = `
                    <div class="scale-options">
                        ${Array.from(
                          { length: question.max - question.min + 1 },
                          (_, i) => `
                            <div class="scale-option" data-value="${question.min + i}" data-question="${prefix}_${question.id}">
                                ${question.min + i}
                            </div>
                        `,
                        ).join("")}
                    </div>
                `
        break

      case "color":
        optionsHTML = `
                    <div class="color-options">
                        ${question.colors
                          .map(
                            (color, index) => `
                            <div class="color-option" style="background-color: ${color}" data-value="${color}" data-question="${prefix}_${question.id}"></div>
                        `,
                          )
                          .join("")}
                    </div>
                `
        break
    }

    card.innerHTML = `
            <div class="question-header">
                <div class="question-number">${number}</div>
                <div class="question-text">${question.text}</div>
            </div>
            ${optionsHTML}
        `

    // Add event listeners for options
    const options = card.querySelectorAll("[data-question]")
    options.forEach((option) => {
      option.addEventListener("click", () => {
        // Remove selected class from siblings
        options.forEach((opt) => opt.classList.remove("selected"))
        // Add selected class to clicked option
        option.classList.add("selected")
      })
    })

    return card
  }

  handlePreAssessmentSubmit() {
    this.preAssessmentData = this.collectAssessmentData("pre")
    this.generateVRRecommendation()
    this.nextStep()
    setTimeout(() => {
      this.startVRSession()
    }, 2000)
  }

  handlePostAssessmentSubmit() {
    this.postAssessmentData = this.collectAssessmentData("post")
    this.generateResults()
    this.nextStep()
  }

  collectAssessmentData(prefix) {
    const data = {}
    const questions = document.querySelectorAll(`[data-question^="${prefix}_"]`)

    questions.forEach((question) => {
      const questionId = question.dataset.question

      if (question.classList.contains("selected")) {
        data[questionId] = question.dataset.value
      }
    })

    return data
  }

  generateVRRecommendation() {
    const container = document.getElementById("therapyRecommendation")
    const stressLevel = Number.parseInt(this.preAssessmentData.pre_stress_emoji) || 3
    const painLevel = Number.parseInt(this.preAssessmentData.pre_pain_level) || 5
    const anxietyLevel = Number.parseInt(this.preAssessmentData.pre_anxiety_emoji) || 3

    let recommendation = ""

    if (stressLevel <= 2 && anxietyLevel <= 2) {
      recommendation = `
                <h3><i class="fas fa-leaf"></i> Calming Nature Experience</h3>
                <p>Based on your stress and anxiety levels, we recommend a peaceful nature experience to help you relax and find inner calm.</p>
            `
    } else if (painLevel >= 7) {
      recommendation = `
                <h3><i class="fas fa-spa"></i> Pain Management Therapy</h3>
                <p>We've selected a specialized VR experience designed to help manage pain through guided meditation and visualization techniques.</p>
            `
    } else {
      recommendation = `
                <h3><i class="fas fa-heart"></i> Positive Healing Journey</h3>
                <p>Your assessment shows you're on a good path. This uplifting VR experience will boost your mood and accelerate your healing process.</p>
            `
    }

    container.innerHTML = recommendation
  }

  startVRSession() {
    const modal = document.getElementById("vrModal")
    modal.classList.add("active")

    const requestFullscreen = () => {
      if (modal.requestFullscreen) {
        return modal.requestFullscreen()
      } else if (modal.webkitRequestFullscreen) {
        return modal.webkitRequestFullscreen()
      } else if (modal.msRequestFullscreen) {
        return modal.msRequestFullscreen()
      }
      return Promise.resolve()
    }

    requestFullscreen()
      .then(() => {
        console.log("[v0] Entered fullscreen mode successfully")
        this.sessionStartTime = Date.now()
        this.startSessionTimer()

        setTimeout(() => {
          this.playVRVideo()
        }, 100)
      })
      .catch((e) => {
        console.log("[v0] Fullscreen request failed, continuing without fullscreen:", e)
        this.sessionStartTime = Date.now()
        this.startSessionTimer()

        setTimeout(() => {
          this.playVRVideo()
        }, 100)
      })
  }

  playVRVideo() {
    const video = document.getElementById("vrVideo")
    const currentVideoInfo = document.getElementById("currentVideoInfo")
    const progressText = document.getElementById("vrProgressText")

    console.log("[v0] Starting 3-minute VR therapeutic video")

    currentVideoInfo.textContent = "3-Minute Therapy Session"
    progressText.textContent = "VR therapy session in progress..."

    video.load()
    video.muted = false
    video.volume = 0.7

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("[v0] VR video started playing successfully")
          this.updateVRProgress()
          setTimeout(() => {
            this.completeVRSession()
          }, 180000) // 3 minutes = 180,000 milliseconds
        })
        .catch((e) => {
          console.log("[v0] Video autoplay failed:", e)
          video.muted = true
          video.play().catch(() => {
            setTimeout(() => {
              this.completeVRSession()
            }, 180000) // Still complete after 3 minutes even if video fails
          })
        })
    }
  }

  updateVRProgress() {
    const progressFill = document.getElementById("vrProgressFill")
    const video = document.getElementById("vrVideo")
    const startTime = Date.now()

    this.vrProgressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / 180000) * 100, 100) // 180000ms = 3 minutes
      progressFill.style.width = `${progress}%`

      // Auto-complete when 3 minutes elapsed
      if (elapsed >= 180000) {
        this.completeVRSession()
      }
    }, 1000)
  }

  completeVRSession() {
    if (this.vrProgressInterval) {
      clearInterval(this.vrProgressInterval)
    }

    const progressText = document.getElementById("vrProgressText")
    const progressFill = document.getElementById("vrProgressFill")

    progressText.textContent = "VR therapy session completed!"
    progressFill.style.width = "100%"

    setTimeout(() => {
      this.exitVRSession()
      this.nextStep()
    }, 3000)
  }

  exitVRSession() {
    const modal = document.getElementById("vrModal")
    modal.classList.remove("active")

    document.getElementById("vrVideo").pause()

    if (this.vrProgressInterval) {
      clearInterval(this.vrProgressInterval)
    }

    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  startSessionTimer() {
    this.sessionTimer = setInterval(() => {
      if (this.sessionStartTime) {
        const elapsed = Date.now() - this.sessionStartTime
        const minutes = Math.floor(elapsed / 60000)
        const seconds = Math.floor((elapsed % 60000) / 1000)
        const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

        document.getElementById("sessionTime").textContent = timeString
        document.getElementById("modalSessionTime").textContent = timeString
      }
    }, 1000)
  }

  generateResults() {
    const container = document.getElementById("resultsContainer")

    const stressImprovement = this.calculateImprovement("stress_emoji")
    const painImprovement = this.calculateImprovement("pain_level")
    const anxietyImprovement = this.calculateImprovement("anxiety_emoji")
    const wellbeingImprovement = this.calculateImprovement("overall_wellbeing")

    const sessionDuration = this.sessionStartTime ? Math.floor((Date.now() - this.sessionStartTime) / 60000) : 3

    container.innerHTML = `
            <div class="result-card">
                <div class="result-header">
                    <i class="result-icon fas fa-chart-line"></i>
                    <h3>Treatment Progress Summary</h3>
                </div>
                <p><strong>Session Duration:</strong> ${sessionDuration} minutes</p>
                <p><strong>Treatment Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>VR Therapy Type:</strong> Personalized Recovery Experience</p>
            </div>
            
            <div class="result-card">
                <div class="result-header">
                    <i class="result-icon fas fa-smile"></i>
                    <h3>Stress Level Improvement</h3>
                </div>
                <p>Improvement: ${stressImprovement}%</p>
                <div class="improvement-bar">
                    <div class="improvement-fill" style="width: ${Math.max(0, stressImprovement)}%"></div>
                </div>
            </div>
            
            <div class="result-card">
                <div class="result-header">
                    <i class="result-icon fas fa-heart"></i>
                    <h3>Pain Level Improvement</h3>
                </div>
                <p>Improvement: ${painImprovement}%</p>
                <div class="improvement-bar">
                    <div class="improvement-fill" style="width: ${Math.max(0, painImprovement)}%"></div>
                </div>
            </div>
            
            <div class="result-card">
                <div class="result-header">
                    <i class="result-icon fas fa-brain"></i>
                    <h3>Anxiety Level Improvement</h3>
                </div>
                <p>Improvement: ${anxietyImprovement}%</p>
                <div class="improvement-bar">
                    <div class="improvement-fill" style="width: ${Math.max(0, anxietyImprovement)}%"></div>
                </div>
            </div>
            
            <div class="result-card">
                <div class="result-header">
                    <i class="result-icon fas fa-star"></i>
                    <h3>Overall Wellbeing</h3>
                </div>
                <p>Improvement: ${wellbeingImprovement}%</p>
                <div class="improvement-bar">
                    <div class="improvement-fill" style="width: ${Math.max(0, wellbeingImprovement)}%"></div>
                </div>
            </div>
        `
  }

  calculateImprovement(metric) {
    const preKey = `pre_${metric}`
    const postKey = `post_${metric}`

    const preValue = Number.parseInt(this.preAssessmentData[preKey]) || 0
    const postValue = Number.parseInt(this.postAssessmentData[postKey]) || 0

    if (preValue === 0 && postValue === 0) {
      return 0
    }

    if (preValue === 0) {
      if (
        metric.includes("pain") ||
        metric.includes("anxiety") ||
        metric.includes("stress") ||
        metric.includes("nausea")
      ) {
        return postValue === 0 ? 100 : Math.max(0, 100 - postValue * 10)
      } else {
        return Math.min(100, postValue * 10)
      }
    }

    if (
      metric.includes("pain") ||
      metric.includes("anxiety") ||
      metric.includes("stress") ||
      metric.includes("nausea")
    ) {
      const improvement = ((preValue - postValue) / preValue) * 100
      return Math.round(Math.max(0, Math.min(100, improvement)))
    } else {
      const improvement = ((postValue - preValue) / preValue) * 100
      return Math.round(Math.max(0, Math.min(100, improvement)))
    }
  }

  downloadPDFReport() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    doc.setFontSize(24)
    doc.setTextColor(255, 107, 107)
    doc.text("RelieVR", 20, 30)

    doc.setFontSize(16)
    doc.setTextColor(78, 205, 196)
    doc.text("VR Therapy Report", 20, 45)

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("VR Therapy Session", 20, 70)
    doc.setFontSize(12)
    const sessionDuration = this.sessionStartTime ? Math.floor((Date.now() - this.sessionStartTime) / 60000) : 3
    doc.text(`Session Date: ${new Date().toLocaleDateString()}`, 20, 85)
    doc.text(`Session Duration: ${sessionDuration} minutes`, 20, 95)
    doc.text(`Therapy Type: Personalized Recovery Experience`, 20, 105)

    doc.setFontSize(14)
    doc.text("Pre-Assessment Results", 20, 130)
    doc.setFontSize(12)
    let yPos = 145

    Object.entries(this.preAssessmentData).forEach(([key, value]) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      const cleanKey = key.replace("pre_", "").replace("_", " ").toUpperCase()
      doc.text(`${cleanKey}: ${value}`, 20, yPos)
      yPos += 10
    })

    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.text("Post-Assessment Results", 20, yPos)
    yPos += 15
    doc.setFontSize(12)

    Object.entries(this.postAssessmentData).forEach(([key, value]) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      const cleanKey = key.replace("post_", "").replace("_", " ").toUpperCase()
      doc.text(`${cleanKey}: ${value}`, 20, yPos)
      yPos += 10
    })

    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.text("Treatment Improvements", 20, yPos)
    yPos += 15
    doc.setFontSize(12)

    const stressImprovement = this.calculateImprovement("stress_emoji")
    const painImprovement = this.calculateImprovement("pain_level")
    const anxietyImprovement = this.calculateImprovement("anxiety_emoji")
    const wellbeingImprovement = this.calculateImprovement("overall_wellbeing")

    doc.text(`Stress Level Improvement: ${stressImprovement}%`, 20, yPos)
    doc.text(`Pain Level Improvement: ${painImprovement}%`, 20, yPos + 10)
    doc.text(`Anxiety Level Improvement: ${anxietyImprovement}%`, 20, yPos + 20)
    doc.text(`Overall Wellbeing Improvement: ${wellbeingImprovement}%`, 20, yPos + 30)

    const fileName = `relievr-report-${new Date().toISOString().split("T")[0]}.pdf`
    doc.save(fileName)
  }

  scheduleFollowup() {
    alert(
      "Follow-up scheduling feature will be available soon. Please contact your healthcare provider to schedule your next VR therapy session.",
    )
  }

  nextStep() {
    document.querySelector(".step-section.active").classList.remove("active")

    this.currentStep++
    document.getElementById(`step${this.currentStep}`).classList.add("active")

    this.updateProgress()
  }

  updateProgress() {
    const progressFill = document.getElementById("progressFill")

    const percentage = (this.currentStep / this.totalSteps) * 100
    progressFill.style.width = `${percentage}%`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new RelieVRApp()
})
