"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap, Award, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Frontend Developer Intern",
    subtitle: "UX/UI Designer & Web Developer",
    company: "Primary Group of Builders",
    period: "2026 - Present",
    icon: Briefcase,
    color: "bg-primary",
    description: [
      "Designed and implemented UX/UI for a digital queueing system, improving user flow and service efficiency",
      "Developed responsive web interfaces using HTML, CSS, and JavaScript with mobile-first design principles",
      "Collaborated with backend developers to integrate APIs and dynamic data into the frontend",
      "Conducted usability testing and refined UI components, improving accessibility and user interaction",
    ],
  },
  {
    id: 2,
    type: "work",
    title: "Secretary (Working Scholar)",
    subtitle: "Administrative & Technical Support",
    company: "University of Cebu - Banilad Campus",
    period: "2022 - Present",
    icon: Briefcase,
    color: "bg-emerald-500",
    description: [
      "Managed scheduling, documentation, and academic records using Microsoft Excel",
      "Provided administrative and technical support for faculty, including lab equipment preparation",
      "Coordinated communication between faculty and students for smooth academic operations",
      "Assisted in troubleshooting basic hardware and system issues during classes and examinations",
    ],
  },
  {
    id: 3,
    type: "education",
    title: "Bachelor of Science in Information Technology",
    subtitle: "Expected Graduation: May 2026",
    company: "University of Cebu – Banilad",
    period: "2022 – 2026",
    icon: GraduationCap,
    color: "bg-blue-500",
    description: [
      "Relevant Coursework: CCNA - Introduction to Networks, IoT Systems Development, UX/UI Design",
      "Dean's Lister from 1st year to 2nd year",
      "Lead developer for capstone IoT project (ReForest)",
      "Balanced full-time academics with working scholar responsibilities",
    ],
  },
  {
    id: 4,
    type: "certification",
    title: "Microsoft Certified: Azure Fundamentals",
    subtitle: "AZ-900",
    company: "Microsoft",
    period: "2025",
    icon: Award,
    color: "bg-amber-500",
    description: ["Cloud computing concepts and Azure services", "Azure pricing, SLA, and lifecycle", "Cloud security, privacy, compliance, and trust"],
  },
  {
    id: 5,
    type: "certification",
    title: "CCNA: Introduction to Networks",
    subtitle: "Networking Fundamentals",
    company: "Cisco Networking Academy",
    period: "2024",
    icon: Award,
    color: "bg-cyan-500",
    description: ["Network fundamentals and access", "IP connectivity and services", "Network security basics"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Experience & Education
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From working scholar to frontend developer - a path of growth and dedication
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${exp.color} border-4 border-background md:-translate-x-1/2 z-10`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      activeId === exp.id ? "ring-2 ring-primary" : ""
                    } bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30`}
                    onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${exp.color}`}>
                        <exp.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-lg truncate">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                        </div>
                        <p className="text-primary font-medium text-sm">{exp.subtitle}</p>
                        <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>

                        {/* Expandable Content */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: activeId === exp.id ? "auto" : 0,
                            opacity: activeId === exp.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2">
                            {exp.description.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={activeId === exp.id ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Click hint */}
                        <p className="text-xs text-muted-foreground/60 mt-3">
                          {activeId === exp.id ? "Click to collapse" : "Click to expand"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
