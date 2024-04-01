"use client";

import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

//TODO: Add a footer with social media links
//TODO: Add a contact form
//TODO: Add a header with a profile picture and a short bio
//TODO: Add a button to download the resume as a PDF
//TODO: Add a button to switch between light and dark mode

// Define the projects array and its structure
interface Project {
  imageUrl: string;
  title: string;
  description: string;
  techStack: string[];
}
interface Skills {
  [category: string]: string[];
}
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skills>({});
  const [hasFired, setHasFired] = useState(false);


  // Fetch project data from JSON file
  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Fetch skills data from JSON file
  useEffect(() => {
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);
  // Notify the master that the site was visited
  //FIXME: fires twice no metter what...
  useEffect(() => {
    if (!hasFired) {
      axios
        .post("http://3.71.199.13/site", "site visited")
        .then(() => {
          console.log("I Notified My Master");
          setHasFired(true);
        })
        .catch(() => console.error("I Failed to Notify My Master"));
    }
  }, [hasFired]);
  // Render the page
  return (
    <>
      <Head>
        <title>Student Resume</title>
        <meta name="description" content="Student Resume Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Nir Tuttnauer</h1>
          {/* Education */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-gray-600">
                  College of Management Academic Studies, 2022 – present |
                  Israel
                </p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Intern</h3>
                <p className="text-gray-600">DevClub, 2022 – present</p>
                <ul className="list-disc list-inside">
                  <li>
                    Learning advanced web development technologies such as
                    React.js, express, and Mongodb.
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">
                  Photographer & Designer
                </h3>
                <p className="text-gray-600">Self Employed, 2011 – 2021</p>
                <ul className="list-disc list-inside">
                  <li>
                    Managed client relationships, developed strong communication
                    and adaptability skills.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Loop through skill categories */}
              {Object.keys(skills).map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium mb-2">{category}</h3>
                  <ul className="list-disc list-inside">
                    {/* Loop through skills within a category */}
                    {skills[category].map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* TODO: Add Images to the projects*/}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <div className="relative h-40 md:h-56">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-8 bg-gray-800 text-white py-6 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">NIRAPP</h3>
              <p className="mt-2">1234 Street, City, State, Country</p>
              <p className="mt-2">nir.tuttnauer@gmail.com</p>
            </div>
            <div>
              <a href="#" className="text-white hover:underline">
                Terms of Service
              </a>
              <a href="#" className="ml-4 text-white hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
