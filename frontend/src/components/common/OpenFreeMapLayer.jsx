import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "@maplibre/maplibre-gl-leaflet";

const OPEN_FREE_MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

export default function OpenFreeMapLayer() {
  const map = useMap();

  useEffect(() => {
    let disposed = false;
    let layer = null;
    const controller = new AbortController();

    async function mountLayer() {
      const response = await fetch(OPEN_FREE_MAP_STYLE_URL, {
        signal: controller.signal,
      });
      const style = await response.json();
      const nextStyle = style?.projection
        ? style
        : {
            ...style,
            projection: { type: "mercator" },
          };

      if (disposed) return;

      layer = L.maplibreGL({
        style: nextStyle,
      });
      layer.addTo(map);
    }

    mountLayer().catch((error) => {
      if (disposed || error.name === "AbortError") return;
      console.error("Failed to initialize OpenFreeMap layer.", error);
    });

    return () => {
      disposed = true;
      controller.abort();
      if (layer && map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    };
  }, [map]);

  return null;
}
