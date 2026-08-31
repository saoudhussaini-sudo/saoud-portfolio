export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  fullNameFormatted: string;
  role: string;
  location: string;
  email: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  year: string;
  availability: string;
  shortBio: string;
  editorialBio: string[];
  avatarUrl: string;
  marqueeItems: string[];
}

export const personalData: PersonalInfo = {
  name: "Syed Saoud Ullah Hussaini",
  firstName: "SAOUD",
  lastName: "HUSSAINI",
  fullNameFormatted: "SYED SAOUD\nULLAH HUSSAINI",
  role: "SOFTWARE DEVELOPER",
  location: "Hyderabad, India",
  email: "saoudhussaini@gmail.com",
  github: "https://github.com/saoudhussaini-sudo",
  githubUsername: "saoudhussaini-sudo",
  linkedin: "https://www.linkedin.com/in/saoud-hussaini-041410",
  year: "©2026",
  availability: "AVAILABLE FOR OPPORTUNITIES",
  shortBio:
    "Hey, I'm Saoud — a software developer and builder from Hyderabad, India. I enjoy turning ideas into useful digital products, experimenting with new technologies, and solving real-world problems through software.",
  editorialBio: [
    "I'm Syed Saoud Ullah Hussaini, a student and aspiring software developer from Hyderabad, India.",
    "I enjoy building practical projects, experimenting with new technologies, and turning ideas into working products. Currently exploring Python, web development, AI, automation, and software development.",
    "Always learning. Always building. Always curious about what's next.",
  ],
  avatarUrl: "/portrait.jpg",
  marqueeItems: [
    "FROM IDEA TO PRODUCT.",
    "BUILD. EXPERIMENT. SHIP.",
    "SOFTWARE WITH PURPOSE.",
    "CLEAN CODE & FLUID MOTION.",
    "END-TO-END DIGITAL CRAFT.",
  ],
};
