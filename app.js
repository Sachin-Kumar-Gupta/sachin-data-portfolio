
"use strict";

/* ==========================================
   CONFIGURATION
========================================== */

const CONFIG = {
  email: "YOUR_EMAIL@gmail.com"
};


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });

  document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation");

    });

  });

}


/* ==========================================
   STICKY HEADER
========================================== */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {

  if (!siteHeader) return;

  siteHeader.classList.toggle("scrolled", window.scrollY > 30);

}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`
        );

      });

    });

  },
  {
    threshold: 0.25,
    rootMargin: "-80px 0px -40% 0px"
  }
);

sections.forEach(section => observer.observe(section));


/* ==========================================
   PORTFOLIO FILTERS
========================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    projectCards.forEach(card => {

      const categories = card.dataset.category || "";

      const shouldShow =
        filter === "all" || categories.includes(filter);

      card.classList.toggle("hidden", !shouldShow);

    });

  });

});


/* ==========================================
   PROJECT CASE STUDIES
========================================== */

const projects = {

  inventory: {
    label: "INVENTORY ANALYTICS",
    title: "Inventory & Operations Intelligence",
    description:
      "A business intelligence project designed to analyze inventory movement, purchase orders, suppliers, warehouse operations, sales activity, and demand forecasting.",
    tools: "Tableau, Python, Pandas",
    focus: "Inventory & operations",
    features: [
      "Inventory level and stock movement analysis",
      "Supplier and purchase order performance",
      "Warehouse and sales order analysis",
      "Demand forecasting and planning",
      "Dashboard-based business reporting"
    ]
  },

  marketing: {
    label: "MARKETING ANALYTICS",
    title: "Marketing Campaign Intelligence",
    description:
      "An analytics project covering campaign performance, channel effectiveness, target versus actual KPIs, customer activity, and marketing performance reporting.",
    tools: "Python, Pandas, Tableau",
    focus: "Marketing performance",
    features: [
      "Campaign performance analysis",
      "Channel-level KPI comparison",
      "CTR, CPC, CPL and campaign metrics",
      "Target versus actual performance",
      "Customer activity and marketing insights"
    ]
  },

  gaming: {
    label: "GAMING ANALYTICS",
    title: "Gaming Analytics Portfolio",
    description:
      "A collection of gaming analytics projects exploring player engagement, monetization, retention, churn, and customer behavior.",
    tools: "SQL, Python, Tableau",
    focus: "Player behavior",
    features: [
      "Player engagement analysis",
      "Monetization and conversion analysis",
      "Retention and churn analysis",
      "Customer segmentation",
      "Gaming performance dashboards"
    ]
  },

  saar: {
    label: "AI & NLP",
    title: "SAAR — Sales Intelligence",
    description:
      "An AI-driven sales intelligence concept focused on analyzing sales conversations and extracting actionable insights for real estate sales teams.",
    tools: "AI, NLP, Python",
    focus: "Sales intelligence",
    features: [
      "Sales conversation analysis",
      "Objection identification",
      "AI-assisted reporting",
      "Sales performance insights",
      "Business intelligence prototypes"
    ]
  }

};

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTools = document.getElementById("modalTools");
const modalFocus = document.getElementById("modalFocus");
const modalFeatures = document.getElementById("modalFeatures");

const projectOpenButtons = document.querySelectorAll(".project-open");

let lastFocusedElement = null;

function openProjectModal(projectId) {

  const project = projects[projectId];

  if (!project || !projectModal) return;

  lastFocusedElement = document.activeElement;

  modalLabel.textContent = project.label;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTools.textContent = project.tools;
  modalFocus.textContent = project.focus;

  modalFeatures.innerHTML = "";

  project.features.forEach(feature => {

    const li = document.createElement("li");

    li.textContent = feature;

    modalFeatures.appendChild(li);

  });

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  modalClose.focus();

}

function closeProjectModal() {

  if (!projectModal) return;

  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }

}

projectOpenButtons.forEach(button => {

  button.addEventListener("click", () => {

    openProjectModal(button.dataset.project);

  });

});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {

  projectModal.addEventListener("click", event => {

    if (event.target === projectModal) {
      closeProjectModal();
    }

  });

}

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeProjectModal();
  }

});


/* ==========================================
   MODAL CONTACT BUTTON
========================================== */

document.querySelector(".modal-contact")?.addEventListener("click", () => {

  closeProjectModal();

  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth"
  });

});


/* ==========================================
   CONTACT FORM → EMAIL
========================================== */

const projectForm = document.getElementById("projectForm");
const formStatus = document.getElementById("formStatus");

if (projectForm) {

  projectForm.addEventListener("submit", event => {

    event.preventDefault();

    const formData = new FormData(projectForm);

    const name = formData.get("name");
    const email = formData.get("email");
    const service = formData.get("service") || "Not specified";
    const budget = formData.get("budget") || "Not specified";
    const message = formData.get("message");

    if (!CONFIG.email || CONFIG.email === "YOUR_EMAIL@gmail.com") {

      formStatus.textContent =
        "Please configure your email address in app.js first.";

      return;

    }

    const subject = encodeURIComponent(
      `New Project Inquiry — ${service}`
    );

    const body = encodeURIComponent(
      `Hello Sachin,

I would like to discuss a project.

Name: ${name}
Email: ${email}
Service: ${service}
Budget: ${budget}

Project Details:
${message}

Thank you.`
    );

    const mailtoLink =
      `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    formStatus.textContent =
      "Opening your email app...";

  });

}


/* ==========================================
   BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

  if (!backToTop) return;

  backToTop.classList.toggle("visible", window.scrollY > 500);

}

window.addEventListener("scroll", updateBackToTop, { passive: true });

updateBackToTop();

if (backToTop) {

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* ==========================================
   CURRENT YEAR
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}
