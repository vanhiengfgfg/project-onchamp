import { useEffect, useState } from 'react';
import img1 from '../assets/slice1.webp';
import img2 from '../assets/slice2.webp';
import img3 from '../assets/slice3.webp';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [img1, img2, img3];
function Slice() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % IMAGES.length);
    const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative mx-auto max-w-3xl">
            <img
                src={IMAGES[index]}
                alt={`slice-${index}`}
                className="w-full rounded-e-2xl object-cover"
            />
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 translate-y-1/2 rounded-full bg-black/30 p-2 text-white"
            >
                <ChevronLeft />
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 translate-y-1/2 rounded-full bg-black/30 p-2 text-white"
            >
                <ChevronRight />
            </button>
        </div>
    );
}

export default Slice;
