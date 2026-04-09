"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Mail, Phone, Award, GraduationCap, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  { icon: GraduationCap, label: "Education", value: "BSIT 2026", sublabel: "UC Banilad" },
  { icon: Briefcase, label: "Experience", value: "4+ Years", sublabel: "Working Scholar" },
  { icon: Award, label: "Achievement", value: "Dean's Lister", sublabel: "1st-2nd Year" },
]

const highlights = [
  "React.js & JavaScript",
  "UX/UI Design & Figma",
  "Mobile Development",
  "IoT Systems",
  "REST APIs",
  "Cloud (Azure/Firebase)",
  "Database (MySQL/MongoDB)",
  "Responsive Design",
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            Turning Ideas into <span className="text-gradient">Digital Reality</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m a motivated and adaptable IT student at University of Cebu - Banilad, graduating in May 2026. 
              With hands-on experience in frontend development, UX/UI design, and IoT systems, I bring a unique 
              blend of technical skills and creative problem-solving to every project.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently interning as a Frontend Developer at Primary Group of Builders, where I design and 
              implement UX/UI for digital systems. My journey began as a working scholar, providing technical 
              support while maintaining Dean&apos;s List status for two consecutive years.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m Microsoft Azure Certified (AZ-900) and have completed CCNA: Introduction to Networks. 
              I specialize in React.js, responsive design, and building user-centered applications that make 
              a real impact.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Tisa, Cebu City, Philippines</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:maryjessadano16@gmail.com" className="text-sm hover:text-primary transition-colors">
                  maryjessadano16@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+63-966-991-1143</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Highlights */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-3">
                {highlights.map((highlight, index) => (
                  <motion.span
                    key={highlight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="px-4 py-2 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
