import { images } from "../../utils/preloadimages";
import { useState } from "react";

function KTANE() {
    const [rotation, setRotation] = useState(0);

    const handleRotate = () => {
        setRotation(prevRotation => prevRotation + 60);
    };

    const resetRotation = () => {
        setRotation(0);
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex flex-col items-center text-center">
                    <img
                        src={images["hexamaze.png"]}
                        className="w-7/12 transition-transform duration-300"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        alt="Hexamaze puzzle"
                    />
                    <div className="max-w-md mt-4 join"> {/* Added margin-top for spacing */}
                        <button className="btn btn-primary join-item" onClick={handleRotate}>Rotate 60°</button>
                        <button className="btn btn-secondary join-item" onClick={resetRotation}>Reset</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default KTANE;