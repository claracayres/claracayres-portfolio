// src/data/achievementsData.js

import English from "../assets/Certificates/Learn English Intermediate Grammar-1.png";
import english from "../assets/Certificates/english.jpg";
import backEnd from "../assets/Certificates/IBM back-end development.png";
import frontJohn from "../assets/Certificates/HTML, CSS, and Javascript for Web Developers-1.png";
import estrPython from "../assets/Certificates/Estrutura de dados em python-1.png";

// Arrays de imagens usando import.meta.glob
const englishUci = import.meta.glob("../assets/Certificates/English UCI/*.png", { eager: true });
const images1 = Object.values(englishUci).map(mod => mod?.default || mod).filter(Boolean);
const finalImageList1 = Array.from(new Set([English, ...images1]));

const ibmBackEnd = import.meta.glob("../assets/Certificates/IBM back-end/*.png", { eager: true });
const images2 = Object.values(ibmBackEnd).map(mod => mod?.default || mod).filter(Boolean);
const finalImageList2 = Array.from(new Set([backEnd, ...images2]));

const webDevJHU = import.meta.glob("../assets/Certificates/Web Dev John Hopkins/*.png", { eager: true });
const images3 = Object.values(webDevJHU).map(mod => mod?.default || mod).filter(Boolean);
const finalImageList3 = Array.from(new Set([frontJohn, ...images3]));

const meta = import.meta.glob("../assets/Certificates/Meta/*.png", { eager: true });
const images4 = Object.values(meta).map(mod => mod?.default || mod).filter(Boolean);
const finalImageList4 = Array.from(new Set([...images4]));

export const achievements = [
  {
    id: 1,
    titleKey: "achievements.card1.title",
    institution: "University of California, Irvine",
    dateKey: "achievements.card1.date",
    descKey: "achievements.card1.description",
    images: finalImageList1,
    tags: ["English", "Adjectives", "Clauses", "Grammar", "Vocabulary"],
    certificateUrl: "https://www.coursera.org/account/accomplishments/specialization/84278JLPIK94"
  },
  {
    id: 2,
    titleKey: "achievements.card2.title",
    institution: "Wake Tech",
    dateKey: "achievements.card2.date",
    descKey: "achievements.card2.description",
    images: [english],
    tags: ["English", "Grammar", "Vocabulary", "Conversation"],
    certificateUrl: english
  },
  {
    id: 3,
    titleKey: "achievements.card3.title",
    institution: "IBM",
    dateKey: "achievements.card3.date",
    descKey: "achievements.card3.description",
    images: finalImageList2,
    tags: ["Python", "Flask", "Docker", "Kubernetes", "Microservices", "CI/CD"],
    certificateUrl: "https://coursera.org/share/efe845ebd8e85c811815e568972a73c7"
  },
  {
    id: 4,
    titleKey: "achievements.card4.title",
    institution: "Johns Hopkins University",
    dateKey: "achievements.card4.date",
    descKey: "achievements.card4.description",
    images: finalImageList3,
    tags: ["HTML5", "CSS3", "JavaScript", "AJAX", "UI/UX Design", "Responsive Design"],
    certificateUrl: "https://coursera.org/share/81640d8b5ac271200908ac2247213225"
  },
  {
    id: 5,
    titleKey: "achievements.card5.title",
    institution: "Anhanguera",
    dateKey: "achievements.card5.date",
    descKey: "achievements.card5.description",
    images: [estrPython],
    tags: ["Python", "Data Structures", "Algorithms", "Programming"],
    certificateUrl: estrPython
  },
  {
    id: 6,
    titleKey: "achievements.card6.title",
    institution: "Meta",
    dateKey: "achievements.card6.date",
    descKey: "achievements.card6.description",
    images: finalImageList4,
    tags: ["Html5", "CSS3", "React", "UX/UI", "JavaScript"],
    certificateUrl: estrPython
  }
];
export default achievements;