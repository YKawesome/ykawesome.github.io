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
            <div className="hero bg-secondary text-secondary-content h-[12vh]">
                <div className="hero-content text-center flex flex-col items-center">
                    <p className="md:text-5xl text-2xl font-bold">On the Subject of Hexamazes</p>
                    <p className="md:text-xl text-lg"> Click the maze to rotate it!</p>
                </div>
            </div>
            <div className="hero bg-base-200 py-5">
                <div className="hero-content flex flex-col items-center text-center">
                    <img
                        src={images["hexamini.png"]}
                        className="w-1/4 transition-transform duration-300 cursor-grab"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        alt="Hexamaze puzzle"
                        onClick={handleRotate}
                    />
                    <img
                        src={images["hexamaze.png"]}
                        className="w-7/12 transition-transform duration-300 cursor-grab"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        alt="Hexamaze puzzle"
                        onClick={handleRotate}
                    />
                    <div className="max-w-md mt-4">
                        <button className="btn btn-secondary" onClick={resetRotation}>Reset</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hexamaze;