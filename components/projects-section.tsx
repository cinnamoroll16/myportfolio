"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Leaf, Radio, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  icon: typeof Leaf
  color: string
  bgColor: string
  tags: string[]
  features: string[]
  year: string
  images: ProjectImage[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "ReForest",
    subtitle: "IoT-Based Soil Analysis and Tree Recommendation System",
    description:
      "Built an IoT-based monitoring system collecting real-time soil data (moisture, pH, temperature). Developed a recommendation algorithm for optimal tree species based on environmental conditions using Random Forest algorithm. Designed and implemented a web dashboard for data visualization and automated reporting.",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    tags: ["Python", "IoT", "Web Dashboard", "Random Forest", "Real-time Data"],
    features: [
      "Real-time soil monitoring sensors",
      "Random Forest recommendation algorithm",
      "Automated reports generation",
      "Interactive web dashboard",
    ],
    year: "2025",
    images: [
      { src: "/projects/reforest-dashboard.jpg", alt: "ReForest Dashboard", caption: "Main Dashboard - Real-time Soil Monitoring" },
      { src: "/projects/reforest-analytics.jpg", alt: "ReForest Analytics", caption: "Analytics View - Historical Data Trends" },
      { src: "/projects/reforest-recommendations.jpg", alt: "ReForest Recommendations", caption: "Tree Recommendation Engine Results" },
    ],
  },
  {
    id: 2,
    title: "Queueing System",
    subtitle: "Digital Queue Management Platform",
    description:
      "Engineered responsive UI components for ticketing and queue monitoring systems during my internship at Primary Group of Builders. Designed wireframes and user flows using Figma, improving usability and navigation. Integrated frontend with backend services for real-time updates and dynamic content.",
    icon: Radio,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    tags: ["React.js", "HTML5", "CSS3", "JavaScript", "Figma", "REST APIs"],
    features: [
      "Ticket generation system",
      "Real-time queue monitoring",
      "Mobile-first responsive design",
      "API integration for live updates",
    ],
    year: "2026",
    images: [
      { src: "/projects/queue-dashboard.jpg", alt: "Queue Dashboard", caption: "Queue Management Dashboard" },
      { src: "/projects/queue-ticket.jpg", alt: "Ticket System", caption: "Digital Ticket Generation Interface" },
      { src: "/projects/queue-monitor.jpg", alt: "Queue Monitor", caption: "Real-time Queue Monitoring Display" },
    ],
  },
]

// Lightbox Modal Component
function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev,
  projectTitle 
}: { 
  images: ProjectImage[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  projectTitle: string
}) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowRight") onNext()
    if (e.key === "ArrowLeft") onPrev()
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/90 backdrop-blur-md" />
      
      {/* Content */}
      <div 
        className="relative z-10 w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-primary-foreground">
            <h3 className="text-lg font-semibold text-background dark:text-foreground">{projectTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-background dark:text-foreground hover:bg-background/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-card shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        {images[currentIndex].caption && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 text-sm text-muted-foreground"
          >
            {images[currentIndex].caption}
          </motion.p>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const diff = idx - currentIndex
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext()
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev()
                  }
                }}
                className={`relative w-16 h-10 rounded-md overflow-hidden transition-all ${
                  idx === currentIndex 
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background/0" 
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<{ projectId: number; imageIndex: number } | null>(null)

  const currentProject = lightbox ? projects.find(p => p.id === lightbox.projectId) : null

  const openLightbox = (projectId: number, imageIndex: number = 0) => {
    setLightbox({ projectId, imageIndex })
  }

  const closeLightbox = () => setLightbox(null)

  const nextImage = () => {
    if (!lightbox || !currentProject) return
    setLightbox({
      ...lightbox,
      imageIndex: (lightbox.imageIndex + 1) % currentProject.images.length
    })
  }

  const prevImage = () => {
    if (!lightbox || !currentProject) return
    setLightbox({
      ...lightbox,
      imageIndex: (lightbox.imageIndex - 1 + currentProject.images.length) % currentProject.images.length
    })
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Featured Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            Building <span className="text-gradient">Innovative Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of IoT systems and web applications that combine technology with real-world impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TiltCard className="h-full">
                <Card
                  className="relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Preview */}
                  <div 
                    className={`relative h-48 overflow-hidden cursor-pointer group/image ${project.bgColor}`}
                    onClick={() => openLightbox(project.id, 0)}
                  >
                    {project.images.length > 0 ? (
                      <>
                        <Image
                          src={project.images[0].src}
                          alt={project.images[0].alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                          <div className="p-3 rounded-full bg-background/90 backdrop-blur-sm shadow-lg">
                            <ZoomIn className="w-6 h-6 text-foreground" />
                          </div>
                        </div>
                        {/* Image count badge */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium flex items-center gap-1.5">
                          <span>{project.images.length} screenshots</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color}`}>
                          <project.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    )}
                    {/* Year badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium">
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    {/* Features - Show on hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        hoveredId === project.id
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 py-4 border-t border-border/50">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Github className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        View Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 group bg-primary hover:bg-primary/90"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        Live Demo
                      </Button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 -z-10`}
                    animate={{ opacity: hoveredId === project.id ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && currentProject && (
          <Lightbox
            images={currentProject.images}
            currentIndex={lightbox.imageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            projectTitle={currentProject.title}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
