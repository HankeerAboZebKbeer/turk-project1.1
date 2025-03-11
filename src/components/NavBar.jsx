import "../css/NavBar.css";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeFont,
} from "@rive-app/react-canvas";

export default function NavBar() {
  const { RiveComponent } = useRive({
    src: "nav_bar.riv",
    stateMachines: "Main State Machine",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,

    assetLoader: async (asset, bytes) => {
      if (asset.cdnUuid.length > 0 || bytes.length > 0) {
        return false;
      }

      if (asset.isFont) {
        await loadCustomFont(asset);
        return true;
      } else {
        return false;
      }
    },
  });

  const loadCustomFont = async (asset) => {
    const fontUrl = "/fonts/custom-font.ttf"; // Path to your custom font

    try {
      const res = await fetch(fontUrl);
      const fontArrayBuffer = await res.arrayBuffer();
      const font = await decodeFont(new Uint8Array(fontArrayBuffer));

      asset.setFont(font);
      font.unref(); // Release memory when done
    } catch (error) {
      console.error("Error loading custom font:", error);
    }
  };

  return (
    <div className="RiveContainer2">
      <RiveComponent />
    </div>
  );
}
