export const departments = [
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "computer",
    paperCount: 1240,
    courseCount: 45,
    description:
      "Explore past papers from core computing modules including algorithms, software engineering, databases, and more.",
  },
  {
    id: "networking",
    name: "Networking",
    icon: "router",
    paperCount: 850,
    courseCount: 32,
    description:
      "Access networking examination resources covering protocols, security, wireless technologies, and network administration.",
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: "database",
    paperCount: 620,
    courseCount: 28,
    description:
      "Find data science papers spanning analytics, machine learning, statistical methods, and big data processing.",
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    icon: "memory",
    paperCount: 1050,
    courseCount: 38,
    description:
      "Browse software engineering papers on design patterns, project management, testing, and development methodologies.",
  },
];

export function getDepartmentById(id) {
  return departments.find((d) => d.id === id);
}
