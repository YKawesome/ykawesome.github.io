import { forwardRef } from "react";

const ProjectDisplay = forwardRef(
  (
    {
      iconSrc,
      text,
      onClick,
      onDoubleClick,
      iconClassName,
      textClassName,
      className,
    },
    ref
  ) => {
    return (
      <div
        className={`flex flex-col items-center gap-1 clickable ${className}`} // Apply className prop
        ref={ref}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <div
          className={`p-2 rounded-lg ${iconClassName}`}
          tabIndex={0}
        >
          <img
            src={iconSrc}
            alt="project-icon"
            className="h-36 w-36 rounded-3xl"
          />
        </div>
        <p
          className={`px-2 py-0 rounded-lg ${textClassName} text-2xl`}
          tabIndex={0}
        >
          {text}
        </p>
      </div>
    );
  }
);

export default ProjectDisplay;
