window.PORTFOLIO_PROJECTS = {
  "redis-locks": {
    title: "Redis Lock Redesign",
    tags: ["Redis", "Distributed systems", "GM Motorsports"],
    sections: [
      {
        heading: "Context",
        body: "Live race telemetry and strategy tooling runs in a fast, event-driven environment where multiple services need coordinated access to shared state during race operations."
      },
      {
        heading: "Problem",
        body: "A single global Redis lock created contention bottlenecks. Parallel processing of telemetry and strategy work was limited because unrelated race and vehicle work serialized behind one lock."
      },
      {
        heading: "Approach",
        body: "Collaborated cross-functionally to replace the global lock with granular race-level and vehicle-level locks. The redesign was rolled out while preserving backward-compatible legacy lock behavior so production safety was maintained during validation."
      },
      {
        heading: "Outcome",
        body: "Reduced lock contention and improved parallel processing throughput for telemetry workflows, without a risky big-bang cutover on race operations tooling."
      }
    ]
  },
  "infra-clis": {
    title: "Infra Automation CLIs",
    tags: ["CLI", "Terraform", "AWS", "Docker", "JPMorgan"],
    sections: [
      {
        heading: "Context",
        body: "Infrastructure and environments teams spent too much time on repetitive, error-prone manual steps — especially Terraform module version updates and getting application images into dedicated AWS dev environments."
      },
      {
        heading: "Problem",
        body: "Manual Terraform module versioning hurt technical currency and accuracy. Semi-manual Docker build and deploy workflows added cognitive load and slowed engineers who just needed a reliable path to a dev environment."
      },
      {
        heading: "Approach",
        body: "Built focused CLI tools: one to replace manual Terraform module version updates, and another to build Docker images and deploy to a dedicated AWS dev environment with a simple command. Documented the deploy tool thoroughly for handoff."
      },
      {
        heading: "Outcome",
        body: "The deploy CLI was handed off to another team and gained widespread internal adoption. Engineers got a lower-friction path to accurate infrastructure updates and faster local-to-cloud iteration."
      }
    ]
  },
  "order-pipeline": {
    title: "Order Microservices",
    tags: ["Python", "Microservices", "Jenkins", "Charter / Spectrum"],
    sections: [
      {
        heading: "Context",
        body: "Enterprise internet orders moved from Salesforce through configuration management, provisioning, and orchestration before customers received working service on devices."
      },
      {
        heading: "Problem",
        body: "Provisioning workflows were slow and deployments were manual overnight processes. Order processing could take hours, which hurt operational efficiency and delayed customer outcomes."
      },
      {
        heading: "Approach",
        body: "Built, maintained, and enhanced four core microservices covering the full order path. Optimized provisioning workflows, introduced Jenkins CI/CD for service deployments, and established automated testing with PyTest."
      },
      {
        heading: "Outcome",
        body: "Order processing times dropped from hours to minutes. Deployments became repeatable daytime work instead of fragile overnight manual releases."
      }
    ]
  },
  "ocr-routing": {
    title: "OCR & Dynamic Routing",
    tags: ["OCR", "Python", "Logistics", "Command Alkon / Ruckit"],
    sections: [
      {
        heading: "Context",
        body: "Logistics operations relied on paper tickets and dispatcher coordination across jobs, companies, drivers, and trucks — a complex graph of relationships that was hard to keep accurate in real time."
      },
      {
        heading: "Problem",
        body: "Paper ticket processing was manual and slow. Dispatchers absorbed high communication overhead assigning drivers to new loads as work became available."
      },
      {
        heading: "Approach",
        body: "Built an OCR-based ticketing pipeline using Google OCR to extract logistics data, then designed a modular rerouting mechanism that automatically produced new driver jobs from known inputs as drivers were ready for the next load."
      },
      {
        heading: "Outcome",
        body: "Automated ticket intake and streamlined dispatcher workflows with real-time job assignment. The modular design also laid groundwork for future machine-learning-based format inference."
      }
    ]
  },
  eliminator: {
    title: "Bookclub Eliminator",
    tags: ["FastAPI", "React", "WebSockets", "SQLite"],
    links: [{ label: "Open app", href: "https://theartisonian.com/bookclub/" }],
    sections: [
      {
        heading: "What it is",
        body: "A real-time book eliminator for the GNO Book Club. Members submit candidate books, then the group repeatedly eliminates a random title until one winner remains."
      },
      {
        heading: "How it works",
        body: "A FastAPI backend persists books in SQLite and exposes REST endpoints to list, add, and eliminate books. Elimination results are broadcast to all connected clients over WebSockets so every participant stays in sync."
      },
      {
        heading: "Stack",
        body: "Python/FastAPI + SQLAlchemy Core on the backend; React + Vite + Material UI on the frontend."
      },
      {
        heading: "Why I built it",
        body: "A small, complete product that exercises live event delivery, shared state, and a clean full-stack loop — useful both for the club and as a portable demo of real-time UI patterns."
      }
    ]
  },
  newspaper: {
    title: "Newspaper",
    tags: ["React", "Community", "theartisonian.com"],
    links: [
      { label: "Open app", href: "/newspaper/" },
      { label: "GitHub", href: "https://github.com/SonyaEick/LocalNewspaper" }
    ],
    sections: [
      {
        heading: "What it is",
        body: "A shared newspaper where anyone can publish a news-style update about whatever they find worth sharing—whether that’s within a close friend group or out to a wider audience."
      },
      {
        heading: "Why it exists",
        body: "Stories that matter to people you know often disappear into group chats and feeds. Newspaper gives those updates a dedicated place to be written, read, and passed around like a paper made by the community itself."
      },
      {
        heading: "Where it lives",
        body: "Hosted at theartisonian.com/newspaper, with source on GitHub: github.com/SonyaEick/LocalNewspaper"
      }
    ]
  },
  oyster: {
    title: "Oyster",
    tags: ["Django", "Places", "theartisonian.com"],
    links: [{ label: "Open app", href: "https://oyster.theartisonian.com" }],
    sections: [
      {
        heading: "What it is",
        body: "Your personal memory bank for all the places you’ve been and why you love them."
      },
      {
        heading: "The problem it solves",
        body: "Choosing where to go often stalls on vague preferences—“somewhere indoors, fancy, with high-end cocktails, good for an anniversary, and free parking,” or even “places my wife loves.” Oyster lets you capture places with the tags and details that matter to you, so you can filter your own history when you can’t decide or can’t remember every spot you’ve been."
      },
      {
        heading: "Do not return",
        body: "If you’ve ever gone back somewhere and forgotten why you never wanted to return, add your own DNR tag and filter it out later."
      },
      {
        heading: "Where it lives",
        body: "Hosted at oyster.theartisonian.com."
      }
    ]
  }
};
