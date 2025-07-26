import React from "react";
import { DragCloseDrawer } from "../BottomDrawer/DragCloseDrawer";
import ProjectDisplay from "./ProjectDisplay";
import { images } from "../../utils/preloadimages";

const ProjectsDrawer = ({ open, setOpen, activeProject, setActiveProject, navigate, highlightRef }) => {
  return (
    <DragCloseDrawer open={open} setOpen={setOpen}>
      <div>
        <p className="text-8xl font-bold text-center text-neutral-content mb-10">
          Projects
        </p>
      </div>
      <div className="flex flex-row gap-5 justify-center text-neutral-content">
        {[
          { id: "antlogic", icon: "antlogicicon.png", text: "AntLogic", route: "/projects/antlogic" },
          { id: "checkersai", icon: "checkersaiicon.png", text: "CheckersAI", route: "/projects/checkersai" },
          { id: "calculator", icon: "calculatoricon.png", text: "Calculator", route: "/projects/calculator" },
          { id: "splitter", icon: "splittericon.png", text: "Splitter", route: "/projects/splitter" },
        ].map((project) => (
          <ProjectDisplay
            key={project.id}
            ref={highlightRef}
            iconSrc={images[project.icon]}
            text={project.text}
            onClick={() => setActiveProject(project.id)}
            onDoubleClick={() => navigate(project.route)}
            iconClassName={activeProject === project.id ? "bg-base-100/20" : ""} // Apply icon-specific classes
            textClassName={activeProject === project.id ? "bg-base-100 text-base-content" : ""} // Apply text-specific classes
          />
        ))}
      </div>
    </DragCloseDrawer>
  );
};

export default ProjectsDrawer;
