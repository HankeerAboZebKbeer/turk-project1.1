import "../css/he8o.css";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeImage,
  decodeFont,
} from "@rive-app/react-canvas";

const imagePaths = {
  "pic 1": "/images/pic1.jpeg",
  "pic 2": "/images/pic2.jpeg",
  "pic 3": "/images/pic3.jpeg",
  "pic 4": "/images/pic4.jpeg",
  "pic 5": "/images/pic5.jpeg",
  "pic 6": "/images/pic6.jpeg",
  "pic 7": "/images/pic7.jpeg",
  "pic 8": "/images/pic8.jpeg",
  shadow: "/images/shadow.png", // If needed
};

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: "hero.riv",
    stateMachines: "Hero Main SM",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
    assetLoader: loadAllAssets, // Load both images and font
  });

  return <RiveComponent />;
};

// Function to load and assign all assets (images and font)
const loadAllAssets = async (asset, bytes) => {
  if (asset.isImage) {
    const imagePath = imagePaths[asset.name]; // Directly match with the object

    if (!imagePath) return false; // Skip if no match found

    const response = await fetch(imagePath);
    const image = await decodeImage(
      new Uint8Array(await response.arrayBuffer())
    );
    asset.setRenderImage(image);
    image.unref(); // Free memory when done

    return true; // Asset is now loaded
  }

  if (asset.isFont) {
    await loadCustomFont(asset);
    return true; // Font is loaded
  }

  return false;
};

// Function to load the custom font
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

export default function He8o() {
  return (
    <div className="RiveContainer">
      <RiveDemo />
    </div>
  );
}
