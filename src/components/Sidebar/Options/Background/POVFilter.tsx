import { useTranslation } from "react-i18next";
import { IFilter } from "../../../../types/IFilter";

interface POVFilterProps {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter | undefined>>;
}

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const POVFilter: React.FC<POVFilterProps> = ({ filter, setFilter }) => {
    const { t } = useTranslation();

    const currentZoom = filter?.pov?.zoom ?? 1;

    const maxX = (CANVAS_WIDTH * (currentZoom - 1)) / 2;
    const maxY = (CANVAS_HEIGHT * (currentZoom - 1)) / 2;

    const handleZoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter.container) return;
        const scale = Number(event?.target.value);

        const newMaxX = (CANVAS_WIDTH * (scale - 1)) / 2;
        const newMaxY = (CANVAS_HEIGHT * (scale - 1)) / 2;

        let currentX = filter.pov?.x ?? 0;
        let currentY = filter.pov?.y ?? 0;

        if (currentX > newMaxX) currentX = newMaxX;
        if (currentX < -newMaxX) currentX = -newMaxX;

        if (currentY > newMaxY) currentY = newMaxY;
        if (currentY < -newMaxY) currentY = -newMaxY;

        filter.container.scale.set(scale, scale);
        filter.container.position.x = CANVAS_WIDTH / 2 + currentX;
        filter.container.position.y = CANVAS_HEIGHT / 2 + currentY;

        setFilter({
            ...filter,
            pov: {
                ...filter.pov,
                zoom: scale,
                x: currentX,
                y: currentY,
            },
        });
    };

    const handleX = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter.container) return;
        const x = Number(event?.target.value);
        filter.container.position.x = CANVAS_WIDTH / 2 + x;
        setFilter({
            ...filter,
            pov: {
                ...filter.pov,
                zoom: currentZoom,
                x: x,
                y: filter.pov?.y ?? 0,
            },
        });
    };

    const handleY = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter.container) return;
        const y = Number(event?.target.value);
        filter.container.position.y = CANVAS_HEIGHT / 2 + y;
        setFilter({
            ...filter,
            pov: {
                ...filter.pov,
                zoom: currentZoom,
                x: filter.pov?.x ?? 0,
                y: y,
            },
        });
    };

    return (
        <>
            <div className="option__content">
                <div className="transform-icons">
                    <h3>
                        {t("background.zoom")} ({currentZoom.toFixed(1)}x)
                    </h3>
                </div>
                <input
                    type="range"
                    name="zoom-value"
                    id="zoom-value"
                    min={1}
                    max={3}
                    step={0.1}
                    value={currentZoom}
                    onChange={handleZoom}
                />
            </div>
            <div className="option__content">
                <div className="transform-icons">
                    <h3>
                        {t("background.povx")} ({filter?.pov?.x?.toFixed(0)})
                    </h3>
                </div>
                <input
                    type="range"
                    name="x-value"
                    id="x-value"
                    min={-maxX}
                    max={maxX}
                    value={filter?.pov?.x ?? 0}
                    onChange={handleX}
                    disabled={currentZoom <= 1}
                />
            </div>
            <div className="option__content">
                <div className="transform-icons">
                    <h3>
                        {t("background.povy")} ({filter?.pov?.y?.toFixed(0)})
                    </h3>
                </div>
                <input
                    type="range"
                    name="y-value"
                    id="y-value"
                    min={-maxY}
                    max={maxY}
                    value={filter?.pov?.y ?? 0}
                    onChange={handleY}
                    disabled={currentZoom <= 1}
                />
            </div>
        </>
    );
};

export default POVFilter;
