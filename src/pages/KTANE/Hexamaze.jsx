import { images } from "../../utils/preloadimages";
import { useState } from "react";

function Hexamaze() {
    const [rotation, setRotation] = useState(0);

    const handleRotate = () => {
        setRotation(prevRotation => prevRotation + 60);
    };

    const resetRotation = () => {
        setRotation(0);
    };

    return (
        <>
            <div className="hero bg-secondary text-secondary-content h-[15vh]">
                <div className="hero-content text-center flex flex-col items-center">
                    <p className="text-5xl font-bold">On the subject of Hexamazes...</p>
                    <p className="text-xl"> Click Rotate to rotate the maze!</p>
                </div>
            </div>
            <div className="hero bg-base-200 min-h-screen py-5">
                <div className="hero-content flex flex-col items-center text-center">
                    <img
                        src={images["hexamaze.png"]}
                        className="w-7/12 transition-transform duration-300"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        alt="Hexamaze puzzle"
                    />
                    <div className="max-w-md mt-4">
                        <div className="join">
                            <button className="btn btn-primary join-item" onClick={handleRotate}>Rotate 60°</button>
                            <button className="btn btn-secondary join-item" onClick={resetRotation}>Reset</button>
                        </div>
                    </div>
                    <img
                        src={images["hexamini.png"]}
                        className="w-1/4 transition-transform duration-300"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        alt="Hexamaze puzzle"
                    />
                </div>
            </div>
        </>
    )
}

export default Hexamaze;