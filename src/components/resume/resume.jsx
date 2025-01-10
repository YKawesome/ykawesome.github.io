import resume from "../../../public/Yousef's Resume.pdf";

function Resume() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center flex flex-col items-center">
        <div className="w-full max-w-4xl h-full mt-6">
            <embed src={resume} type="application/pdf" width="650px" height="850px" />
        </div>
        <a className="btn btn-primary hovergrow" href={resume} download="Yousef's Resume">Download</a>
      </div>
    </div>
  );
}

export default Resume;